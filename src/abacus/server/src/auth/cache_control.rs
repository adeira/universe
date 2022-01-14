use std::time::Duration;

/// Just a minimal parser of the Google certs API response (we only need the age at this moment):
///
/// ```text
/// cache-control: public, max-age=20203, must-revalidate, no-transform
/// ```
///
/// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
pub(crate) fn get_cache_control_max_age(value: &str) -> Option<Duration> {
    let mut max_age: Option<Duration> = None;
    let tokens: Vec<&str> = value.split(',').map(|s| s.trim()).collect();
    for token in tokens {
        let key_value: Vec<&str> = token.split('=').map(|s| s.trim()).collect();
        let key = key_value.first().unwrap();
        let val = key_value.get(1);
        if let "max-age" = *key {
            // The maximum amount of time a resource is considered fresh (in seconds).
            // This directive is relative to the time of the request.
            if let Some(val) = val {
                if let Ok(val) = val.parse() {
                    max_age = Some(Duration::new(val, 0));
                    break;
                }
            }
        }
    }
    max_age
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_cache_control_max_age_test_none() {
        assert!(get_cache_control_max_age("no-cache").is_none());
        assert!(get_cache_control_max_age("max-age=chleba").is_none());
    }

    #[test]
    fn get_cache_control_max_age_test_some() {
        assert_eq!(
            get_cache_control_max_age("max-age=0").unwrap(),
            Duration::new(0, 0)
        );
        assert_eq!(
            get_cache_control_max_age("max-age=0, must-revalidate").unwrap(),
            Duration::new(0, 0)
        );
        assert_eq!(
            get_cache_control_max_age("public, max-age=604800, immutable").unwrap(),
            Duration::new(604800, 0)
        );
        assert_eq!(
            get_cache_control_max_age("public, max-age=20203, must-revalidate, no-transform")
                .unwrap(),
            Duration::new(20203, 0)
        );
    }
}
