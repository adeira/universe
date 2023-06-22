use crate::score::MessageCounts;
use anyhow::Result;
use reqwest::{Client, Response};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Message {
    content: String,
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
                config_obj.insert("result_actions".to_owned(), new_result_actions.clone());
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
    let new_result_actions: serde_json::Value =
        serde_json::from_str(include_str!("result_actions_overwrite.json")).unwrap();

    let response = http_client
        .post("https://elis.rossum.ai/svc/data-matching/api/v1/match")
        .json(&replace_result_actions(&payload, &new_result_actions))
        .send()
        .await?;

    Ok(response)
}
