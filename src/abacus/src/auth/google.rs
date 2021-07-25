use crate::auth::certs::{CachedCerts, CertKey};
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

    pub(crate) fn name(&self) -> &Option<String> {
        &self.name
    }

    pub(crate) fn given_name(&self) -> &Option<String> {
        &self.given_name
    }

    pub(crate) fn family_name(&self) -> &Option<String> {
        &self.family_name
    }

    pub(crate) fn is_email_verified(&self) -> &Option<bool> {
        &self.email_verified
    }

    #[cfg(test)]
    pub(crate) fn mock(sub: &str) -> Claims {
        Claims {
            iss: String::from(""),
            sub: sub.to_string(),
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

fn create_id_token_validation(iss: &str) -> Validation {
    Validation {
        leeway: 30,                // seconds
        validate_exp: !cfg!(test), // disabled in tests
        validate_nbf: false,       // NBF (not before) not present in the token
        aud: Some(
            vec![String::from(
                "586578400209-5k61strd7i03b7pr2arn38o9qqghgfeq.apps.googleusercontent.com", // ABACUS Backoffice (Web application)
            )]
            .into_iter()
            .collect(),
        ),
        iss: Some(String::from(iss)),
        algorithms: vec![
            Algorithm::RS256, // we assume it's always RS256 - is it true?
        ],
        ..Default::default()
    }
}

fn validate_id_token(id_token: &str, cert: &CertKey) -> anyhow::Result<TokenData<Claims>> {
    let decoding_key = &DecodingKey::from_rsa_components(&cert.modulus(), &cert.exponent());
    match decode(
        &id_token,
        &decoding_key,
        &create_id_token_validation("https://accounts.google.com"),
    ) {
        Ok(token_data) => Ok(token_data),
        Err(_) => {
            // OK, so the first call failed. Let's try the alternative `iss` before failing:
            Ok(decode(
                &id_token,
                &decoding_key,
                &create_id_token_validation("accounts.google.com"),
            )?)
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
/// 3. The value of `iss` in the ID token is equal to "accounts.google.com" or "https://accounts.google.com".
/// 4. The expiry time (`exp`) of the ID token has not passed.
///
/// See: https://developers.google.com/identity/sign-in/ios/backend-auth#verify-the-integrity-of-the-id-token
pub async fn verify_id_token_integrity<T: CachedCerts>(
    id_token: &str,
    cached_certs: &mut T,
) -> anyhow::Result<TokenData<Claims>> {
    // unsafe_* to remind that this header was not verified
    let unsafe_header = decode_header(&id_token)?;
    if let Some(kid) = unsafe_header.kid {
        if let Some(key) = cached_certs.get_key_by_kid(&*kid).await {
            validate_id_token(&id_token, &key)
        } else {
            anyhow::bail!("cannot obtain Google certificate for key ID: '{}'", kid);
        }
    } else {
        anyhow::bail!("cannot get 'kid' from the token header")
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::auth::certs::CachedCertsMock;

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
            "InvalidToken"
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
            r#"cannot get 'kid' from the token header"#
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
            r#"InvalidAlgorithm"#
        );
    }
}
