use crate::arangodb::ConnectionPool;
use crate::commerce::model::errors::ModelError;
use crate::commerce::model::products::{
    PriceSortDirection, Product, ProductMultilingualInput, SupportedLocale,
};
use serde_json::json;

/// Takes care of creating the product inside ArangoDB.
pub(in crate::commerce) async fn create_product(
    pool: &ConnectionPool,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Product, ModelError> {
    let db = pool.db().await;

    // TODO: categories
    // TODO: dynamic `unit_label`
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)

    let insert_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]

            INSERT {
              images: @product_images,
              unit_label: "product_units/piece",
              active: false,
              created: DATE_ISO8601(DATE_NOW()),
              updated: DATE_ISO8601(DATE_NOW()),
              price: {
                unit_amount: @product_price_unit_amount,
                unit_amount_currency: "MXN",
              },
              translations: MERGE(
                FOR t IN @translations
                  RETURN {
                    [t.lang]: {
                      name: t.name,
                      description: t.description
                    }
                  }
              )
            } INTO products
            LET product = NEW

            LET translations = product.translations[@eshop_locale].name != null
              ? product.translations[@eshop_locale]
              : FIRST(
                  FOR fallback_locale IN ATTRIBUTES(product.translations)
                  FILTER product.translations[fallback_locale].name != null
                  RETURN product.translations[fallback_locale]
                )

            LET product_with_unit_label = MERGE(product, { unit_label: unit_label_translated } )
            RETURN UNSET(MERGE_RECURSIVE(product_with_unit_label, translations), "translations")
            "#,
        )
        .bind_var("eshop_locale", String::from("en_US")) // TODO
        .bind_var("product_images", product_multilingual_input.images.clone())
        .bind_var(
            "product_price_unit_amount",
            product_multilingual_input.price.unit_amount,
        )
        .bind_var(
            "translations",
            product_multilingual_input
                .translations
                .iter()
                .map(|translation| {
                    json!({
                        "lang": translation.locale,
                        "name": match &translation.name {
                            Some(name) => json!(name),
                            None => json!(null),
                        },
                        "description": match &translation.description {
                            Some(description) => json!(description),
                            None => json!(null),
                        },
                    })
                })
                .collect::<Vec<_>>(),
        );

    let product_vector = db.aql_query::<Product>(insert_aql.build()).await;
    match product_vector {
        Ok(product_vector) => match product_vector.first() {
            Some(product) => Ok(product.to_owned()),
            None => Err(ModelError::LogicalError(String::from(
                "Cannot fetch the product.",
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

/// Returns a single product (or error). It tries to return the translations according to the shop
/// locale, however, it fallbacks to the first available translation if it cannot find the correct
/// translation (based on the product name).
pub(in crate::commerce) async fn get_product(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    product_id: &str,
    product_active: &bool,
) -> Result<Product, ModelError> {
    let db = pool.db().await;
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET product = DOCUMENT(@product_id)
            FILTER product.active == @product_active

            LET translations = product.translations[@eshop_locale].name != null
              ? product.translations[@eshop_locale]
              : FIRST(
                  FOR fallback_locale IN ATTRIBUTES(product.translations)
                  FILTER product.translations[fallback_locale].name != null
                  RETURN product.translations[fallback_locale]
                )

            LET product_with_unit_label = MERGE(product, { unit_label: DOCUMENT(product.unit_label)[@eshop_locale] } )
            RETURN UNSET(MERGE_RECURSIVE(product_with_unit_label, translations), "translations")
            "#,
        ).bind_var("eshop_locale", format!("{}", client_locale))
        .bind_var("product_id", product_id)
        .bind_var("product_active", json!(product_active));

    let product_vector = db.aql_query::<Product>(aql.build()).await;
    match product_vector {
        Ok(product_vector) => match product_vector.first() {
            Some(product) => Ok(product.to_owned()),
            None => Err(ModelError::LogicalError(format!(
                "Cannot fetch the product with id: {}",
                product_id
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

/// Performs search of products based on the specified criteria and returns products with merged
/// translations based on the eshop language. It tries to find the right translation, but if it
/// cannot, it returns the first available translation. The thinking is that we should always have
/// the correct translations available otherwise the product should not be activated.
///
/// Optionally, you can specify a search term. In this case, it performs the same search except it
/// performs additional fulltext search and additionally sorts the results by relevance. Please
/// note that we are trying to search across all available translations but still returning the
/// translated object (it might find a match in EN description but return translated description
/// in Spanish anyway - depending on the eshop language).
///
/// TODO(004) - integration tests
pub(in crate::commerce) async fn search_products(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
    search_all: &bool,
) -> Result<Vec<Option<Product>>, ModelError> {
    let db = pool.db().await;
    let sort_direction = match price_sort_direction {
        PriceSortDirection::LowToHigh => "ASC",
        PriceSortDirection::HighToLow => "DESC",
    };

    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    let search_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR product IN search_products
              LIMIT 0, 24
              FILTER @search_all == true ?  (product.active IN [true, false]) : (product.active IN [true])
              SORT product.price.unit_amount @price_sort_direction

              LET translations = product.translations[@eshop_locale].name != null
                ? product.translations[@eshop_locale]
                : FIRST(
                    FOR fallback_locale IN ATTRIBUTES(product.translations)
                    FILTER product.translations[fallback_locale].name != null
                    RETURN product.translations[fallback_locale]
                  )

              LET product_with_unit_label = MERGE(product, { unit_label: DOCUMENT(product.unit_label)[@eshop_locale] } )
              RETURN UNSET(MERGE_RECURSIVE(product_with_unit_label, translations), "translations")
            "#,
        );

    // This should be almost identical with the previous one except it uses fulltext search across
    // all supported languages and it additionally sorts the results by relevance.
    let search_fulltext_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR supported_lang IN ["es_MX", "en_US"]
            FOR product IN search_products
              SEARCH BOOST(NGRAM_MATCH(product.translations[supported_lang].name, @search_term, 0.7, "bigram"), 1.1)
                  OR BOOST(NGRAM_MATCH(product.translations[supported_lang].description, @search_term, 0.7, "bigram"), 1.0)
              LIMIT 0, 24
              FILTER @search_all == true ?  (product.active IN [true, false]) : (product.active IN [true])
              SORT BM25(product) DESC
              SORT product.price.unit_amount @price_sort_direction

              LET translations = product.translations[@eshop_locale].name != null
                ? product.translations[@eshop_locale]
                : FIRST(
                    FOR fallback_locale IN ATTRIBUTES(product.translations)
                    FILTER product.translations[fallback_locale].name != null
                    RETURN product.translations[fallback_locale]
                  )

              LET product_with_unit_label = MERGE(product, { unit_label: DOCUMENT(product.unit_label)[@eshop_locale] } )
              RETURN UNSET(MERGE_RECURSIVE(product_with_unit_label, translations), "translations")
            "#,
        );

    let aql = match search_term {
        Some(search_term) => search_fulltext_aql
            .bind_var("search_term", search_term.clone())
            .bind_var("search_all", *search_all)
            .bind_var("eshop_locale", format!("{}", client_locale))
            .bind_var("price_sort_direction", sort_direction),
        None => search_aql
            .bind_var("search_all", *search_all)
            .bind_var("eshop_locale", format!("{}", client_locale))
            .bind_var("price_sort_direction", sort_direction),
    };

    let product_vector = db.aql_query::<Option<Product>>(aql.build()).await;
    match product_vector {
        Ok(product_vector) => Ok(product_vector),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

pub(in crate::commerce) async fn delete_product(
    pool: &ConnectionPool,
    product_id: &str,
) -> Result<Product, ModelError> {
    let db = pool.db().await;

    let remove_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]

            LET product = DOCUMENT(@product_id)
            REMOVE product IN products

            LET translations = product.translations[@eshop_locale].name != null
              ? product.translations[@eshop_locale]
              : FIRST(
                  FOR fallback_locale IN ATTRIBUTES(product.translations)
                  FILTER product.translations[fallback_locale].name != null
                  RETURN product.translations[fallback_locale]
                )

            LET product_with_unit_label = MERGE(product, { unit_label: unit_label_translated } )
            RETURN UNSET(MERGE_RECURSIVE(product_with_unit_label, translations), "translations")
            "#,
        )
        .bind_var("eshop_locale", String::from("en_US")) // TODO
        .bind_var("product_id", product_id)
        .build();

    let old_product_vector = db.aql_query::<Product>(remove_aql).await;
    match old_product_vector {
        Ok(old_product_vector) => match old_product_vector.first() {
            Some(product) => Ok(product.to_owned()),
            None => Err(ModelError::LogicalError(String::from(
                "Cannot fetch deleted product.",
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};
    use crate::commerce::model::products::{
        ProductMultilingualInputTranslations, ProductPriceInput,
    };

    #[ignore]
    #[tokio::test]
    async fn create_product_english_to_english_test() {
        let db_name = "create_product_english_to_english_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create a product with english name and description
        let created_product = create_product(
            &pool,
            &ProductMultilingualInput {
                images: vec![],
                price: ProductPriceInput { unit_amount: -1 },
                translations: vec![ProductMultilingualInputTranslations {
                    locale: SupportedLocale::EnUS,
                    name: Some("Product name in english".to_string()),
                    description: Some("Product description in english".to_string()),
                }],
            },
        )
        .await
        .unwrap();

        // 2) try to find the newly created product
        let found_product = get_product(
            &pool,
            &SupportedLocale::EnUS,
            &created_product.id(),
            &false, // the product should be inactive at this point (until manually activated)
        )
        .await
        .unwrap();
        assert_eq!(
            found_product.name(),
            Some("Product name in english".to_string())
        );

        cleanup_test_database(&db_name).await;
    }

    #[ignore]
    #[tokio::test]
    async fn create_product_spanish_to_english_test() {
        let db_name = "create_product_spanish_to_english_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create a product with spanish name and description
        let created_product = create_product(
            &pool,
            &ProductMultilingualInput {
                images: vec![],
                price: ProductPriceInput { unit_amount: -1 },
                translations: vec![ProductMultilingualInputTranslations {
                    locale: SupportedLocale::EsMX,
                    name: Some("Product name in SPANISH".to_string()),
                    description: Some("Product description in SPANISH".to_string()),
                }],
            },
        )
        .await
        .unwrap();

        // 2) try to find the newly created product - please note that we are trying to fetch the
        //    english version even though it's not available and the result should fallback to the
        //    first available language which is spanish in this case
        let found_product = get_product(
            &pool,
            &SupportedLocale::EnUS,
            &created_product.id(),
            &false, // the product should be inactive at this point (until manually activated)
        )
        .await
        .unwrap();
        assert_eq!(
            found_product.name(),
            Some("Product name in SPANISH".to_string())
        );

        cleanup_test_database(&db_name).await;
    }

    #[ignore]
    #[tokio::test]
    async fn create_product_all_languages_test() {
        let db_name = "create_product_all_languages_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create a product with english AND spanish name and description
        let created_product = create_product(
            &pool,
            &ProductMultilingualInput {
                images: vec![],
                price: ProductPriceInput { unit_amount: -1 },
                translations: vec![
                    ProductMultilingualInputTranslations {
                        locale: SupportedLocale::EnUS,
                        name: Some("Product name in english".to_string()),
                        description: Some("Product description in english".to_string()),
                    },
                    ProductMultilingualInputTranslations {
                        locale: SupportedLocale::EsMX,
                        name: Some("Product name in SPANISH".to_string()),
                        description: Some("Product description in SPANISH".to_string()),
                    },
                ],
            },
        )
        .await
        .unwrap();

        // 2) try to find the newly created product in both client locales
        let found_en_product = get_product(
            &pool,
            &SupportedLocale::EnUS,
            &created_product.id(),
            &false, // the product should be inactive at this point (until manually activated)
        )
        .await
        .unwrap();
        assert_eq!(
            found_en_product.name(),
            Some("Product name in english".to_string())
        );

        let found_es_product = get_product(
            &pool,
            &SupportedLocale::EsMX,
            &created_product.id(),
            &false, // the product should be inactive at this point (until manually activated)
        )
        .await
        .unwrap();
        assert_eq!(
            found_es_product.name(),
            Some("Product name in SPANISH".to_string())
        );

        cleanup_test_database(&db_name).await;
    }

    #[ignore]
    #[tokio::test]
    async fn create_product_mixed_languages_test() {
        let db_name = "create_product_mixed_languages_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create a product with english name AND spanish description (notice how it's mixed)
        let created_product = create_product(
            &pool,
            &ProductMultilingualInput {
                images: vec![],
                price: ProductPriceInput { unit_amount: -1 },
                translations: vec![
                    ProductMultilingualInputTranslations {
                        locale: SupportedLocale::EnUS,
                        name: Some("Product name in english".to_string()),
                        description: None,
                    },
                    ProductMultilingualInputTranslations {
                        locale: SupportedLocale::EsMX,
                        name: None,
                        description: Some("Product description in SPANISH".to_string()),
                    },
                ],
            },
        )
        .await
        .unwrap();

        // 2) try to find the newly created product in both client locales
        let found_en_product = get_product(
            &pool,
            &SupportedLocale::EnUS,
            &created_product.id(),
            &false, // the product should be inactive at this point (until manually activated)
        )
        .await
        .unwrap();
        assert_eq!(
            found_en_product.name(),
            Some("Product name in english".to_string())
        );
        assert_eq!(found_en_product.description(), None);

        let found_es_product = get_product(
            &pool,
            &SupportedLocale::EsMX,
            &created_product.id(),
            &false, // the product should be inactive at this point (until manually activated)
        )
        .await
        .unwrap();
        assert_eq!(
            found_es_product.name(),
            Some("Product name in english".to_string()) // we fall back to EN because ES name is missing
        );
        assert_eq!(found_es_product.description(), None);

        cleanup_test_database(&db_name).await;
    }

    #[ignore]
    #[tokio::test]
    async fn delete_product_test() {
        let db_name = "delete_product_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create a product to be later deleted
        let created_product = create_product(
            &pool,
            &ProductMultilingualInput {
                images: vec![],
                price: ProductPriceInput { unit_amount: -1 },
                translations: vec![ProductMultilingualInputTranslations {
                    locale: SupportedLocale::EnUS,
                    name: Some("Product name in english".to_string()),
                    description: Some("Product description in english".to_string()),
                }],
            },
        )
        .await
        .unwrap();

        // 2) try to delete the newly created product
        let deleted_product = delete_product(&pool, &created_product.id()).await.unwrap();
        assert_eq!(
            deleted_product.name(),
            Some("Product name in english".to_string())
        );

        cleanup_test_database(&db_name).await;
    }
}
