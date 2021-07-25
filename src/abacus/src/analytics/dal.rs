use crate::arango::{resolve_aql_vector, ConnectionPool};
use serde::Deserialize;

#[derive(Deserialize, Clone, juniper::GraphQLObject, Debug)]
pub(in crate::analytics) struct AnalyticsSoldProductInfo {
    product_id: String,
    product_name: String,
    product_units: i32,
}

pub enum SortDirection {
    MostToLeast,
    LeastToMost,
}

pub(in crate::analytics) async fn get_sold_product_stats(
    pool: &ConnectionPool,
    sort_direction: &SortDirection,
) -> anyhow::Result<Vec<AnalyticsSoldProductInfo>> {
    let sort_direction = match sort_direction {
        SortDirection::MostToLeast => "DESC",
        SortDirection::LeastToMost => "ASC",
    };

    resolve_aql_vector(
        &pool,
        r#"
            FOR checkout IN pos_checkouts
              FOR selected_product IN checkout.selected_products
                COLLECT product_id = selected_product.product_id,
                        product_name = selected_product.product_name
                AGGREGATE product_units = SUM(selected_product.product_units)
                SORT product_units @sort_direction
                RETURN {
                  "product_id": product_id,
                  "product_name": product_name,
                  "product_units": product_units
                }
        "#,
        hashmap_json![
            "sort_direction" => sort_direction,
        ],
    )
    .await
}
