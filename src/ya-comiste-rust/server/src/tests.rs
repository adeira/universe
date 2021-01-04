use crate::arangodb::get_database_connection_pool;
use crate::graphql_schema::create_graphql_schema;
use juniper::http::GraphQLRequest;
use juniper::DefaultScalarValue;
use warp::http::StatusCode;
use warp::test::request;

fn create_graphql_api_filter(
) -> impl warp::Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    crate::warp_graphql::filters::graphql(get_database_connection_pool(), create_graphql_schema())
}

#[tokio::test]
async fn test_graphql_post_query() {
    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{__typename}"),
            None,
            None,
        ))
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.body(), r#"{"data":{"__typename":"Query"}}"#);
}

#[tokio::test]
async fn test_graphql_post_mutation() {
    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("mutation{__typename}"),
            None,
            None,
        ))
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.body(), r#"{"data":{"__typename":"Mutation"}}"#);
}

#[ignore]
#[tokio::test]
async fn test_graphql_post_forbidden() {
    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("authorization", "Bearer XYZ")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{__typename}"),
            None,
            None,
        ))
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::FORBIDDEN);
    assert_eq!(resp.body(), r#"{"code":403,"message":null}"#);
}

#[tokio::test]
async fn test_graphql_post_query_fail() {
    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{__wtf}"),
            None,
            None,
        ))
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.body(),
        r#"{"errors":[{"message":"Unknown field \"__wtf\" on type \"Query\"","locations":[{"line":1,"column":7}]}]}"#
    );
}

#[tokio::test]
async fn test_graphql_post_syntax_error() {
    let resp = request()
        .method("POST")
        .path("/graphql")
        .json(&GraphQLRequest::<DefaultScalarValue>::new(
            String::from("query{syntax$"),
            None,
            None,
        ))
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.body(),
        r#"{"errors":[{"message":"Unexpected \"$\"","locations":[{"line":1,"column":13}]}]}"#
    );
}

#[tokio::test]
async fn test_graphql_multipart_query() {
    let boundary = "--abcdef1234--";
    let body = format!(
        "\
         --{0}\r\n\
         content-disposition: form-data; name=\"query\"\r\n\r\n\
         query {{ __typename }}\r\n\
         --{0}--\r\n\
         ",
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.body(), r#"{"data":{"__typename":"Query"}}"#);
}

#[tokio::test]
async fn test_graphql_multipart_mutation() {
    let boundary = "--abcdef1234--";
    let body = format!(
        "\
         --{0}\r\n\
         content-disposition: form-data; name=\"query\"\r\n\r\n\
         mutation {{ __typename }}\r\n\
         --{0}--\r\n\
         ",
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(resp.body(), r#"{"data":{"__typename":"Mutation"}}"#);
}

#[ignore]
#[tokio::test]
async fn test_graphql_multipart_forbidden() {
    let boundary = "--abcdef1234--";
    let body = format!(
        "\
         --{0}\r\n\
         content-disposition: form-data; name=\"query\"\r\n\r\n\
         query {{ __typename }}\r\n\
         --{0}--\r\n\
         ",
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("authorization", "Bearer XYZ")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::FORBIDDEN);
    assert_eq!(resp.body(), r#"{"code":403,"message":null}"#);
}

#[tokio::test]
async fn test_graphql_multipart_upload_forbidden() {
    let boundary = "--abcdef1234--";
    let body = format!(
        "\
         --{0}\r\n\
         content-disposition: form-data; name=\"field_name\"; filename=\"file.png\"\r\n\r\n\
         some binary content mock\r\n\
         --{0}\r\n\
         content-disposition: form-data; name=\"query\"\r\n\r\n\
         query {{ __typename }}\r\n\
         --{0}--\r\n\
         ",
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&create_graphql_api_filter())
        .await;

    // Requests which contain additional fields (uploads) require admin auth.
    // Requests with only query/variable/operation_name are allowed without admin auth.
    assert_eq!(resp.status(), StatusCode::FORBIDDEN);
    assert_eq!(
        resp.body(),
        r#"{"code":403,"message":"admin required when uploading"}"#
    );
}

#[tokio::test]
async fn test_graphql_multipart_query_fail() {
    let boundary = "--abcdef1234--";
    let body = format!(
        "\
         --{0}\r\n\
         content-disposition: form-data; name=\"query\"\r\n\r\n\
         query {{ __wtf }}\r\n\
         --{0}--\r\n\
         ",
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::OK);
    assert_eq!(
        resp.body(),
        r#"{"errors":[{"message":"Unknown field \"__wtf\" on type \"Query\"","locations":[{"line":1,"column":9}]}]}"#
    );
}

#[tokio::test]
async fn test_graphql_multipart_query_missing() {
    let boundary = "--abcdef1234--";
    let body = format!(
        "\
         --{0}\r\n\
         content-disposition: form-data; name=\"text\"\r\n\r\n\
         yadada\r\n\
         --{0}--\r\n\
         ",
        boundary
    );

    let resp = request()
        .method("POST")
        .path("/graphql")
        .header("content-length", body.len())
        .header(
            "content-type",
            format!("multipart/form-data; boundary={}", boundary),
        )
        .body(body)
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
    assert_eq!(
        resp.body(),
        r#"{"code":400,"message":"Query is a required field when using multipart GraphQL."}"#
    );
}

// TODO: test multipart files upload

#[tokio::test]
async fn test_server_unknown_method_get() {
    let resp = request()
        .method("GET")
        .path("/graphql?query={__typename}")
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::METHOD_NOT_ALLOWED);
}

#[tokio::test]
async fn test_server_unknown_path() {
    let resp = request()
        .method("POST")
        .path("/graphqlx")
        .reply(&create_graphql_api_filter())
        .await;

    assert_eq!(resp.status(), StatusCode::NOT_FOUND);
}
