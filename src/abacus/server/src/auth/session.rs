use rand::Rng;
use serde::Deserialize;

/// Generates sessions token which is compatible with RFC6750 - "Authorization Framework: Bearer
/// Token Usage" syntax (https://tools.ietf.org/html/rfc6750).
///
/// Session OWASP recommended requirements:
///
/// 1. Session ID Length (the session ID length must be at least 128 bits (16 bytes))
/// 2. Session ID Entropy (?)
/// 3. Session ID Content (must be meaningless to prevent information disclosure attacks)
/// 4. Session ID must be unique
///
/// See: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-id-properties
///
/// Hashed version of this session token can (and should) be used as a collection key in the DB.
/// See: https://www.arangodb.com/docs/stable/data-modeling-naming-conventions-document-keys.html
///
/// Raw session token version complies with RFC6750 so it can be used as a Bearer token, see:
/// https://tools.ietf.org/html/rfc6750#section-2.1 (https://tools.ietf.org/html/rfc5234)
pub(crate) fn generate_session_token() -> String {
    const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~+/";

    let mut rng = rand::thread_rng();
    let session_token: String = (0..128)
        .map(|_| {
            let idx = rng.gen_range(0..CHARSET.len());
            CHARSET[idx] as char
        })
        .collect();

    session_token
}

/// Derives hash of the session token which can be securely saved in the database.
///
/// Note: we currently do not salt the tokens per user since we expect that every generated
/// session/hash will be unique. This is a strong requirement since the session token uniquely
/// identifies the user. The salt below is just to be future proof in case we change our mind with
/// the salting (and to salt the DB).
pub(crate) fn derive_session_token_hash(session_token: &str) -> String {
    // We are not using PBKDF2-like derivation functions on purpose here. The reasoning is that our
    // session token has high enough entropy and we need to have this derivation as fast as possible
    // since it's being called with every API request (to fetch and verify the user per request).
    // See: https://security.stackexchange.com/q/151257

    // Database-unique component so that an attacker cannot crack the same session_token across
    // databases. This value was generated from a secure PRNG.
    // See: https://briansmith.org/rustdoc/ring/pbkdf2/index.html#password-database-example
    let db_salt_component = "32fd09c7-82d2-47c5-8fe4-81a526d3996d";

    let hash = ring::digest::digest(
        &ring::digest::SHA256,
        format!("{}{}", db_salt_component, session_token).as_bytes(),
    );

    // https://rust-lang-nursery.github.io/rust-cookbook/cryptography/encryption.html
    data_encoding::HEXLOWER.encode(hash.as_ref())
}

#[derive(Clone, Deserialize)]
pub struct Session {
    _id: String,
    _rev: String,
    _key: String,
    // Unused: last_access: String,
}

#[cfg(test)]
impl Session {
    /// It is not possible to retrieve back the original session token, only hash (similar to how
    /// passwords would work).
    pub fn session_token_hash(&self) -> &String {
        &self._key
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generate_session_token_test() {
        let mut previous_token = String::from("");
        for _ in 0..1000 {
            let new_token = generate_session_token();
            assert_eq!(new_token.len(), 128);
            assert_ne!(new_token, previous_token);
            previous_token = new_token;
            assert_eq!(previous_token.len(), 128);
        }
    }

    #[test]
    fn derive_session_token_hash_test() {
        let mut previous_hash = String::from("");
        for _ in 0..1000 {
            let new_hash = derive_session_token_hash(&*generate_session_token());
            assert_eq!(new_hash.len(), 64);
            assert_ne!(new_hash, previous_hash);
            previous_hash = new_hash;
            assert_eq!(previous_hash.len(), 64);
        }
    }
}
