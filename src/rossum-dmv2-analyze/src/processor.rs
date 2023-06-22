use crate::dmv2;
use crate::dmv2::Message;
use crate::http::get_http_client;
use crate::score::MessageCounts;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::fs::File;

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Annotation {
    id: i32,
}

#[derive(Debug, Serialize, Deserialize)]
struct MatchResult {
    messages: Vec<Message>,
}

fn replace_settings(
    json: &serde_json::Value,
    new_settings: &serde_json::Value,
) -> serde_json::Value {
    let mut new_json = json.clone();

    if let Some(obj) = new_json.as_object_mut() {
        obj.insert("settings".to_owned(), new_settings.clone());
    }

    new_json
}

pub(crate) async fn process(
    api_token: String,
    dm_hook_id: String,
    annotation: Annotation,
) -> anyhow::Result<(MessageCounts, MessageCounts)> {
    let new_dm_config: serde_json::Value = serde_json::from_reader(
        File::open("./dmv2_config.json").expect("configuration file should open read only"),
    )
    .expect("configuration file should be proper JSON");

    let http_client = get_http_client(&api_token);

    // 1.1. start the annotation (otherwise /generate_payload returns null datapoints)
    let _ = http_client
        .post(format!(
            "https://elis.rossum.ai/api/v1/annotations/{}/start",
            annotation.id
        ))
        .send()
        .await?;

    // 1.2. cancel the annotation so users are not locked out of it
    let _ = http_client
        .post(format!(
            "https://elis.rossum.ai/api/v1/annotations/{}/cancel",
            annotation.id
        ))
        .send()
        .await?;

    // 2. generate testing payload
    let generate_payload_res = http_client
        .post(format!(
            "https://elis.rossum.ai/api/v1/hooks/{}/generate_payload",
            dm_hook_id
        ))
        .json(&json!({
            "event": "annotation_content",
            "action": "user_update",
            "annotation": format!("https://elis.rossum.ai/api/v1/annotations/{}", annotation.id),
            "status": "to_review", // TODO (?)
        }))
        .send()
        .await?;

    let generated_payload: serde_json::Value = generate_payload_res.json().await?;

    // 3. try DMv2 match with the old and new config (concurrently)
    let generated_payload_new = replace_settings(&generated_payload, &new_dm_config);
    let (dm_result1_response, dm_result2_response) = tokio::join!(
        dmv2::match_request(&http_client, &generated_payload),
        dmv2::match_request(&http_client, &generated_payload_new)
    );

    let dm_result1: MatchResult = dm_result1_response?.json().await?;
    let dm_result2: MatchResult = dm_result2_response?.json().await?;

    let before = dmv2::process_dmv2_messages(&dm_result1.messages);
    let after = dmv2::process_dmv2_messages(&dm_result2.messages);

    Ok((before, after))
}
