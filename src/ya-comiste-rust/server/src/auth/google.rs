use crate::auth::certs::CachedCerts;
use crate::auth::error::AuthError;
use jsonwebtoken::{decode, decode_header, Algorithm, DecodingKey, TokenData, Validation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    // These six fields are included in all Google ID Tokens.
    iss: String, // Issuer (who created and signed this token)
    sub: String, // Subject (whom the token refers to)
    azp: String, // Authorized party (the party to which this token was issued)
    aud: String, // Audience (who or what the token is intended for)
    iat: usize,  // Issued at (seconds since Unix epoch)
    exp: usize,  // Expiration time (seconds since Unix epoch)

    // These seven fields are only included when the user has granted the "profile" and
    // "email" OAuth scopes to the application.
    email: Option<String>,
    email_verified: Option<bool>,
    name: Option<String>,
    picture: Option<String>,
    given_name: Option<String>,
    family_name: Option<String>,
    locale: Option<String>,
}

impl Claims {
    pub(crate) fn subject(&self) -> &String {
        &self.sub
    }

    #[cfg(test)]
    pub(crate) fn mock(sub: &Option<String>) -> Claims {
        Claims {
            iss: String::from(""),
            sub: sub.clone().unwrap_or_else(|| String::from("")),
            azp: String::from(""),
            aud: String::from(""),
            iat: 0,
            exp: 0,
            email: None,
            email_verified: None,
            name: None,
            picture: None,
            given_name: None,
            family_name: None,
            locale: None,
        }
    }
}

