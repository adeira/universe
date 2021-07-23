use http::{HeaderMap, Request, Response};
use url::Url;

use crate::arangors::ClientError;

pub mod reqwest;

#[async_trait::async_trait]
pub trait ClientExt: Sync + Clone {
    fn new<U: Into<Option<HeaderMap>>>(headers: U) -> Result<Self, ClientError>
    where
        Self: Sized;

    fn headers(&mut self) -> &mut HeaderMap;

    fn clone_with_transaction(&self, transaction_id: String) -> Result<Self, ClientError>
    where
        Self: Sized;

    #[inline]
    async fn get<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::get(url.to_string()).body(text.into()).unwrap())
            .await
    }
    #[inline]
    async fn post<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::post(url.to_string()).body(text.into()).unwrap())
            .await
    }
    #[inline]
    async fn put<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::put(url.to_string()).body(text.into()).unwrap())
            .await
    }
    #[inline]
    async fn delete<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::delete(url.to_string()).body(text.into()).unwrap())
            .await
    }
    #[inline]
    async fn patch<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::patch(url.to_string()).body(text.into()).unwrap())
            .await
    }

    #[inline]
    async fn connect<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::connect(url.to_string()).body(text.into()).unwrap())
            .await
    }

    #[inline]
    async fn head<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::head(url.to_string()).body(text.into()).unwrap())
            .await
    }

    #[inline]
    async fn options<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::options(url.to_string()).body(text.into()).unwrap())
            .await
    }

    #[inline]
    async fn trace<T>(&self, url: Url, text: T) -> Result<Response<String>, ClientError>
    where
        Self: Sized,
        T: Into<String> + Send,
    {
        self.request(Request::trace(url.to_string()).body(text.into()).unwrap())
            .await
    }

    async fn request(&self, request: Request<String>) -> Result<Response<String>, ClientError>
    where
        Self: Sized;
}
