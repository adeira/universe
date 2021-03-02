use crate::migrations::utils::{create_document, ArangoDocument};
use arangors::ClientError;

#[derive(serde::Serialize, serde::Deserialize)]
struct User {
    _key: String,
    r#type: String,
    google: UserGoogleClaims,
}

#[derive(serde::Serialize, serde::Deserialize)]
struct UserGoogleClaims {
    iss: String,
    sub: String,
    azp: String,
    aud: String,
    iat: usize,
    exp: usize,
    email: String,
    email_verified: bool,
    name: String,
    picture: String,
    given_name: String,
    family_name: String,
    locale: String,
}

impl ArangoDocument for User {
    fn idempotency_key(&self) -> &str {
        &self._key
    }
}

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let user_google_claims = UserGoogleClaims {
        iss: String::from("https://accounts.google.com"),
        sub: String::from("108269453578187886435"),
        azp: String::from("245356693889-63qeuc6183hab6be342blikbknsvqrhk.apps.googleusercontent.com"),
        aud: String::from("245356693889-63qeuc6183hab6be342blikbknsvqrhk.apps.googleusercontent.com"),
        iat: 1610381356,
        exp: 1610384956,
        email: String::from("mrtnzlml@gmail.com"),
        email_verified: true,
        name: String::from("Martin Zlámal"),
        picture: String::from("https://lh3.googleusercontent.com/a-/AOh14Gg_ZmWYHHMei_AQdckVaPqLikBkNYJONyyR0QqWfWs=s96-c"),
        given_name: String::from("Martin"),
        family_name: String::from("Zlámal"),
        locale: String::from("en")
    };

    let user = User {
        _key: String::from("2"),
        r#type: String::from("admin"),
        google: user_google_claims,
    };

    create_document(&db, "users", user).await
}
