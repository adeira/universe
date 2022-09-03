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
pub(in crate::analytics) struct AnalyticsSoldProductTimeFrameInfo {
    time_frame: i32, // 1, 2, 3, … depending on the selected time frame (can represent weeks, months, quarters, …)
    date_year: i32,  // 2021, 2022, …
    stats: Vec<AnalyticsSoldProductInfo>,
}

pub enum SortDirection {
    MostToLeast,
    LeastToMost,
}

#[derive(juniper::GraphQLEnum)]
pub enum TimeFrame {
    Year,
    Quarter,
    Month,
    IsoWeek,
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

/// Returns most or least sold products (all time) grouped by the given time frame.
pub(in crate::analytics) async fn get_sold_product_stats(
    pool: &ConnectionPool,
    sort_direction: &SortDirection,
    time_frame: &TimeFrame,
) -> anyhow::Result<Vec<AnalyticsSoldProductTimeFrameInfo>> {
    let sort_direction = match sort_direction {
        SortDirection::MostToLeast => "DESC",
        SortDirection::LeastToMost => "ASC",
    };

    // See:
    // https://www.arangodb.com/docs/stable/aql/functions-date.html#date_year
    // https://www.arangodb.com/docs/stable/aql/functions-date.html#date_quarter
    // https://www.arangodb.com/docs/stable/aql/functions-date.html#date_month
    // https://www.arangodb.com/docs/stable/aql/functions-date.html#date_isoweek
    let time_frame_fn = match time_frame {
        TimeFrame::Year => "DATE_YEAR",
        TimeFrame::Quarter => "DATE_QUARTER",
        TimeFrame::Month => "DATE_MONTH",
        TimeFrame::IsoWeek => "DATE_ISOWEEK",
    };

    resolve_aql_vector(
        pool,
        include_str!("aql/get_sold_product_stats.aql"),
        hashmap_json![
            "limit" => 40, // TODO: we can eventually expose this via GraphQL
            "sort_direction" => sort_direction,
            "time_frame_fn" => time_frame_fn,
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
        include_str!("aql/get_daily_reports.aql"),
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
