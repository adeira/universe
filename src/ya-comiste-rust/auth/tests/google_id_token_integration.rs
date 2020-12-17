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

#[test]
fn it_returns_error_on_expired_token() {
    // this JWT token is valid and signed by Google but already expired
    let id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxOTdiZjJlODdiZDE5MDU1NzVmOWI2ZTVlYjQyNmVkYTVkNTc0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNDUzNTY2OTM4ODktaDNhajhlODhmc25xY2g4Z2RjZmg4aXNmOGhydWljN24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNDUzNTY2OTM4ODktaDNhajhlODhmc25xY2g4Z2RjZmg4aXNmOGhydWljN24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgyNjk0NTM1NzgxODc4ODY0MzUiLCJlbWFpbCI6Im1ydG56bG1sQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSGtZUldGOWJsZ0lVbjR2S09JcUFjQSIsIm5vbmNlIjoiVVFzZkVwM2FnaXp4TDBRWGFScS10cHpwOU1yNlBaUzlOYV9FY0dkM2t0cyIsIm5hbWUiOiJNYXJ0aW4gWmzDoW1hbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ19abVdZSEhNZWlfQVFkY2tWYVBxTGlrQmtOWUpPTnl5UjBRcVdmV3M9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFydGluIiwiZmFtaWx5X25hbWUiOiJabMOhbWFsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDgwNzI5NDMsImV4cCI6MTYwODA3NjU0M30.m4edhGdRMVRs8MJ-y2I1Ax_sUU2svAvaOk10j27a2tdwVYHiG9C1zvsyM8LOeWxVNRTT5XwhFPODK8h15kpb9-k1lQqApD5g-oyYMhi2xWgZ_G7-e5xC_Pm6tLAbmN7VwMJXiipdebEXfnaf2n_yipmhI0xs3BRhtj7kYBqQlcpW2YDPjS-3zV4SeEmwFsjhySS1uOZAnD_zM1vMkSluibF9gemp0o6CVc-DYj1jPXx4iRlPBlTCkQ-BCZNpDRqFOlLRGcRtNPd1P9yDWFOutqg0hcbEZN8hUTXd62CrvQ4iRHNetnOzJ5v2bxBlmWbHzvlKav8OKK9SlJCDM83qMw";
    let mut cached_certs = auth::certs::CachedCertsProduction::new();
    let verify_result = auth::verify_id_token_integrity(id_token, &mut cached_certs);

    assert_eq!(verify_result.is_err(), true);
    assert_eq!(
        format!("{:?}", verify_result.err().unwrap()),
        r#"JSONWebTokenError(Error(ExpiredSignature))"#
    );
}
