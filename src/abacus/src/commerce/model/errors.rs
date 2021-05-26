use crate::auth::rbac::RbacError;
use crate::images::ModelError as ImagesModelError;

#[derive(thiserror::Error, Debug)]
pub enum ModelError {
    #[error("Database error: {0}")]
    DatabaseError(arangors::ClientError),
    #[error("Logical error: {0}")]
    LogicalError(String),
    #[error("RBAC error: {0}")]
    RbacError(#[from] RbacError),
}

impl From<ImagesModelError> for ModelError {
    fn from(error: ImagesModelError) -> Self {
        match error {
            ImagesModelError::ProcessingError(e) => ModelError::LogicalError(e),
            ImagesModelError::RbacError(e) => ModelError::RbacError(e),
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
    fn rbac_error_to_string_test() {
        assert_eq!(
            format!("{}", ModelError::RbacError(RbacError::NotLoggedIn)),
            String::from("RBAC error: user is not logged in (anonymous)")
        );

        assert_eq!(
            format!(
                "{}",
                ModelError::RbacError(RbacError::InsufficientPermissions {
                    sub: "rbac-mock-id-123".to_string(),
                    act: "publish_product".to_string(),
                    obj: "commerce".to_string(),
                })
            ),
            String::from(
                "RBAC error: 'rbac-mock-id-123' doesn't have enough permission to perform action 'publish_product' in 'commerce' module"
            )
        );
    }
}
