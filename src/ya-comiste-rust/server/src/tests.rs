use super::filters;
use crate::arangodb::get_database_connection_pool;
use crate::graphql_schema::{create_private_graphql_schema, create_public_graphql_schema};
use juniper::http::GraphQLRequest;
use juniper::DefaultScalarValue;
use warp::http::StatusCode;
use warp::test::request;

#[tokio::test]
async fn test_graphql_post_query() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{__typename}"),
            None,
            None,
        ))
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.body(), r#"{"data":{"__typename":"Query"}}"#);
}

#[tokio::test]
async fn test_graphql_post_mutation() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("mutation{__typename}"),
            None,
            None,
        ))
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.body(), r#"{"data":{"__typename":"Mutation"}}"#);
}

#[ignore]
#[tokio::test]
async fn test_graphql_post_forbidden() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("authorization", "Bearer XYZ")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{__typename}"),
            None,
            None,
        ))
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::FORBIDDEN);
    assert_eq!(resp.body(), r#"{"code":403}"#);
}

#[tokio::test]
async fn test_graphql_multipart_query() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let boundary = "--abcdef1234--";
    let body = format!(
        r#"
         --{0}
         content-disposition: form-data; name="query"

         query {{ __typename }}
         --{0}--
         "#,
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql-upload")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::NOT_IMPLEMENTED);
}

// TODO: test_graphql_multipart_mutation
// TODO: test_graphql_multipart_forbidden

#[tokio::test]
async fn test_graphql_post_query_fail() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{__wtf}"),
            None,
            None,
        ))
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.body(),
        r#"{"errors":[{"message":"Unknown field \"__wtf\" on type \"Query\"","locations":[{"line":1,"column":7}]}]}"#
    );
}

// TODO: test_graphql_multipart_query_fail

#[tokio::test]
async fn test_graphql_unknown_method_get() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let resp = request()
        .method("GET")
        .path("/graphql?query={__typename}")
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::METHOD_NOT_ALLOWED);
}

#[tokio::test]
async fn test_graphql_syntax_error() {
    let api = filters::graphql(
        get_database_connection_pool(),
        create_public_graphql_schema(),
        create_private_graphql_schema(),
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{syntax$"),
            None,
            None,
        ))
        .reply(&api)
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.body(),
        r#"{"errors":[{"message":"Unexpected \"$\"","locations":[{"line":1,"column":13}]}]}"#
    );
}
