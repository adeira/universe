use crate::analytics::dal::{
    get_daily_reports, get_redirect_hits, get_sold_product_stats, AnalyticsDailyReportInfo,
    AnalyticsSoldProductInfo, Redirect, SortDirection,
};
use crate::arango::ConnectionPool;
use crate::auth::rbac;
use crate::auth::rbac::Actions::Analytics;
use crate::auth::rbac::AnalyticsActions::{GetCheckoutStats, GetDailyReports, GetRedirectHits};
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;
use uuid::Uuid;

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

    async fn redirect_hits(context: &Context) -> AbacusGraphQLResult<Vec<Redirect>> {
        rbac::verify_permissions(&context.user, &Analytics(GetRedirectHits)).await?;
        Ok(get_redirect_hits(&context.pool).await?)
    }

    async fn daily_reports(
        context: &Context,
    ) -> AbacusGraphQLResult<Vec<AnalyticsDailyReportInfo>> {
        rbac::verify_permissions(&context.user, &Analytics(GetDailyReports)).await?;
        Ok(get_daily_reports(&context.pool).await?)
    }
}

pub(crate) async fn get_link_and_record_hit(pool: &ConnectionPool, uuid: &Uuid) -> Option<String> {
    // anyone can call this function, there is not RBAC restriction
    match crate::analytics::dal::get_link_and_record_hit(pool, uuid).await {
        Ok(redirect) => Some(redirect.redirects_to()),
        Err(error) => {
            tracing::error!("{}", error);
            None
        }
    }
}
