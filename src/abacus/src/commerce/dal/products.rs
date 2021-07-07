use crate::arangodb::{resolve_aql, resolve_aql_vector, ConnectionPool};
use crate::commerce::model::products::{
    PriceSortDirection, Product, ProductMultilingualInput, ProductMultilingualInputVisibility,
};
use crate::images::Image;
use crate::locale::SupportedLocale;
use serde_json::json;

/// Takes care of creating the product inside ArangoDB.
pub(in crate::commerce) async fn create_product(
    pool: &ConnectionPool,
    product_multilingual_input: &ProductMultilingualInput,
    images: &[Image],
) -> anyhow::Result<Product> {
    // TODO: dynamic `unit_label`
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    resolve_aql(
        &pool,
        r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]

            INSERT {
              images: @product_images,
              unit_label: "product_units/piece",
              is_published: false,
              visibility: @product_visibility,
              created: DATE_ISO8601(DATE_NOW()),
              updated: DATE_ISO8601(DATE_NOW()),
              price: {
                unit_amount: @product_price_unit_amount,
                unit_amount_currency: "MXN",
              },
              translations: @translations
            } INTO products
            LET product = NEW

            LET t = FIRST(
              FOR t IN product.translations
                FILTER t.name != null AND t.locale == @eshop_locale
                RETURN t
            )

            RETURN MERGE(
              product,
              { unit_label: unit_label_translated },
              { name: t.name, description: t.description }
            )
        "#,
        hashmap_json![
            "eshop_locale" => SupportedLocale::EnUS, // TODO
            "product_images" => images,
            "product_visibility" => product_multilingual_input.visibility,
            "product_price_unit_amount" => product_multilingual_input.price.unit_amount,
            "translations" => product_multilingual_input.translations,
        ],
    )
    .await
}

/// TODO(004) - integration tests
pub(in crate::commerce) async fn update_product(
    pool: &ConnectionPool,
    product_key: &str,
    product_revision: &str,
    product_multilingual_input: &ProductMultilingualInput,
    images: &[Image],
) -> anyhow::Result<Product> {
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    resolve_aql(
        &pool,
        r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]

            UPDATE {
              _key: @product_key,
              _rev: @product_rev,
              images: @product_images,
              visibility: @product_visibility,
              updated: DATE_ISO8601(DATE_NOW()),
              price: {
                unit_amount: @product_price_unit_amount,
                unit_amount_currency: "MXN",
              },
              translations: @translations
            } IN products OPTIONS { ignoreRevs: false }
            LET product = NEW

            LET t = FIRST(
              FOR t IN product.translations
                FILTER t.name != null AND t.locale == @eshop_locale
                RETURN t
            )

            RETURN MERGE(
              product,
              { unit_label: unit_label_translated },
              { name: t.name, description: t.description }
            )
        "#,
        hashmap_json![
            "eshop_locale" => SupportedLocale::EnUS, // TODO
            "product_key" => product_key,
            "product_rev" => product_revision,
            "product_images" => images,
            "product_visibility" => product_multilingual_input.visibility,
            "product_price_unit_amount" => product_multilingual_input.price.unit_amount,
            "translations" => product_multilingual_input.translations,
        ],
    )
    .await
}

/// TODO(004) - integration tests
pub(in crate::commerce) async fn publish_product(
    pool: &ConnectionPool,
    product_key: &str,
) -> anyhow::Result<Product> {
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    resolve_aql(
        &pool,
        r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]

            UPDATE {
              _key: @product_key,
              is_published: true,
            } IN products
            LET product = NEW

            LET t = FIRST(
              FOR t IN product.translations
                FILTER t.name != null AND t.locale == @eshop_locale
                RETURN t
            )

            RETURN MERGE(
              product,
              { unit_label: unit_label_translated },
              { name: t.name, description: t.description }
            )
        "#,
        hashmap_json![
            "eshop_locale" => SupportedLocale::EnUS, // TODO
            "product_key" => product_key,
        ],
    )
    .await
}

/// TODO(004) - integration tests
pub(in crate::commerce) async fn unpublish_product(
    pool: &ConnectionPool,
    product_key: &str,
) -> anyhow::Result<Product> {
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    resolve_aql(
        &pool,
        r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]

            UPDATE {
              _key: @product_key,
              is_published: false,
            } IN products
            LET product = NEW

            LET t = FIRST(
              FOR t IN product.translations
                FILTER t.name != null AND t.locale == @eshop_locale
                RETURN t
            )

            RETURN MERGE(
              product,
              { unit_label: unit_label_translated },
              { name: t.name, description: t.description }
            )
        "#,
        hashmap_json![
            "eshop_locale" => SupportedLocale::EnUS, // TODO
            "product_key" => product_key,
        ],
    )
    .await
}

/// Returns a single product (or error).
pub(in crate::commerce) async fn get_product_by_key(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    product_key: &str,
    product_published_only: &bool,
) -> anyhow::Result<Product> {
    let product_vector = get_products_by_keys(
        &pool,
        &client_locale,
        &[product_key.to_string()],
        &product_published_only,
    )
    .await?;

    match product_vector.first() {
        Some(product) => Ok(product.to_owned()),
        None => anyhow::bail!("database didn't return any product"),
    }
}

