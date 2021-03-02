const BEARER_PREFIX: &str = "Bearer ";

pub(crate) fn parse_authorization_header(header: &str) -> Result<String, String> {
    if header.is_empty() {
        return Err(String::from("empty authorization header"));
    }

    let auth_header = match std::str::from_utf8(header.as_bytes()) {
        Ok(auth_header) => auth_header,
        Err(_) => return Err(String::from("unable to parse the header string")),
    };

    if !auth_header.starts_with(BEARER_PREFIX) {
        return Err(String::from("only bearer token is supported"));
    }

    Ok(auth_header.trim_start_matches(BEARER_PREFIX).to_owned())
}

#[cfg(test)]
mod tests {
    use super::*;
    use proptest::prelude::*;

    #[test]
    fn parse_authorization_header_test_happy_path() {
        assert_eq!(
            parse_authorization_header("Bearer abcdefg").unwrap(),
            "abcdefg"
        );
    }

    #[test]
    fn parse_authorization_header_test_invalid_scheme() {
        assert_eq!(
            parse_authorization_header("Basic abcdefg").unwrap_err(),
            "only bearer token is supported"
        );
    }

    #[test]
    fn parse_authorization_header_test_empty() {
        assert_eq!(
            parse_authorization_header("").unwrap_err(),
            "empty authorization header"
        );
    }

    proptest! {
        #![proptest_config(ProptestConfig {
          cases: 1000, .. ProptestConfig::default()
        })]
        #[test]
        fn parse_authorization_header_proptest(token in "[a-zA-Z0-9-_.+]+") {
            println!("Bearer {}", token); // visible only with `cargo test -- --nocapture`
            let result = parse_authorization_header(format!("Bearer {}", token).as_str()).unwrap();
            prop_assert_eq!(result, token)
        }
    }
}
