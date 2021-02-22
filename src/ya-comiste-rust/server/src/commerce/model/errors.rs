use crate::images::ModelError as ImagesModelError;

#[derive(Debug)]
pub enum ModelError {
    DatabaseError(arangors::ClientError),
    LogicalError(String),
    PermissionsError(String),
}

impl From<ImagesModelError> for ModelError {
    fn from(error: ImagesModelError) -> Self {
        match error {
            ImagesModelError::PermissionsError(e) => ModelError::PermissionsError(e),
            ImagesModelError::ProcessingError(e) => ModelError::LogicalError(e),
        }
    }
}

impl std::fmt::Display for ModelError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            ModelError::DatabaseError(ref err) => write!(f, "Database error: {}", err.to_string()),
            ModelError::LogicalError(ref err) => write!(f, "Logical error: {}", err),
            ModelError::PermissionsError(ref err) => write!(f, "Permissions error: {}", err),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn logical_error_to_string_test() {
        assert_eq!(
            format!("{}", ModelError::LogicalError(String::from("test message"))),
            String::from("Logical error: test message")
        )
    }

    #[test]
    fn permissions_error_to_string_test() {
        assert_eq!(
            format!(
                "{}",
                ModelError::PermissionsError(String::from("test message"))
            ),
            String::from("Permissions error: test message")
        )
    }
}
