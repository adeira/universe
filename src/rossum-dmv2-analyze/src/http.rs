use reqwest::header::{HeaderMap, AUTHORIZATION, CONTENT_TYPE};
use reqwest::Client;

pub(crate) fn get_http_client(authorization_header_value: &str) -> Client {
    let mut headers = HeaderMap::new();
    headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
    headers.insert(
        AUTHORIZATION,
        format!("Bearer {}", authorization_header_value,)
            .parse()
            .unwrap(),
    );

    Client::builder()
        .default_headers(headers)
        .build()
        .expect("Failed to build HTTP client")
}
