use crate::cache_control::get_cache_control_max_age;
use reqwest::header::CACHE_CONTROL;
use serde::Deserialize;
use std::collections::HashMap;
use std::time::Instant;

#[derive(Debug, Clone, Deserialize)]
struct Certs {
    keys: Vec<CertKey>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CertKey {
    alg: String,
    n: String, // modulus
    kid: String,
    e: String, // exponent
    r#use: String,
    kty: String,
}

impl CertKey {
    pub fn modulus(&self) -> &String {
        &self.n
    }

    pub fn exponent(&self) -> &String {
        &self.e
    }
}

pub trait CachedCerts {
    fn new() -> Self;
    fn get_key_by_kid(&mut self, kid: &str) -> Option<CertKey>;
}

pub struct CachedCertsProduction {
    keys: HashMap<String, CertKey>,
    valid_until: Option<Instant>,
}

impl CachedCertsProduction {
    fn get_cached_cert(&mut self, kid: &str) -> Option<CertKey> {
        match self.keys.get(kid) {
            Some(key) => Some(key.clone()),
            None => None,
        }
    }

    fn fetch_new_certs(&mut self, kid: &str) -> Option<CertKey> {
        let certs_url = "https://www.googleapis.com/oauth2/v3/certs";
        log::trace!("Fetching new OAuth2 certificates from: {}", certs_url);
        if let Ok(response) = reqwest::blocking::get(certs_url) {
            if response.status().is_success() {
                // remember cache-control info
                if let Some(cache_control_header) = response.headers().get(CACHE_CONTROL) {
                    if let Ok(cache_control_value) = cache_control_header.to_str() {
                        if let Some(max_age) = get_cache_control_max_age(cache_control_value) {
                            // prolong the validity from now + cache-control duration
                            self.valid_until = Some(Instant::now() + max_age);
                        }
                    }
                }
                // store new certificates in memory
                if let Ok(json) = response.json::<Certs>() {
                    for cert_key in json.keys {
                        self.keys.insert(cert_key.kid.clone(), cert_key);
                    }
                }
            }
        }
        self.get_cached_cert(kid)
    }
}

impl CachedCerts for CachedCertsProduction {
    fn new() -> Self {
        Self {
            keys: HashMap::new(),
            valid_until: None,
        }
    }

    fn get_key_by_kid(&mut self, kid: &str) -> Option<CertKey> {
        match self.valid_until {
            Some(valid_until) => {
                if valid_until > Instant::now() {
                    // the certs are still valid so let's just return them
                    self.get_cached_cert(kid)
                } else {
                    // certificates expired so we have to refetch them
                    self.fetch_new_certs(kid)
                }
            }
            None => {
                // the validity is not specified yet so it must be a first call
                self.fetch_new_certs(kid)
            }
        }
    }
}

pub(crate) struct CachedCertsMock;

impl CachedCerts for CachedCertsMock {
    fn new() -> Self {
        Self {}
    }

    fn get_key_by_kid(&mut self, _kid: &str) -> Option<CertKey> {
        // see: https://www.googleapis.com/oauth2/v3/certs
        Some(CertKey {
            alg: "RS256".to_string(),
            n: "t-EAePKVyMaQbjG96EP98IIB7-CJLeo4AZOdc1WVTfMZgdbN_csbY1WP25CrlXvhaIewRNEKTF9WkKGvsxowpYJ_18rtOYnz94mn9s_EvJaBtoEcixXedwMwniw78ayLyi4IGzCLhUopgLnwAFardde9ZxpEAVqMK3q4EdScMLebrdrTu63oZ2EpLLIvuC5tjitFXLtNb5v2yiOElX3nXntOF9OYTtpCRzKRVOZ1Lqcj7G3oWmmBmLrR-fRc5yFpLFRVHu-vdp4BGUh96t2flz95QxhIRF0zcuvRiCPWjdiRZgJ8wiSy627XeINqKaoVycW0TofFcz2xAix9GuNdqQ".to_string(),
            kid: "e197bf2e87bd1905575f9b6e5eb426eda5d574e3".to_string(),
            e: "AQAB".to_string(),
            r#use: "sig".to_string(),
            kty: "RSA".to_string(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_instant_and_keys_download() {
        // This test actually calls the Google API because it's absolutely essential
        // to make sure it works fine. We cannot move it to integration tests (?) because
        // the public interface doesn't allow us to access the downloaded certs.
        // TODO: test it better and leave the network call for integration tests only

        let mut cached_certs = CachedCertsProduction::new();
        assert_eq!(cached_certs.valid_until, None);
        assert_eq!(cached_certs.keys.keys().len(), 0);

        let new_cert = cached_certs.fetch_new_certs("mock_kid");
        assert_eq!(new_cert.is_none(), true); // the `mock_kid` doesn't exist
        assert_eq!(cached_certs.valid_until > Some(Instant::now()), true);
        assert_eq!(cached_certs.keys.keys().len() > 0, true); // usually 2
    }
}
