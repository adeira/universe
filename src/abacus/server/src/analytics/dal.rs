use crate::arango::{resolve_aql, resolve_aql_vector, ConnectionPool};
use crate::price::Price;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Clone, juniper::GraphQLObject, Debug)]
pub(in crate::analytics) struct AnalyticsSoldProductInfo {
    product_id: String,
    product_name: String,
    product_units: i32,
}

#[derive(Deserialize, Clone, juniper::GraphQLObject, Debug)]
pub(in crate::analytics) struct AnalyticsSoldProductQuarterlyInfo {
    date_quarter: i32, // 1, 2, 3, or 4
    date_year: i32,    // 2021, 2022, ...
    stats: Vec<AnalyticsSoldProductInfo>,
}

pub enum SortDirection {
    MostToLeast,
    LeastToMost,
}

#[derive(Deserialize)]
pub struct Redirect {
    _id: String,
    _key: String,
    redirects_to: String,
    description: String,
    hits: i32,
}

#[juniper::graphql_object]
impl Redirect {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    /// UUID is the ID used for redirects, for example: https://…/redirect/:uuid
    fn uuid(&self) -> String {
        // Technically, we use the ArangoDB _key as a UUID but we don't want to expose this
        // implementation detail directly.
        self._key.to_owned()
    }

    fn redirects_to(&self) -> String {
        self.redirects_to.to_owned()
    }

    fn description(&self) -> String {
        self.description.to_owned()
    }

    fn hits(&self) -> i32 {
        self.hits.to_owned()
    }
}

impl Redirect {
    pub(crate) fn redirects_to(&self) -> String {
        self.redirects_to.to_owned()
    }
}

/// This function tries to find a link in the database based on the specified identifier and
/// returns it. Additionally, it records a "hit" which is basically of counter of the requests.
pub(in crate::analytics) async fn get_link_and_record_hit(
    pool: &ConnectionPool,
    uuid: &Uuid,
) -> anyhow::Result<Redirect> {
    resolve_aql(
        pool,
        r#"
            LET redirect = DOCUMENT("analytics_redirects", @uuid)
            UPDATE redirect WITH { hits: redirect.hits + 1 } IN analytics_redirects
            RETURN NEW
        "#,
        hashmap_json![
            "uuid" => uuid.hyphenated().encode_lower(&mut Uuid::encode_buffer()),
        ],
    )
    .await
}

pub(in crate::analytics) async fn get_redirect_hits(
    pool: &ConnectionPool,
) -> anyhow::Result<Vec<Redirect>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR redirect IN analytics_redirects
              SORT redirect.hits DESC
              RETURN redirect
        "#,
        hashmap_json![],
    )
    .await
}

/// Returns most or least sold products (all time). By default, limited to 100 first results.
pub(in crate::analytics) async fn get_sold_product_stats(
    pool: &ConnectionPool,
    sort_direction: &SortDirection,
) -> anyhow::Result<Vec<AnalyticsSoldProductQuarterlyInfo>> {
    let sort_direction = match sort_direction {
        SortDirection::MostToLeast => "DESC",
        SortDirection::LeastToMost => "ASC",
    };

    resolve_aql_vector(
        pool,
        r#"
            FOR checkout IN pos_checkouts
              LET date_local = DATE_UTCTOLOCAL(checkout.created_date, "America/Mexico_City")

              COLLECT
                date_quarter = DATE_QUARTER(date_local),
                date_year = DATE_YEAR(date_local)
              INTO all_checkouts_per_quarter = {
                selected_products: checkout.selected_products
              }

              SORT date_year DESC, date_quarter DESC

              LET stats = (
                FOR checkout IN all_checkouts_per_quarter
                  FOR selected_product IN checkout.selected_products
                    COLLECT product_id = selected_product.product_id
                    AGGREGATE product_units = SUM(selected_product.product_units)
                    INTO product_names = selected_product.product_name
                    SORT product_units @sort_direction
                    LIMIT 30
                    RETURN {
                      "product_id": product_id,
                      "product_name": LAST(product_names),
                      "product_units": product_units
                    }
              )

              RETURN {
                date_quarter,
                date_year,
                stats
              }
        "#,
        hashmap_json![
            "sort_direction" => sort_direction,
        ],
    )
    .await
}

