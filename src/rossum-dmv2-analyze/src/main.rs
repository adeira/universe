use crate::clap::generate_clap_app;
use crate::http::get_http_client;
use crate::score::MessageCounts;
use colored::*;
use indicatif::{ProgressBar, ProgressStyle};
use reqwest::{Client, Url};
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;

mod clap;
mod dmv2;
mod http;
mod processor;
mod score;

#[derive(Debug, Serialize, Deserialize)]
struct AnnotationResponse {
    results: Vec<processor::Annotation>,
    pagination: AnnotationResponsePagination,
}

#[derive(Debug, Serialize, Deserialize)]
struct AnnotationResponsePagination {
    total: i32,
    total_pages: i32,
    next: Option<String>,
    previous: Option<String>,
}

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
    // TODO: check whether the API token is valid
    // TODO: default to all queues assigned to the hook (with the ability to overwrite)

    let cli_matches = generate_clap_app().get_matches();

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
    let mut annotations =
        get_annotations(&queue_id, &http_client, &mut current_page, &concurrency).await?;

    println!(
        "Analyzing {} annotations…",
        annotations.pagination.total.to_string().bold(),
    );

    let pb = ProgressBar::new(annotations.pagination.total as u64);
    pb.set_style(ProgressStyle::with_template("{wide_bar} {pos}/{len}\n{wide_msg}").unwrap());
    pb.tick(); // to display empty bar

    loop {
        let mut handles = Vec::new();

        // 2. iterate all annotations and analyze them via DMv2 match
        let annotations_results_len = annotations.results.len();
        for annotation in annotations.results {
            let api_token = api_token.clone();
            let dm_hook_id = dm_hook_id.clone();
            let tx = tx.clone();
            handles.push(tokio::spawn(async move {
                let res = processor::process(api_token, dm_hook_id, annotation).await;
                let _ = tx.send(res).await;
            }));
        }

        // 3. await the results and analyze them
        let mut received_messages = 0;
        while received_messages < annotations_results_len {
            match rx.recv().await.unwrap() {
                Ok((before, after)) => {
                    received_messages += 1;

                    before_total.one_match_found += before.one_match_found;
                    before_total.multiple_matches_found += before.multiple_matches_found;
                    before_total.no_match_found += before.no_match_found;

                    after_total.one_match_found += after.one_match_found;
                    after_total.multiple_matches_found += after.multiple_matches_found;
                    after_total.no_match_found += after.no_match_found;

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
                }
                Err(_e) => {
                    break;
                }
            }
        }

        // 4. if there is a next page, increment the page number, otherwise, exit the loop
        if annotations.pagination.next.is_some() {
            current_page += 1;
            annotations =
                get_annotations(&queue_id, &http_client, &mut current_page, &concurrency).await?;
        } else {
            break;
        }
    }

    pb.finish();
    Ok(())
}

async fn get_annotations(
    queue_id: &str,
    http_client: &Client,
    current_page: &mut i32,
    concurrency: &usize,
) -> anyhow::Result<AnnotationResponse> {
    Ok(http_client
        .get(Url::parse_with_params(
            "https://elis.rossum.ai/api/v1/annotations",
            &[
                ("queue", queue_id.to_string()),
                ("page", current_page.to_string()),
                ("page_size", concurrency.to_string()),
                (
                    "status",
                    "confirmed,exported,exporting,reviewing,to_review".to_string(),
                ),
            ],
        )?)
        .send()
        .await?
        .json::<AnnotationResponse>()
        .await?)
}
