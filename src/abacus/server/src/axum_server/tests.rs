use crate::arango::get_database_connection_pool_mock;
use crate::axum_server::create_axum_server;
use crate::global_configuration::GlobalConfiguration;
use axum::{
    body::Body,
    extract::connect_info::MockConnectInfo,
    http::{self, Request, StatusCode},
};
use http_body_util::BodyExt;
use serde_json::json;
use tower::{Service, ServiceExt}; // for `collect`
use warp::test::request; // for `call`, `oneshot`, and `ready`

#[tokio::test]
async fn test_axum_server_unknown_route() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::GET)
                .uri("/unknown/route/yadada")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::NOT_FOUND);
    assert_eq!(body.collect().await.unwrap().to_bytes(), "");
}

#[tokio::test]
async fn test_axum_server_ping_pong() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::GET)
                .uri("/status/ping")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::OK);
    assert_eq!(body.collect().await.unwrap().to_bytes(), "pong");
}

#[tokio::test]
async fn test_axum_server_redirect_invalid() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::GET)
                .uri("/redirect/XYZ-ABC")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::NOT_FOUND);
    assert_eq!(body.collect().await.unwrap().to_bytes(), "");
}

#[tokio::test]
async fn test_axum_server_webhook_stripe_no_signature() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::POST)
                .uri("/webhooks/stripe")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::BAD_REQUEST);
    assert_eq!(
        body.collect().await.unwrap().to_bytes(),
        "Unable to verify Stripe signature (Stripe-Signature header is missing)."
    );
}

#[tokio::test]
async fn test_axum_server_graphql_get_query() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::GET)
                .uri("/graphql?query={__typename}")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::OK);
    assert_eq!(
        body.collect().await.unwrap().to_bytes(),
        serde_json::to_vec(&json!({"data": {"__typename": "Query"}})).unwrap()
    );
}

#[tokio::test]
async fn test_axum_server_graphql_post_query() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::POST)
                .uri("/graphql")
                .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                .body(Body::from(
                    serde_json::to_vec(&json!({"query": "query {__typename}"})).unwrap(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::OK);
    assert_eq!(
        body.collect().await.unwrap().to_bytes(),
        serde_json::to_vec(&json!({"data": {"__typename": "Query"}})).unwrap()
    );
}

#[tokio::test]
async fn test_axum_server_graphql_post_mutation() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::POST)
                .uri("/graphql")
                .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                .body(Body::from(
                    serde_json::to_vec(&json!({"query": "mutation {__typename}"})).unwrap(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::OK);
    assert_eq!(
        body.collect().await.unwrap().to_bytes(),
        serde_json::to_vec(&json!({"data": {"__typename": "Mutation"}})).unwrap()
    );
}

#[tokio::test]
async fn test_axum_server_graphql_post_syntax_error() {
    let app = create_axum_server(
        get_database_connection_pool_mock(),
        GlobalConfiguration::default(),
    );

    let response = app
        .oneshot(
            Request::builder()
                .method(http::Method::POST)
                .uri("/graphql")
                .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                .body(Body::from(
                    serde_json::to_vec(&json!({"query": "query{syntax$"})).unwrap(),
                ))
                .unwrap(),
        )
        .await
        .unwrap();

    let (parts, body) = response.into_parts();
    assert_eq!(parts.status, StatusCode::BAD_REQUEST);
}
