pub(in crate::images) fn resolve_cloudfront_url(path: &str) -> String {
    let cloudfront_domain = "https://d3nujwlesxo9e6.cloudfront.net/";
    format!(
        "{}/{}",
        cloudfront_domain.trim_end_matches('/'),
        path.trim_start_matches('/')
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn resolve_cloudfrom_url_happy_path() {
        insta::assert_snapshot!(resolve_cloudfront_url("test.png"))
    }

    #[test]
    fn resolve_cloudfrom_url_leading_slash() {
        insta::assert_snapshot!(resolve_cloudfront_url("/test.png"))
    }
}