/// To verify that the token is valid, ensure that the following criteria are satisfied:
///
/// 1. The ID token is properly signed by Google. Use Google's public keys (available in JWK or PEM
///    format) to verify the token's signature. These keys are regularly rotated; examine the
///    `Cache-Control` header in the response to determine when you should retrieve them again.
///    - JWK: https://www.googleapis.com/oauth2/v3/certs (we use this one)
///    - PEM: https://www.googleapis.com/oauth2/v1/certs
/// 2. The value of `aud` in the ID token is equal to one of your app's client IDs. This check is
///    necessary to prevent ID tokens issued to a malicious app being used to access data about the
///    same user on your app's backend server.
/// 3. The value of `iss` in the ID token is equal to `accounts.google.com` or `https://accounts.google.com`.
/// 4. The expiry time (`exp`) of the ID token has not passed.
///
/// See: https://developers.google.com/identity/sign-in/ios/backend-auth#verify-the-integrity-of-the-id-token
pub async fn verify_id_token_integrity<T: CachedCerts>(
    id_token: &str,
    cached_certs: &mut T,
) -> Result<TokenData<Claims>, AuthError> {
    // unsafe_* to remind that this header was not verified
    let unsafe_header = decode_header(&id_token)?;
    if let Some(kid) = unsafe_header.kid {
        if let Some(key) = cached_certs.get_key_by_kid(&*kid).await {
            let validation = Validation {
                leeway: 30,                // seconds
                validate_exp: !cfg!(test), // 4. (disabled in tests)
                validate_nbf: false,       // NBF (not before) not present in the token
                aud: Some(
                    // 2.
                    vec![
                        String::from(
                            "245356693889-63qeuc6183hab6be342blikbknsvqrhk.apps.googleusercontent.com", // Web client ID
                        ),
                        String::from(
                            "245356693889-h3aj8e88fsnqch8gdcfh8isf8hruic7n.apps.googleusercontent.com", // iOS client ID
                        )
                    ]
                    .into_iter()
                    .collect(),
                ),
                // TODO: the second `iss` value as well (?)
                iss: Some(String::from("https://accounts.google.com")), // 3.
                algorithms: vec![
                    Algorithm::RS256, // we assume it's always RS256 - is it true?
                ],
                ..Default::default()
            };

            Ok(decode::<Claims>(
                &id_token,
                &DecodingKey::from_rsa_components(&key.modulus(), &key.exponent()), // 1. (prolly the most important)
                &validation,
            )?)
        } else {
            Err(AuthError::InvalidToken(format!(
                "cannot obtain Google certificate for key ID: '{}'",
                kid
            )))
        }
    } else {
        Err(AuthError::InvalidToken(String::from(
            "cannot get 'kid' from the token header",
        )))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::auth::certs::CachedCertsMock;

    #[tokio::test]
    async fn validate_jwt_token_valid() {
        // the following token is valid (signed by Google) but expired
        let valid_id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxOTdiZjJlODdiZDE5MDU1NzVmOWI2ZTVlYjQyNmVkYTVkNTc0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNDUzNTY2OTM4ODktaDNhajhlODhmc25xY2g4Z2RjZmg4aXNmOGhydWljN24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNDUzNTY2OTM4ODktaDNhajhlODhmc25xY2g4Z2RjZmg4aXNmOGhydWljN24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgyNjk0NTM1NzgxODc4ODY0MzUiLCJlbWFpbCI6Im1ydG56bG1sQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSGtZUldGOWJsZ0lVbjR2S09JcUFjQSIsIm5vbmNlIjoiVVFzZkVwM2FnaXp4TDBRWGFScS10cHpwOU1yNlBaUzlOYV9FY0dkM2t0cyIsIm5hbWUiOiJNYXJ0aW4gWmzDoW1hbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ19abVdZSEhNZWlfQVFkY2tWYVBxTGlrQmtOWUpPTnl5UjBRcVdmV3M9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFydGluIiwiZmFtaWx5X25hbWUiOiJabMOhbWFsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDgwNzI5NDMsImV4cCI6MTYwODA3NjU0M30.m4edhGdRMVRs8MJ-y2I1Ax_sUU2svAvaOk10j27a2tdwVYHiG9C1zvsyM8LOeWxVNRTT5XwhFPODK8h15kpb9-k1lQqApD5g-oyYMhi2xWgZ_G7-e5xC_Pm6tLAbmN7VwMJXiipdebEXfnaf2n_yipmhI0xs3BRhtj7kYBqQlcpW2YDPjS-3zV4SeEmwFsjhySS1uOZAnD_zM1vMkSluibF9gemp0o6CVc-DYj1jPXx4iRlPBlTCkQ-BCZNpDRqFOlLRGcRtNPd1P9yDWFOutqg0hcbEZN8hUTXd62CrvQ4iRHNetnOzJ5v2bxBlmWbHzvlKav8OKK9SlJCDM83qMw";
        insta::assert_debug_snapshot!(
            verify_id_token_integrity(valid_id_token, &mut CachedCertsMock::new()).await
        );
    }

    #[tokio::test]
    async fn validate_jwt_token_invalid() {
        assert_eq!(
            format!(
                "{:?}",
                verify_id_token_integrity("invalid", &mut CachedCertsMock::new())
                    .await
                    .err()
                    .unwrap()
            ),
            "JSONWebTokenError(Error(InvalidToken))"
        );
    }

    #[tokio::test]
    async fn validate_jwt_token_invalid_header() {
        // technically, this JWT token is valid but doesn't comply with our Google Sign-In
        // expectations so we reject it
        assert_eq!(
            format!("{:?}", verify_id_token_integrity(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                &mut CachedCertsMock::new()
            ).await.err().unwrap()),
            r#"InvalidToken("cannot get \'kid\' from the token header")"#
        );
    }

    #[tokio::test]
    async fn validate_jwt_token_invalid_algo() {
        // technically, this JWT token is valid but doesn't comply with our Google Sign-In
        // expectations so we reject it
        assert_eq!(
            format!("{:?}", verify_id_token_integrity(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMyJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.szMUBsawz52NUN3aIlpCIBDtbzB9U-G_tfG58c7PTKQ",
                &mut CachedCertsMock::new()
            ).await.err().unwrap()),
            r#"JSONWebTokenError(Error(InvalidAlgorithm))"#
        );
    }
}