#[derive(Deserialize, Clone, juniper::GraphQLObject, Debug)]
pub(in crate::analytics) struct AnalyticsDailyReportProductSummaryInfo {
    product_id: String,
    product_name: String,
    total_units: i32,
    // TODO (fix the "Price" format):
    // {
    //   "product_id": "products/3633334",
    //   "total_units": 3,
    //   "total_units_price": 16500,
    //   "product_name": "Iced Caffe Latte",
    //   "unit_price": 5500
    // },
}

#[derive(Deserialize, Clone, juniper::GraphQLObject, Debug)]
pub(in crate::analytics) struct AnalyticsDailyReportInfo {
    date_day: String,
    total: Price,
    products_summary: Vec<AnalyticsDailyReportProductSummaryInfo>,
}

/// Returns sales reports per day (daily total, sold items, totals per item, ...). The results are
/// currently limited to the last 30 days and work only with MXN currency.
pub(in crate::analytics) async fn get_daily_reports(
    pool: &ConnectionPool,
) -> anyhow::Result<Vec<AnalyticsDailyReportInfo>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR checkout IN pos_checkouts
              COLLECT date_day = DATE_TRUNC(DATE_UTCTOLOCAL(checkout.created_date, "America/Mexico_City"), "day") INTO bucket
              SORT date_day DESC
              LIMIT 30
              LET products_summary = (
                FOR checkout IN bucket
                  FOR selected_product IN checkout.checkout.selected_products
                    COLLECT product_id = selected_product.product_id
                    AGGREGATE
                      total_units = SUM(selected_product.product_units),
                      total_units_price = SUM(selected_product.product_units * selected_product.product_price_unit_amount)
                    INTO groups = {
                      product_name: selected_product.product_name,
                      product_price_unit_amount: selected_product.product_price_unit_amount,
                      product_units: selected_product.product_units
                    }
                    SORT total_units DESC
                    RETURN {
                      "product_id": product_id,
                      "product_name": LAST(groups[*].product_name),
                      "unit_price": LAST(groups[*].product_price_unit_amount),
                      "total_units": total_units,
                      "total_units_price": total_units_price
                    }
              )
              return {
                date_day,
                total: {
                  unit_amount: SUM(products_summary[*].total_units_price),
                  unit_amount_currency: "MXN", // TODO
                },
                products_summary
              }
        "#,
        hashmap_json![],
    )
    .await
}

#[derive(juniper::GraphQLInputObject, Serialize, Deserialize)]
pub struct PageVisitInputLocation {
    /// https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol
    pub protocol: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/Location/hostname
    pub hostname: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/Location/port
    pub port: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname
    pub pathname: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/Location/search
    pub search: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/Location/hash
    pub hash: Option<String>,
}

#[derive(juniper::GraphQLInputObject, Serialize, Deserialize)]
pub struct PageVisitInputScreen {
    /// https://developer.mozilla.org/en-US/docs/Web/API/Screen/height
    pub height: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
    pub width: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/type
    pub orientation_type: Option<String>,
    /// https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/angle
    pub orientation_angle: Option<String>,
}

#[derive(juniper::GraphQLInputObject, Serialize, Deserialize)]
pub struct PageVisitInput {
    pub user_agent: Option<String>,
    pub location: Option<PageVisitInputLocation>,
    pub screen: Option<PageVisitInputScreen>,
}

pub(in crate::analytics) async fn record_page_visit(
    pool: &ConnectionPool,
    page_visit: &PageVisitInput,
) -> anyhow::Result<PageVisitInput> {
    resolve_aql(
        pool,
        r#"
            INSERT {
              created: DATE_ISO8601(DATE_NOW()),
              location: @page_visit_location,
              screen: @page_visit_screen,
              user_agent: @page_visit_user_agent,
            } INTO analytics_page_visits
            RETURN NEW
        "#,
        hashmap_json![
            "page_visit_location" => page_visit.location,
            "page_visit_screen" => page_visit.screen,
            "page_visit_user_agent" => page_visit.user_agent,
        ],
    )
    .await
}
