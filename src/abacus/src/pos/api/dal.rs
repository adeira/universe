use crate::arangodb::{resolve_aql, ConnectionPool};
use crate::price::SupportedCurrency;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct PosCheckout {
    _id: String,
}

impl PosCheckout {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }
}

#[derive(Serialize, Deserialize)]
pub(in crate::pos) struct PosCheckoutProductInput {
    // Original product ID just in case it's needed one day (even though it might be already
    // deleted). Already deleted product should not be a big deal since we copy here all the
    // necessary product info at the time of the checkout (so current edited product might be
    // completely different and that's OK).
    pub(crate) product_id: String,
    pub(crate) product_name: String,
    pub(crate) product_units: i32,
    pub(crate) product_price_unit_amount: i32,
    pub(crate) product_price_unit_amount_currency: SupportedCurrency,
}

#[derive(Serialize, Deserialize)]
pub(in crate::pos) struct PosCheckoutInput {
    pub(crate) selected_products: Vec<PosCheckoutProductInput>,
}

/// Saves checkout information into database so we know what sales are happening via POS and we can
/// make further decisions based on that. Specifically, we record the following information:
///
/// - date and time of the POS sale
/// - products sold (not only IDs but the whole expanded products so future changes of these
///   products don't affect this POS history)
/// - price for each product at the time of the sale (again, preserving historic state)
pub(in crate::pos) async fn create_checkout(
    pool: &ConnectionPool,
    input: &PosCheckoutInput,
) -> anyhow::Result<PosCheckout> {
    resolve_aql(
        &pool,
        r#"
            INSERT {
              created_date: DATE_ISO8601(DATE_NOW()),
              selected_products: @selected_products
            } INTO pos_checkouts
            RETURN NEW
        "#,
        hashmap_json![
            "selected_products" => input.selected_products,
        ],
    )
    .await
}

#[derive(Deserialize, Clone, juniper::GraphQLObject)]
pub(in crate::pos) struct PosCheckoutTotalStats {
    total_checkouts: i32,
    total_sold_units: i32,
    total_sold_unit_amount: i32, // TODO: be careful when calling SUM(…) on different currencies!
}

pub(in crate::pos) async fn get_total_checkout_stats(
    pool: &ConnectionPool,
) -> anyhow::Result<PosCheckoutTotalStats> {
    resolve_aql(
        &pool,
        r#"
            LET stats_per_checkout = (
              FOR checkout IN pos_checkouts
                LET products = checkout.selected_products
                RETURN {
                  total_checkouts: COUNT(1),
                  total_sold_units: SUM(products[*].product_units),
                  total_sold_unit_amount: SUM(FOR p IN products RETURN (p.product_units * p.product_price_unit_amount)),
                }
            )

            RETURN {
              total_checkouts: SUM(stats_per_checkout[*].total_checkouts),
              total_sold_units: SUM(stats_per_checkout[*].total_sold_units),
              total_sold_unit_amount: SUM(stats_per_checkout[*].total_sold_unit_amount),
            }
        "#,
        hashmap_json![],
    )
    .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};

    #[ignore]
    #[tokio::test]
    async fn create_checkout_test() {
        let db_name = "create_checkout_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create first checkout
        create_checkout(
            &pool,
            &PosCheckoutInput {
                selected_products: vec![
                    PosCheckoutProductInput {
                        product_id: String::from("products/1"),
                        product_name: String::from("Product name 1"),
                        product_units: 1,
                        product_price_unit_amount: 120,
                        product_price_unit_amount_currency: SupportedCurrency::MXN,
                    },
                    PosCheckoutProductInput {
                        product_id: String::from("products/2"),
                        product_name: String::from("Product name 2"),
                        product_units: 2,
                        product_price_unit_amount: 150,
                        product_price_unit_amount_currency: SupportedCurrency::MXN,
                    },
                ],
            },
        )
        .await
        .unwrap();

        // 2) create second checkout
        create_checkout(
            &pool,
            &PosCheckoutInput {
                selected_products: vec![PosCheckoutProductInput {
                    product_id: String::from("products/3"),
                    product_name: String::from("Product name 3"),
                    product_units: 5,
                    product_price_unit_amount: 200,
                    product_price_unit_amount_currency: SupportedCurrency::MXN,
                }],
            },
        )
        .await
        .unwrap();

        // 3) return the checkout stats
        let checkout_stats = get_total_checkout_stats(&pool).await.unwrap();
        assert_eq!(checkout_stats.total_checkouts, 2); // first and second
        assert_eq!(checkout_stats.total_sold_units, 8); // 1 + 2 + 5
        assert_eq!(checkout_stats.total_sold_unit_amount, 1420); // (120 + 2*150 + 5*200)

        cleanup_test_database(&db_name).await;
    }
}
