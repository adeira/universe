use crate::auth::cache_control::get_cache_control_max_age;
use lazy_static::lazy_static;
use reqwest::header::CACHE_CONTROL;
use serde::Deserialize;
use std::collections::HashMap;
use std::sync::RwLock;
use std::time::Instant;

// We store the fetched certificates globally in memory for later use. They should be downloaded
// only once when needed. See: https://stackoverflow.com/a/27826181/3135248
lazy_static! {
    static ref KEYS: RwLock<HashMap<String, CertKey>> = RwLock::new(HashMap::new());
    static ref VALID_UNTIL: RwLock<Option<Instant>> = RwLock::new(None);
}

fn _read_keys() -> HashMap<String, CertKey> {
    match KEYS.read() {
        Ok(keys) => (*keys).clone(),
        Err(_) => HashMap::new(), // we pretend the map is empty
    }
}

fn _read_valid_until() -> Option<Instant> {
    match VALID_UNTIL.read() {
        Ok(valid_until) => *valid_until,
        Err(_) => None, // we pretend it's empty
    }
}

fn _write_valid_until(new_valid_until: Option<Instant>) {
    if let Ok(mut w) = VALID_UNTIL.write() {
        *w = new_valid_until
    }
}

fn _write_keys(kid: String, key: CertKey) {
    if let Ok(mut w) = KEYS.write() {
        w.insert(kid, key);
    }
}

#[derive(Debug, Clone, Deserialize)]
struct Certs {
    keys: Vec<CertKey>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CertKey {
    // Unused: alg: String,
    n: String, // modulus
    kid: String,
    e: String, // exponent
               // Unused: r#use: String,
               // Unused: kty: String,
}

impl CertKey {
    pub fn modulus(&self) -> &String {
        &self.n
    }

    pub fn exponent(&self) -> &String {
        &self.e
    }
}

#[async_trait::async_trait]
pub trait CachedCerts {
    fn new() -> Self;
    async fn get_key_by_kid(&mut self, kid: &str) -> Option<CertKey>;
}

#[derive(Clone)]
pub struct CachedCertsProduction {}

impl CachedCertsProduction {
    fn get_cached_cert(&mut self, kid: &str) -> Option<CertKey> {
        match _read_keys().get(kid) {
            Some(key) => {
                tracing::trace!(
                    "Reading cached certificated from memory (valid until: {:?}) ⚡️",
                    _read_valid_until()
                );
                Some(key.clone())
            }
            None => None,
        }
    }

    async fn fetch_new_certs(&mut self, kid: &str) -> Option<CertKey> {
        let certs_url = "https://www.googleapis.com/oauth2/v3/certs";
        tracing::trace!(
            "Fetching new OAuth2 certificates from: {} (was valid until: {:?}) ⚡️",
            certs_url,
            _read_valid_until()
        );
        if let Ok(response) = reqwest::get(certs_url).await {
            if response.status().is_success() {
                // remember cache-control info
                if let Some(cache_control_header) = response.headers().get(CACHE_CONTROL) {
                    if let Ok(cache_control_value) = cache_control_header.to_str() {
                        if let Some(max_age) = get_cache_control_max_age(cache_control_value) {
                            // prolong the validity from now + cache-control duration
                            _write_valid_until(Some(Instant::now() + max_age));
                        }
                    }
                }
                // store new certificates in memory
                if let Ok(json) = response.json::<Certs>().await {
                    for cert_key in json.keys {
                        _write_keys(cert_key.kid.clone(), cert_key);
                    }
                }
            }
        }
        self.get_cached_cert(kid)
    }
}

#[async_trait::async_trait]
impl CachedCerts for CachedCertsProduction {
    fn new() -> Self {
        Self {}
    }

    async fn get_key_by_kid(&mut self, kid: &str) -> Option<CertKey> {
        match _read_valid_until() {
            Some(valid_until) => {
                if valid_until > Instant::now() {
                    // the certs are still valid so let's just return them
                    self.get_cached_cert(kid)
                } else {
                    // certificates expired so we have to refetch them
                    self.fetch_new_certs(kid).await
                }
            }
            None => {
                // the validity is not specified yet so it must be a first call
                self.fetch_new_certs(kid).await
            }
        }
    }
}

pub(crate) struct CachedCertsMock;

#[async_trait::async_trait]
impl CachedCerts for CachedCertsMock {
    fn new() -> Self {
        Self {}
    }

