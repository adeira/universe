#[derive(Debug)]
pub enum AuthError {
    InvalidToken(String), // unable the use the token because working with it somehow failed
    JSONWebTokenError(jsonwebtoken::errors::Error),
}

impl std::fmt::Display for AuthError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

// so we can use the `?` operator
impl From<jsonwebtoken::errors::Error> for AuthError {
    fn from(err: jsonwebtoken::errors::Error) -> AuthError {
        AuthError::JSONWebTokenError(err)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn display_test() {
        assert_eq!(
            format!("{}", AuthError::InvalidToken(String::from("XYZ"))),
            r#"InvalidToken("XYZ")"#
        )
    }

    #[test]
    fn debug_test() {
        assert_eq!(
            format!("{:?}", AuthError::InvalidToken(String::from("XYZ"))),
            r#"InvalidToken("XYZ")"#
        )
    }
}
