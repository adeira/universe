use crate::analytics::dal::{get_sold_product_stats, AnalyticsSoldProductInfo, SortDirection};
use crate::auth::rbac;
use crate::auth::rbac::Actions::Analytics;
use crate::auth::rbac::AnalyticsActions::GetCheckoutStats;
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;

mod dal;

pub(crate) struct AnalyticsQuery;

#[juniper::graphql_object(context = Context)]
impl AnalyticsQuery {
    async fn most_sold_products(
        context: &Context,
    ) -> AbacusGraphQLResult<Vec<AnalyticsSoldProductInfo>> {
        rbac::verify_permissions(&context.user, &Analytics(GetCheckoutStats)).await?;
        Ok(get_sold_product_stats(&context.pool, &SortDirection::MostToLeast).await?)
    }

    async fn least_sold_products(
        context: &Context,
    ) -> AbacusGraphQLResult<Vec<AnalyticsSoldProductInfo>> {
        rbac::verify_permissions(&context.user, &Analytics(GetCheckoutStats)).await?;
        Ok(get_sold_product_stats(&context.pool, &SortDirection::LeastToMost).await?)
    }
}
