use crate::auth::rbac::RbacError;
use juniper::graphql_value;

pub struct AbacusGraphQLError {
    error_message: String,
    is_critical: bool,
}

pub type AbacusGraphQLResult<T, E = AbacusGraphQLError> = core::result::Result<T, E>;

/// This allows us to return `Result<…, AbacusGraphQLError>` from GraphQL resolvers.
impl<S: juniper::ScalarValue> juniper::IntoFieldError<S> for AbacusGraphQLError {
    fn into_field_error(self) -> juniper::FieldError<S> {
        tracing::error!("{}", self.error_message);
        if self.is_critical {
            juniper::FieldError::new(
                self.error_message,
                graphql_value!({ "severity": "CRITICAL" }),
            )
        } else {
            juniper::FieldError::from(self.error_message)
        }
    }
}

/// This allows us to convert `anyhow::Error` to `AbacusGraphQLError` via `?`.
/// RBAC errors are being downcasted into critical errors.
impl From<anyhow::Error> for AbacusGraphQLError {
    fn from(error: anyhow::Error) -> Self {
        if let Some(rbac_error) = error.downcast_ref::<RbacError>() {
            return AbacusGraphQLError {
                error_message: rbac_error.to_string(),
                is_critical: true,
            };
        }

        let error_message = error.downcast::<String>().unwrap_err().to_string();
        AbacusGraphQLError {
            error_message,
            is_critical: false,
        }
    }
}