    async fn get_key_by_kid(&mut self, _kid: &str) -> Option<CertKey> {
        // see: https://www.googleapis.com/oauth2/v3/certs
        Some(CertKey {
            // Unused: alg: "RS256".to_string(),
            n: "t-EAePKVyMaQbjG96EP98IIB7-CJLeo4AZOdc1WVTfMZgdbN_csbY1WP25CrlXvhaIewRNEKTF9WkKGvsxowpYJ_18rtOYnz94mn9s_EvJaBtoEcixXedwMwniw78ayLyi4IGzCLhUopgLnwAFardde9ZxpEAVqMK3q4EdScMLebrdrTu63oZ2EpLLIvuC5tjitFXLtNb5v2yiOElX3nXntOF9OYTtpCRzKRVOZ1Lqcj7G3oWmmBmLrR-fRc5yFpLFRVHu-vdp4BGUh96t2flz95QxhIRF0zcuvRiCPWjdiRZgJ8wiSy627XeINqKaoVycW0TofFcz2xAix9GuNdqQ".to_string(),
            kid: "e197bf2e87bd1905575f9b6e5eb426eda5d574e3".to_string(),
            e: "AQAB".to_string(),
            // Unused: r#use: "sig".to_string(),
            // Unused: kty: "RSA".to_string(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::auth::google::verify_id_token_integrity;

    // TODO: could eventually be #[ignore]
    #[tokio::test]
    async fn test_valid_instant_and_keys_download() {
        // This test actually calls the Google API because it's absolutely essential
        // to make sure it works fine. We cannot move it to integration tests (?) because
        // the public interface doesn't allow us to access the downloaded certs.
        // TODO: test it better and leave the network call for integration tests only

        let mut cached_certs = CachedCertsProduction::new();
        assert_eq!(_read_valid_until(), None);
        assert_eq!(_read_keys().keys().len(), 0);

        let new_cert = cached_certs.fetch_new_certs("mock_kid").await;
        assert!(new_cert.is_none()); // the `mock_kid` doesn't exist
        assert!(_read_valid_until() > Some(Instant::now()));
        assert!(_read_keys().keys().len() > 0); // usually 2
    }

    // TODO: how to test a success scenario (where to get a valid ID token?)
    // https://stackoverflow.com/questions/17657879/does-google-provide-test-users-for-integration-testing

    // TODO: could eventually be #[ignore]
    #[tokio::test]
    async fn it_returns_error_on_invalid_token() {
        let id_token = "invalid_id_token";
        let mut cached_certs = CachedCertsProduction::new();
        let verify_result = verify_id_token_integrity(id_token, &mut cached_certs).await;

        assert!(verify_result.is_err());
        assert_eq!(
            format!("{:?}", verify_result.err().unwrap()),
            "InvalidToken"
        );
    }

    // TODO: could eventually be #[ignore]
    #[tokio::test]
    async fn it_returns_error_on_incompatible_token_header() {
        // this JWT token is technically valid but not for Google auth (invalid JWT header)
        let id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        let mut cached_certs = CachedCertsProduction::new();
        let verify_result = verify_id_token_integrity(id_token, &mut cached_certs).await;

        assert!(verify_result.is_err());
        assert_eq!(
            format!("{:?}", verify_result.err().unwrap()),
            r#"cannot get 'kid' from the token header"#
        );
    }

    // TODO: could eventually be #[ignore]
    #[tokio::test]
    async fn it_returns_error_on_unsigned_token() {
        // this JWT token is valid but not signed by google => rejected
        // note: this will actually call Google API and try to verify it

        let id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMyJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.szMUBsawz52NUN3aIlpCIBDtbzB9U-G_tfG58c7PTKQ";
        let mut cached_certs = CachedCertsProduction::new();
        let verify_result = verify_id_token_integrity(id_token, &mut cached_certs).await;

        assert!(verify_result.is_err());
        assert_eq!(
            format!("{:?}", verify_result.err().unwrap()),
            r#"cannot obtain Google certificate for key ID: '123'"# // 123 is from the JWT header
        );
    }
}
