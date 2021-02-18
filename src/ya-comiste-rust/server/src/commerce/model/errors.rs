use crate::images::ModelError as ImagesModelError;

#[derive(Debug)]
pub enum ModelError {
    DatabaseError(arangors::ClientError),
    LogicalError(String),
    PermissionsError(String),
}

impl From<ModelError> for String {
    fn from(error: ModelError) -> String {
        match error {
            ModelError::DatabaseError(e) => {
                format!("{:?}", e) // TODO: hide the error (?)
            }
            ModelError::LogicalError(e) => e, // TODO: hide the error (?)
            ModelError::PermissionsError(e) => e, // TODO: hide the error (?)
        }
    }
}

impl From<ImagesModelError> for ModelError {
    fn from(error: ImagesModelError) -> Self {
        match error {
            ImagesModelError::PermissionsError(e) => ModelError::PermissionsError(e),
            ImagesModelError::ProcessingError(e) => ModelError::LogicalError(e),
        }
    }
}
