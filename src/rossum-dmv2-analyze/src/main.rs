use crate::clap::generate_clap_app;
use crate::export::{CsvRecord, CsvWriter};
use crate::http::get_http_client;
use crate::score::MessageCounts;
use colored::*;
use indicatif::{ProgressBar, ProgressStyle};
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;

mod api;
mod clap;
mod dmv2;
mod export;
mod http;
mod processor;
mod score;

#[derive(Debug, Serialize, Deserialize)]
struct DmConfig {
    todo: bool,
}

#[derive(Debug, Serialize, Deserialize)]
struct Configurations {
    result_actions: DmConfig,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let mut cli_matches = generate_clap_app().get_matches();

    let annotations_status: Vec<String> = cli_matches
        .remove_many("annotations-status")
        .unwrap()
        .collect();
    let config_file = cli_matches
        .get_one::<String>("dm-config-file")
        .unwrap()
        .clone();
    let export_file = cli_matches
        .try_get_one::<String>("export-results-file")
        .unwrap()
        .clone();
    let api_token = cli_matches.get_one::<String>("api-token").unwrap().clone();
    let dm_hook_id = cli_matches.get_one::<String>("dm-hook-id").unwrap().clone();
    let queue_id = cli_matches.get_one::<String>("queue-id").unwrap();
    let concurrency: usize = cli_matches
        .get_one::<String>("concurrency")
        .unwrap()
        .parse()?;

    let http_client = get_http_client(&api_token);
    let (tx, mut rx) = mpsc::channel(concurrency);

    let mut before_total = MessageCounts::default();
    let mut after_total = MessageCounts::default();
    let mut current_page = 1;

    // 1. fetch all relevant annotations (with pagination)
    let mut annotations = api::annotations_get(
        &http_client,
        &queue_id,
        &mut current_page,
        &concurrency,
        &annotations_status,
    )
    .await?;

    println!(
        "Analyzing {} annotations…",
        annotations.pagination.total.to_string().bold(),
    );

    let pb = ProgressBar::new(annotations.pagination.total as u64);
    pb.set_style(ProgressStyle::with_template("{wide_bar} {pos}/{len}\n{wide_msg}").unwrap());
    pb.tick(); // to display empty bar

    let mut csv_wtr = CsvWriter::new(&export_file)?;

    loop {
        let mut handles = Vec::new();

        // 2. iterate all annotations and analyze them via DMv2 match
        let annotations_results_len = annotations.results.len();
        for annotation in annotations.results {
            let config_file = config_file.clone();
            let api_token = api_token.clone();
            let dm_hook_id = dm_hook_id.clone();
            let annotation = annotation.clone();
            let tx = tx.clone();
            handles.push(tokio::spawn(async move {
                let res = processor::process(config_file, api_token, dm_hook_id, annotation).await;
                let _ = tx.send(res).await;
            }));
        }

        // 3. await the results and analyze them
        let mut received_messages = 0;
        while received_messages < annotations_results_len {
            match rx.recv().await.unwrap() {
                Ok(processor_result) => {
                    let response_document = api::get::<api::Document>(
                        &http_client,
                        &processor_result.annotation.document,
                    )
                    .await?;

                    received_messages += 1;

                    before_total.one_match_found += processor_result.before.one_match_found;
                    before_total.multiple_matches_found +=
                        processor_result.before.multiple_matches_found;
                    before_total.no_match_found += processor_result.before.no_match_found;

                    after_total.one_match_found += processor_result.after.one_match_found;
                    after_total.multiple_matches_found +=
                        processor_result.after.multiple_matches_found;
                    after_total.no_match_found += processor_result.after.no_match_found;

                    pb.inc(1);
                    pb.set_message(format!(
                        "OLD / NEW - one match: {} / {} ; multiple matches: {} / {} ; no match: {} / {}\n{}",
                        before_total.one_match_found.to_string().green().bold(),
                        after_total.one_match_found.to_string().green().bold(),
                        before_total
                            .multiple_matches_found
                            .to_string()
                            .yellow()
                            .bold(),
                        after_total
                            .multiple_matches_found
                            .to_string()
                            .yellow()
                            .bold(),
                        before_total.no_match_found.to_string().red().bold(),
                        after_total.no_match_found.to_string().red().bold(),
                        score::compare_solutions(&before_total, &after_total)
                    ));

                    for operation in processor_result.after_result.operations {
                        csv_wtr.write_record(&CsvRecord {
                            operation: operation.op,
                            datapoint_id: operation.id.to_string(),
                            datapoint_value_content: operation.value.content.value,
                            datapoint_value_options: operation
                                .value
                                .options
                                .iter()
                                .map(|option| option.value.clone())
                                .collect::<Vec<String>>()
                                .join("|"),
                            document_original_file_name: response_document
                                .original_file_name
                                .to_string(),
                            document_mime_type: response_document.mime_type.to_string(),
                        })?;
                    }
                }
                Err(_e) => {
                    break;
                }
            }
        }

        // 4. if there is a next page, increment the page number, otherwise, exit the loop
        if annotations.pagination.next.is_some() {
            current_page += 1;
            annotations = api::annotations_get(
                &http_client,
                &queue_id,
                &mut current_page,
                &concurrency,
                &annotations_status,
            )
            .await?;
        } else {
            break;
        }
    }

    csv_wtr.flush()?;
    pb.finish();
    Ok(())
}
