use crate::analytics::dal::PageVisitInput;
use crate::arango::ConnectionPool;
use anyhow::bail;

/// Records page visit while ignoring `localhost` location hostname (that should exclude Playwright
/// testing as well).
///
/// Domains outside of our scope should not be allowed thanks to CORS, however, we are not
/// explicitly checking it here.
pub(in crate::analytics) async fn record_page_visit(
    pool: &ConnectionPool,
    page_visit: &PageVisitInput,
) -> anyhow::Result<PageVisitInput> {
    match &page_visit.location {
        Some(location) => match &location.hostname {
            Some(location_hostname) => {
                if location_hostname == "localhost" {
                    bail!("recording page visits for localhost is not allowed")
                }
            }
            None => {}
        },
        None => {}
    }

    if page_visit.location.is_none()
        && page_visit.screen.is_none()
        && page_visit.user_agent.is_none()
    {
        bail!("nothing to record (all values are empty)")
    }

    crate::analytics::dal::record_page_visit(pool, page_visit).await
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::analytics::dal::{PageVisitInputLocation, PageVisitInputScreen};
    use crate::arango::get_database_connection_pool_mock;

    #[tokio::test]
    async fn record_page_visit_empty() {
        // This is not an acceptable situation but it can happen (GraphQL API allows it). We should
        // always behave gracefully even if the input doesn't make any sense (we do want though)
        let pool_mock = get_database_connection_pool_mock();
        let result = record_page_visit(
            &pool_mock,
            &PageVisitInput {
                location: None,
                user_agent: None,
                screen: None,
            },
        )
        .await;

        assert!(result.is_err());
        assert_eq!(
            format!("{:?}", result.err().unwrap()),
            "nothing to record (all values are empty)"
        );
    }

    #[tokio::test]
    async fn record_page_visit_localhost() {
        let pool_mock = get_database_connection_pool_mock();
        let result = record_page_visit(
            &pool_mock,
            &PageVisitInput {
                location: Some(PageVisitInputLocation {
                    protocol: Some(String::from("http:")),
                    hostname: Some(String::from("localhost")),
                    port: Some(String::from("5002")),
                    pathname: Some(String::from("/en-us")),
                    search: Some(String::from("")),
                    hash: Some(String::from("")),
                }),
                user_agent: Some(String::from("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36")),
                screen: Some(PageVisitInputScreen {
                    height: Some(String::from("900")),
                    width: Some(String::from("1440")),
                    orientation_type: Some(String::from("landscape-primary")),
                    orientation_angle: Some(String::from("0"))
                }),
            },
        ).await;

        assert!(result.is_err());
        assert_eq!(
            format!("{:?}", result.err().unwrap()),
            "recording page visits for localhost is not allowed"
        );
    }
}
