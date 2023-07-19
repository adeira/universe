use crate::score::MessageCounts;
use anyhow::Result;
use reqwest::{Client, Response};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Message {
    /// Datapoint ID
    id: u64,
    content: String,
    r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Operation {
    /// Datapoint ID
    pub(crate) id: u64,
    pub(crate) op: String,
    pub(crate) value: OperationValue,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct OperationValue {
    pub(crate) content: OperationValueContent,
    pub(crate) options: Vec<OperationValueOptionValue>,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct OperationValueContent {
    pub(crate) value: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct OperationValueOptionValue {
    label: String,
    pub(crate) value: String,
}

fn replace_result_actions(
    json: &serde_json::Value,
    new_result_actions: &serde_json::Value,
) -> serde_json::Value {
    let mut new_json = json.clone();

    // Navigate to `settings.configurations`:
    let configurations = new_json
        .as_object_mut() // Turn the `Value` into a `Map`
        .and_then(|obj| obj.get_mut("settings")) // Get mutable reference to "settings"
        .and_then(|settings| settings.as_object_mut()) // Turn "settings" into a `Map`
        .and_then(|settings| settings.get_mut("configurations")) // Get mutable reference to "configurations"
        .and_then(|configurations| configurations.as_array_mut()); // Turn "configurations" into an `Array`

    // If we successfully navigated to `settings.configurations`:
    if let Some(configurations) = configurations {
        // For each object in the array:
        for config_obj in configurations.iter_mut() {
            // If this array item is an object:
            if let Some(config_obj) = config_obj.as_object_mut() {
                // Replace "result_actions" with `new_result_actions`:
                // TODO: wrong (remove `result_actions` overwrite)
                config_obj.insert("result_actions".to_owned(), new_result_actions.clone());
                config_obj.insert("additional_mappings".to_owned(), json!([]));
            }
        }
    }

    new_json
}

pub(crate) fn process_dmv2_messages(messages: &Vec<Message>) -> MessageCounts {
    let mut message_counts = MessageCounts {
        no_match_found: 0,
        multiple_matches_found: 0,
        one_match_found: 0,
    };

    for message in messages {
        match message.content.as_str() {
            "no_match_found" => message_counts.no_match_found += 1,
            "multiple_matches_found" => message_counts.multiple_matches_found += 1,
            "one_match_found" => message_counts.one_match_found += 1,
            _ => (),
        }
    }

    message_counts
}

pub(crate) async fn match_request(
    http_client: &Client,
    payload: &serde_json::Value,
) -> Result<Response> {
    // TODO: remove this because overwriting result_actions with for example `"select": "best_match"`
    //   could skew the results
    let new_result_actions: serde_json::Value =
        serde_json::from_str(include_str!("result_actions_overwrite.json")).unwrap();

    let response = http_client
        .post("https://elis.rossum.ai/svc/data-matching/api/v1/match")
        .json(&replace_result_actions(&payload, &new_result_actions))
        .send()
        .await?;

    Ok(response)
}
