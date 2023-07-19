use reqwest::{Client, Url};
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Document {
    pub annotations: Vec<String>,
    pub id: u64,
    pub mime_type: String,
    pub original_file_name: String,
    pub s3_name: String,
    pub url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Annotations {
    pub results: Vec<Annotation>,
    pub pagination: Pagination,
}

/// See: https://elis.rossum.ai/api/docs/#annotation
#[derive(Clone, Debug, Serialize, Deserialize)]
pub(crate) struct Annotation {
    pub id: i32,
    pub document: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Pagination {
    pub total: i32,
    pub total_pages: i32,
    pub next: Option<String>,
    pub previous: Option<String>,
}

pub(crate) async fn get<T: DeserializeOwned>(
    http_client: &Client,
    url: &String,
) -> reqwest::Result<T> {
    http_client.get(url).send().await?.json().await
}

pub(crate) async fn annotations_get(
    http_client: &Client,
    queue_id: &str,
    current_page: &mut i32,
    concurrency: &usize,
    annotations_status: &Vec<String>,
) -> anyhow::Result<Annotations> {
    Ok(http_client
        .get(Url::parse_with_params(
            "https://elis.rossum.ai/api/v1/annotations",
            &[
                ("queue", queue_id.to_string()),
                ("page", current_page.to_string()),
                ("page_size", concurrency.to_string()),
                ("status", annotations_status.join(",").to_string()),
            ],
        )?)
        .send()
        .await?
        .json::<Annotations>()
        .await?)
}
