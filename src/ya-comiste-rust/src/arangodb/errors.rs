/// Logic error (when something doesn't make any sense):
///
/// ```
/// use arangodb::errors::ModelError;
/// assert_eq!(format!("{}", ModelError::LogicError("ups".to_string())), "Logic error: ups")
/// ```
#[derive(Debug)]
pub enum ModelError {
    DatabaseError(arangors::ClientError),
    LogicError(String),
    PermissionsError(String),
    SerdeError(serde_json::Error),
}

// so we can use the `?` operator with ArangoDB client error
impl From<arangors::ClientError> for ModelError {
    fn from(err: arangors::ClientError) -> ModelError {
        ModelError::DatabaseError(err)
    }
}

// so we can use the `?` operator with Serde JSON
impl From<serde_json::Error> for ModelError {
    fn from(err: serde_json::Error) -> ModelError {
        ModelError::SerdeError(err)
    }
}

impl std::fmt::Display for ModelError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            ModelError::DatabaseError(ref err) => write!(f, "Database error: {}", err.to_string()),
            ModelError::LogicError(ref err) => write!(f, "Logic error: {}", err),
            ModelError::PermissionsError(ref err) => write!(f, "Permissions error: {}", err),
            ModelError::SerdeError(ref err) => write!(f, "Serde error: {}", err),
        }
    }
}
