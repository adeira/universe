#[derive(Clone)]
pub struct GlobalConfiguration {
    pub stripe_restricted_api_key: Option<String>,
    pub stripe_webhook_secret: Option<String>,
}

#[cfg(test)]
impl Default for GlobalConfiguration {
    fn default() -> Self {
        GlobalConfiguration {
            stripe_restricted_api_key: Some("mocked".to_string()),
            stripe_webhook_secret: Some("mocked".to_string()),
        }
    }
}

impl GlobalConfiguration {
    pub fn stripe_restricted_api_key(&self) -> String {
        self.stripe_restricted_api_key
            .to_owned()
            .expect("Stripe (restricted) API key was not set.")
    }

    pub fn stripe_webhook_secret(&self) -> String {
        self.stripe_webhook_secret
            .to_owned()
            .expect("Stripe webhook secret was not set.")
    }
}
