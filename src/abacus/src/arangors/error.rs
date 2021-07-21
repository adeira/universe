use std::fmt;

use serde::Deserialize;
use thiserror::Error;

use crate::arangors::connection::Permission;

#[derive(Error, Debug)]
pub enum ClientError {
    #[error("Insufficient permission ({permission:?}) to operate: {operation}")]
    InsufficientPermission {
        permission: Permission,
        operation: String,
    },
    #[error("Server is not ArangoDB: {0}")]
    InvalidServer(String),
    #[error("Error from server: {0}")]
    Arango(#[from] ArangoError),
    #[error("Error from serde: {0}")]
    Serde(#[from] serde_json::error::Error),
    #[error("HTTP client error: {0}")]
    HttpClient(#[from] uclient::ClientError),
}

#[derive(Deserialize, Debug, Error)]
pub struct ArangoError {
    pub(crate) code: u16,
    #[serde(rename = "errorNum")]
    pub(crate) error_num: u16,
    #[serde(rename = "errorMessage")]
    pub(crate) message: String,
}

impl fmt::Display for ArangoError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}({})", self.message, self.error_num)
    }
}

impl ArangoError {
    /// Get the HTTP status code of an error response.
    #[allow(dead_code)]
    pub fn code(&self) -> u16 {
        self.code
    }

    #[allow(dead_code)]
    pub fn error_num(&self) -> u16 {
        self.error_num
    }

    #[allow(dead_code)]
    pub fn message(&self) -> &str {
        &self.message
    }
}
