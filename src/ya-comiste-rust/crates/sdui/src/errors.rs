/// Logic error (when something doesn't make any sense):
///
/// ```
/// use sdui::errors::ModelError;
/// assert_eq!(format!("{}", ModelError::LogicError("ups".to_string())), "Logic error: ups")
/// ```
pub enum ModelError {
    // TODO: naming (SDUIError?)
    DatabaseError(arangors::ClientError),
    LogicError(String),
}

// so we can use the `?` operator
impl From<arangors::ClientError> for ModelError {
    fn from(err: arangors::ClientError) -> ModelError {
        ModelError::DatabaseError(err)
    }
}

impl std::fmt::Display for ModelError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            ModelError::DatabaseError(ref err) => write!(f, "Database error: {}", err.to_string()),
            ModelError::LogicError(ref err) => write!(f, "Logic error: {}", err),
        }
    }
}
