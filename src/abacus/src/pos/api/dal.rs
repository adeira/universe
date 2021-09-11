#[cfg(test)]
use crate::arango::resolve_aql_vector;
use crate::arango::{resolve_aql, ConnectionPool};
use crate::price::SupportedCurrency;
use serde::{Deserialize, Serialize};
use std::fmt::{Debug, Formatter};

#[derive(Serialize, Deserialize, Clone)]
pub struct PosCheckout {
    _id: String,
    created_date: String,
    selected_products: Vec<PosCheckoutProductInput>,
}

impl Debug for PosCheckout {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("PosCheckout")
            .field("selected_products", &self.selected_products)
            .finish_non_exhaustive()
    }
}

impl PosCheckout {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub(in crate::pos) struct PosCheckoutProductAddonInput {
    pub(crate) product_addon_id: String,
    pub(crate) product_addon_extra_price_unit_amount: i32,
    pub(crate) product_addon_extra_price_unit_amount_currency: SupportedCurrency,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
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
    pub(crate) product_addons: Option<Vec<PosCheckoutProductAddonInput>>,
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
        pool,
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

#[cfg(test)]
pub(in crate::pos) async fn get_all_checkouts(
    pool: &ConnectionPool,
) -> anyhow::Result<Vec<PosCheckout>> {
    resolve_aql_vector(
        &pool,
        r#"
            FOR checkout IN pos_checkouts
            RETURN checkout
        "#,
        hashmap_json![],
    )
    .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arango::{cleanup_test_database, prepare_empty_test_database};

    #[ignore]
    #[tokio::test]
    async fn create_checkout_test() {
        let db_name = "create_checkout_test";
        let pool = prepare_empty_test_database(db_name).await;

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
                        product_addons: None,
                    },
                    PosCheckoutProductInput {
                        product_id: String::from("products/2"),
                        product_name: String::from("Product name 2"),
                        product_units: 2,
                        product_price_unit_amount: 150,
                        product_price_unit_amount_currency: SupportedCurrency::MXN,
                        product_addons: None,
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
                    product_addons: None,
                }],
            },
        )
        .await
        .unwrap();

        // 3) return the checkout stats
        let all_checkouts = get_all_checkouts(&pool).await.unwrap();
        insta::assert_ron_snapshot!(all_checkouts, {
            "[]._id" => "[REDACTED]",
            "[].created_date" => "[REDACTED]",
        });

        cleanup_test_database(db_name).await;
    }

    #[ignore]
    #[tokio::test]
    async fn create_checkout_with_addons_test() {
        let db_name = "create_checkout_with_addons_test";
        let pool = prepare_empty_test_database(db_name).await;

        // 1) create first checkout
        create_checkout(
            &pool,
            &PosCheckoutInput {
                selected_products: vec![
                    PosCheckoutProductInput {
                        product_id: String::from("products/1"),
                        product_name: String::from("Product name 1"),
                        product_units: 1,
                        product_price_unit_amount: 100,
                        product_price_unit_amount_currency: SupportedCurrency::MXN,
                        product_addons: None,
                    },
                    PosCheckoutProductInput {
                        product_id: String::from("products/1"),
                        product_name: String::from("Product name 1 - with addons"),
                        product_units: 1,
                        product_price_unit_amount: 100,
                        product_price_unit_amount_currency: SupportedCurrency::MXN,
                        product_addons: Some(vec![
                            PosCheckoutProductAddonInput {
                                product_addon_id: String::from("product_addons/1"),
                                product_addon_extra_price_unit_amount: 10,
                                product_addon_extra_price_unit_amount_currency:
                                    SupportedCurrency::MXN,
                            },
                            PosCheckoutProductAddonInput {
                                product_addon_id: String::from("product_addons/2"),
                                product_addon_extra_price_unit_amount: 20,
                                product_addon_extra_price_unit_amount_currency:
                                    SupportedCurrency::MXN,
                            },
                        ]),
                    },
                ],
            },
        )
        .await
        .unwrap();

        // 2) return the checkout stats
        let all_checkouts = get_all_checkouts(&pool).await.unwrap();
        insta::assert_ron_snapshot!(all_checkouts, {
            "[]._id" => "[REDACTED]",
            "[].created_date" => "[REDACTED]",
        });

        cleanup_test_database(db_name).await;
    }
}
