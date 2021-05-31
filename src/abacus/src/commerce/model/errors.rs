use crate::auth::rbac::RbacError;
use crate::images::ModelError as ImagesModelError;
use juniper::{graphql_value, FieldError, ScalarValue};

#[derive(thiserror::Error, Debug)]
pub enum ModelError {
    #[error("Database error: {0}")]
    DatabaseError(arangors::ClientError),
    #[error("Logical error: {0}")]
    LogicalError(String),
    #[error("RBAC error: {0}")]
    RbacError(#[from] RbacError),
}

/// This allows us to return `Result<…, ModelError>` from GraphQL resolvers. Here we can decide
/// whether the errors are going to be displayed publicly, whether they are critical for the
/// consuming client and so on.
impl<S: ScalarValue> juniper::IntoFieldError<S> for ModelError {
    fn into_field_error(self) -> FieldError<S> {
        match self {
            ModelError::LogicalError(error) => FieldError::from(error),
            ModelError::DatabaseError(error) => {
                // Note: we are currently not hiding database errors in GraphQL but eventually we
                // should probably start returning something like "Internal database error".
                FieldError::new(error, graphql_value!({ "severity": "CRITICAL" }))
            }
            ModelError::RbacError(error) => {
                // Note: we are currently not hiding RBAC errors in GraphQL but eventually we
                // should probably start returning something like "Internal server error".
                FieldError::new(error, graphql_value!({ "severity": "CRITICAL" }))
            }
        }
    }
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
