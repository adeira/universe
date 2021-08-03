use crate::auth::rbac;
use crate::auth::rbac::Actions::Commerce;
use crate::auth::rbac::CommerceActions::GetAllProductAddons;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;
use crate::price::Price;
use serde::Deserialize;

/// TODO:
///  - pricing model "percentage fee" (extra 10% of the product price)
#[derive(Clone, Deserialize)]
pub struct ProductAddon {
    _id: String,
    _rev: String,
    _key: String,
    /// Resolved product add-on name (from translations based on the eshop locale).
    name: String,
    price_extra: Price,
}

/// Product add-on can be attached to any product as an addition. For example, coffee Latte as a
/// product can have add-ons: dairy free milk, vanilla syrup, …
///
/// Each product add-on can affect the final product price. At this moment we support only one
/// pricing model: flat fee (for example, extra 10 MXN per coffee for milk without lactose).
#[juniper::graphql_object]
impl ProductAddon {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    /// The product variant's name, meant to be displayable to the customer.
    fn name(&self) -> String {
        self.name.to_owned()
    }

    /// Extra price (flat fee) that should be added to the product price. For example, if coffee
    /// consts 50 MXN and oat milk has price extra 10 MXN then the final price should be 60 MXN.
    fn price_extra(&self) -> Price {
        self.price_extra.to_owned()
    }
}

pub(in crate::commerce) async fn search_all_product_addons(
    context: &Context,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductAddon>>> {
    rbac::verify_permissions(&context.user, &Commerce(GetAllProductAddons)).await?;

    crate::commerce::dal::product_addons::search_product_addons(&context.pool, client_locale).await
}
