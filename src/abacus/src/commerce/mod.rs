// Database abstraction layer should be accessible only through model layer (it checks permissions
// and other business rules).
pub(in crate::commerce) mod dal;

// Model layer should be accessible only through public API.
pub(in crate::commerce) mod model;

// API is accessible from anywhere needed.
pub(crate) mod api;
