use crate::arango::DatabaseType;
use crate::migrations::utils::{create_document, ArangoDocument};

#[derive(serde::Serialize, serde::Deserialize)]
struct User {
    _key: String,
    is_active: bool,
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

pub async fn migrate(db: &DatabaseType) -> anyhow::Result<()> {
    let user_google_claims = UserGoogleClaims {
        iss: String::from("https://accounts.google.com"),
        sub: String::from("108269453578187886435"),
        azp: String::from("586578400209-5k61strd7i03b7pr2arn38o9qqghgfeq.apps.googleusercontent.com"),
        aud: String::from("586578400209-5k61strd7i03b7pr2arn38o9qqghgfeq.apps.googleusercontent.com"),
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
        is_active: true,
        google: user_google_claims,
    };

    create_document(&db, "users", user).await
}