pub(in crate::commerce) async fn get_products_by_keys(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    product_keys: &[String],
    product_published_only: &bool,
) -> anyhow::Result<Vec<Product>> {
    // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
    resolve_aql_vector(
        &pool,
        r#"
            LET products = DOCUMENT(products, @product_keys)
            FOR product IN products
              FILTER @product_published_only ? product.is_published == @product_published_only : true

              LET t = FIRST(
                FOR t IN product.translations
                  FILTER t.name != null AND t.locale == @eshop_locale
                  RETURN t
              )

              RETURN MERGE(
                product,
                { unit_label: DOCUMENT(product.unit_label)[@eshop_locale] },
                { name: t.name, description: t.description }
              )
        "#,
        hashmap_json![
            "eshop_locale" => client_locale,
            "product_keys" => product_keys,
            "product_published_only" => product_published_only,
        ]
    ).await
}

/// Performs search of products based on the specified criteria and returns products with merged
/// translations based on the eshop language.
///
/// Optionally, you can specify a search term. In this case, it performs the same search except it
/// performs additional fulltext search and additionally sorts the results by relevance.
///
/// TODO(004) - integration tests
pub(in crate::commerce) async fn search_products(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
    search_all: &bool,
    visibility: &Option<ProductMultilingualInputVisibility>,
) -> anyhow::Result<Vec<Option<Product>>> {
    let sort_direction = match price_sort_direction {
        PriceSortDirection::LowToHigh => "ASC",
        PriceSortDirection::HighToLow => "DESC",
    };

    let visibility = match visibility {
        Some(visibility) => json!(visibility),
        None => json!(null),
    };

    match search_term {
        Some(search_term) => {
            // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
            resolve_aql_vector(
                &pool,
                // This should be almost identical with the query below except it uses fulltext
                // search across all supported languages and it additionally sorts the results by
                // relevance:
                r#"
                    FOR product IN search_products
                      SEARCH BOOST(NGRAM_MATCH(product.translations.name, @search_term, 0.7, "bigram"), 1.1)
                          OR BOOST(NGRAM_MATCH(product.translations.description, @search_term, 0.7, "bigram"), 1.0)
                      FILTER @search_all == true ? true : (product.is_published IN [true])
                      FILTER @visibility == null ? true : (@visibility IN product.visibility)
                      SORT BM25(product) DESC
                      SORT product.price.unit_amount @price_sort_direction

                      LET t = FIRST(
                        FOR t IN product.translations
                          FILTER t.name != null AND t.locale == @eshop_locale
                          RETURN t
                      )

                      RETURN MERGE(
                        product,
                        { unit_label: DOCUMENT(product.unit_label)[@eshop_locale] },
                        { name: t.name, description: t.description }
                      )
                "#,
                hashmap_json![
                    "eshop_locale" => client_locale,
                    "search_term" => search_term,
                    "search_all" => search_all,
                    "price_sort_direction" => sort_direction,
                    "visibility" => visibility,
                ]
            ).await
        }
        None => {
            // TODO: https://www.arangodb.com/docs/stable/aql/extending.html (for merging translations)
            resolve_aql_vector(
                &pool,
                r#"
                    FOR product IN search_products
                      FILTER @search_all == true ? true : (product.is_published IN [true])
                      FILTER @visibility == null ? true : (@visibility IN product.visibility)
                      SORT product.price.unit_amount @price_sort_direction

                      LET t = FIRST(
                        FOR t IN product.translations
                          FILTER t.name != null AND t.locale == @eshop_locale
                          RETURN t
                      )

                      RETURN MERGE(
                        product,
                        { unit_label: DOCUMENT(product.unit_label)[@eshop_locale] },
                        { name: t.name, description: t.description }
                      )
                "#,
                hashmap_json![
                    "eshop_locale" => client_locale,
                    "search_all" => search_all,
                    "price_sort_direction" => sort_direction,
                    "visibility" => visibility,
                ],
            )
            .await
        }
    }
}

/// Important note: product should be moved into the archive before deleting it!
pub(in crate::commerce) async fn delete_product(
    pool: &ConnectionPool,
    product_key: &str,
) -> anyhow::Result<Product> {
    resolve_aql(
        &pool,
        r#"
            LET unit_label_translated = DOCUMENT("product_units/piece")[@eshop_locale]
            LET product = DOCUMENT(products, @product_key)
            REMOVE product IN products

            LET t = FIRST(
              FOR t IN product.translations
                FILTER t.name != null AND t.locale == @eshop_locale
                RETURN t
            )

            RETURN MERGE(
              product,
              { unit_label: unit_label_translated },
              { name: t.name, description: t.description }
            )
        "#,
        hashmap_json![
            "eshop_locale" => SupportedLocale::EnUS, // TODO
            "product_key" => product_key,
        ],
    )
    .await
}
