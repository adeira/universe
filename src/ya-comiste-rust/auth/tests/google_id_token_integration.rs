use auth::certs::CachedCerts;

// TODO: how to test a success scenario (where to get a valid ID token?)
// https://stackoverflow.com/questions/17657879/does-google-provide-test-users-for-integration-testing

#[test]
fn it_returns_error_on_invalid_token() {
    let id_token = "invalid_id_token";
    let mut cached_certs = auth::certs::CachedCertsProduction::new();
    let verify_result = auth::verify_id_token_integrity(id_token, &mut cached_certs);

    assert_eq!(verify_result.is_err(), true);
    assert_eq!(
        format!("{:?}", verify_result.err().unwrap()),
        "JSONWebTokenError(Error(InvalidToken))"
    );
}

#[test]
fn it_returns_error_on_incompatible_token_header() {
    // this JWT token is technically valid but not for Google auth (invalid JWT header)
    let id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    let mut cached_certs = auth::certs::CachedCertsProduction::new();
    let verify_result = auth::verify_id_token_integrity(id_token, &mut cached_certs);

    assert_eq!(verify_result.is_err(), true);
    assert_eq!(
        format!("{:?}", verify_result.err().unwrap()),
        r#"InvalidToken("cannot get \'kid\' from the token header")"#
    );
}

#[test]
fn it_returns_error_on_unsigned_token() {
    // this JWT token is valid but not signed by google => rejected
    // note: this will actually call Google API and try to verify it

    let id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMyJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.szMUBsawz52NUN3aIlpCIBDtbzB9U-G_tfG58c7PTKQ";
    let mut cached_certs = auth::certs::CachedCertsProduction::new();
    let verify_result = auth::verify_id_token_integrity(id_token, &mut cached_certs);

    assert_eq!(verify_result.is_err(), true);
    assert_eq!(
        format!("{:?}", verify_result.err().unwrap()),
        r#"InvalidToken("cannot obtain Google certificate for key ID: \'123\'")"# // 123 is from the JWT header
    );
}
