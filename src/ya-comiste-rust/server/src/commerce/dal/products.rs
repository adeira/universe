use crate::arangodb::ConnectionPool;
use crate::commerce::model::errors::ModelError;
use crate::commerce::model::products::{
    PriceSortDirection, Product, ProductMultilingualInput, ProductMultilingualInputVisibility,
    SupportedLocale,
};
use crate::images::Image;
use serde_json::json;

/// Takes care of creating the product inside ArangoDB.
pub(in crate::commerce) async fn create_product(
    pool: &ConnectionPool,
    product_multilingual_input: &ProductMultilingualInput,
    images: &Vec<Image>,
) -> Result<Product, ModelError> {
    let db = pool.db().await;

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
              visibility: @product_visibility,
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
        .bind_var("product_images", json!(images))
        .bind_var(
            "product_visibility",
            json!(product_multilingual_input.visibility),
        )
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
    visibility: &Option<ProductMultilingualInputVisibility>,
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
              FILTER @search_all == true ? true : (product.active IN [true])
              FILTER @visibility == null ? true : (@visibility IN product.visibility)
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

    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
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
              FILTER @search_all == true ? true : (product.active IN [true])
              FILTER @visibility == null ? true : (@visibility IN product.visibility)
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
            .bind_var(
                "visibility",
                match visibility {
                    Some(visibility) => json!(visibility),
                    None => json!(null),
                },
            )
            .bind_var("eshop_locale", format!("{}", client_locale))
            .bind_var("price_sort_direction", sort_direction),
        None => search_aql
            .bind_var("search_all", *search_all)
            .bind_var(
                "visibility",
                match visibility {
                    Some(visibility) => json!(visibility),
                    None => json!(null),
                },
            )
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
