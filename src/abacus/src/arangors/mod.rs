//! # arangors
//!
//! `arangors` is an intuitive rust client for [ArangoDB](https://www.arangodb.com/),
//! inspired by [pyArango](https://github.com/tariqdaouda/pyArango).
//!
//! `arangors` enables you to connect with ArangoDB server, access to database,
//! execute AQL query, manage ArangoDB in an easy and intuitive way.
//!
//! ## Philosophy of arangors
//!
//! `arangors` is targeted at ergonomic, intuitive and OOP-like API for
//! ArangoDB, both top level and low level API for users' choice.
//!
//! Overall architecture of ArangoDB:
//!
//! > databases -> collections -> documents/edges
//!
//! In fact, the design of `arangors` just mimic this architecture, with a
//! slight difference that in the top level, there is a connection object on top
//! of databases, containing a HTTP client with authentication information in
//! HTTP headers.
//!
//! Hierarchy of arangors:
//! > connection -> databases -> collections -> documents/edges
//!

pub use crate::arangors::connection::Connection;
pub use crate::arangors::{
    aql::{AqlOptions, AqlQuery, Cursor},
    collection::Collection,
    connection::GenericConnection,
    database::Database,
    document::Document,
    error::{ArangoError, ClientError},
};

pub(crate) mod analyzer;
pub(crate) mod aql;
pub(crate) mod client;
pub(crate) mod collection;
pub(crate) mod connection;
pub(crate) mod database;
pub(crate) mod document;
pub(crate) mod error;
pub(crate) mod graph;
pub(crate) mod index;
pub(crate) mod transaction;
pub(crate) mod view;

mod response;
