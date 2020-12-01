const ARANGODB_HOST: &str = "http://127.0.0.1:8529/";
const NORMAL_USERNAME: &str = "ya-comiste-rust"; // TODO: change!
const NORMAL_PASSWORD: &str = ""; // TODO: change!

pub fn get_normal_user() -> String {
    std::env::var("ARANGO_USER").unwrap_or(NORMAL_USERNAME.to_owned())
}

pub fn get_normal_password() -> String {
    std::env::var("ARANGO_PASSWORD").unwrap_or(NORMAL_PASSWORD.to_owned())
}

/// Default ArangoDB host:
///
/// ```
/// use arangodb::get_arangodb_host;
/// assert_eq!(get_arangodb_host(), "http://127.0.0.1:8529/")
/// ```
///
/// Custom ArangoDB host (via ENV):
///
/// ```
/// use arangodb::get_arangodb_host;
/// std::env::set_var("ARANGODB_HOST", "0.0.0.0:1234");
/// assert_eq!(get_arangodb_host(), "http://0.0.0.0:1234")
/// ```
pub fn get_arangodb_host() -> String {
    std::env::var("ARANGODB_HOST")
        .map(|s| format!("http://{}", s))
        .unwrap_or(ARANGODB_HOST.to_owned())
}

pub async fn connection() -> arangors::Connection {
    let host = get_arangodb_host();
    let user = get_normal_user();
    let password = get_normal_password();

    arangors::Connection::establish_basic_auth(&host, &user, &password)
        .await
        .unwrap()
}
