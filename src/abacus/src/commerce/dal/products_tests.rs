use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};
use crate::commerce::api::PriceSortDirection;
use crate::commerce::dal::products::{
    create_product, delete_product, get_product_by_key, search_products,
};
use crate::commerce::model::products::{
    ProductMultilingualInput, ProductMultilingualInputTranslations,
};
use crate::locale::SupportedLocale;

#[ignore]
#[tokio::test]
async fn create_product_english_to_english_test() {
    let db_name = "create_product_english_to_english_test";
    let pool = prepare_empty_test_database(&db_name).await;

    // 1) create a product with english name and description
    let created_product = create_product(
        &pool,
        &SupportedLocale::EnUS,
        &ProductMultilingualInput {
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EnUS,
                name: "Product name in english".to_string(),
                description: None,
            }],
            ..Default::default()
        },
        &[],
    )
    .await
    .unwrap();

    // 2) try to find the newly created product
    let found_product = get_product_by_key(
        &pool,
        &SupportedLocale::EnUS,
        &created_product.key(),
        &false, // the product should be unpublished at this point (until manually activated)
    )
    .await
    .unwrap();
    assert_eq!(found_product.name(), "Product name in english".to_string());

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
        &SupportedLocale::EnUS,
        &ProductMultilingualInput {
            translations: vec![
                ProductMultilingualInputTranslations {
                    locale: SupportedLocale::EnUS,
                    name: "Product name in english".to_string(),
                    description: None,
                },
                ProductMultilingualInputTranslations {
                    locale: SupportedLocale::EsMX,
                    name: "Product name in SPANISH".to_string(),
                    description: None,
                },
            ],
            ..Default::default()
        },
        &[],
    )
    .await
    .unwrap();

    // 2) try to find the newly created product in both client locales
    let found_en_product = get_product_by_key(
        &pool,
        &SupportedLocale::EnUS,
        &created_product.key(),
        &false, // the product should be unpublished at this point (until manually activated)
    )
    .await
    .unwrap();
    assert_eq!(
        found_en_product.name(),
        "Product name in english".to_string()
    );

    let found_es_product = get_product_by_key(
        &pool,
        &SupportedLocale::EsMX,
        &created_product.key(),
        &false, // the product should be unpublished at this point (until manually activated)
    )
    .await
    .unwrap();
    assert_eq!(
        found_es_product.name(),
        "Product name in SPANISH".to_string()
    );

    cleanup_test_database(&db_name).await;
}

#[ignore]
#[tokio::test]
async fn search_products_test() {
    let db_name = "search_products_test";
    let pool = prepare_empty_test_database(&db_name).await;

    // 1) create a product to be later searched
    create_product(
        &pool,
        &SupportedLocale::EnUS,
        &ProductMultilingualInput {
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EnUS,
                name: "Product name in english".to_string(),
                description: None,
            }],
            ..Default::default()
        },
        &[],
    )
    .await
    .unwrap();

    // TODO: This is super ugly (potentially flaky) but we need to wait for the search view
    //       to be ready. How to do it better?
    let five_seconds = std::time::Duration::from_secs(5);
    std::thread::sleep(five_seconds);

    // 2) try to search all products
    let searched_products = search_products(
        &pool,
        &SupportedLocale::EnUS,
        &PriceSortDirection::LowToHigh,
        &true, // search all (even the unpublished ones)
        &None, // visibility (everywhere)
    )
    .await
    .unwrap();

    insta::assert_debug_snapshot!(searched_products);

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
        &SupportedLocale::EnUS,
        &ProductMultilingualInput {
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EnUS,
                name: "Product name in english".to_string(),
                description: None,
            }],
            ..Default::default()
        },
        &[],
    )
    .await
    .unwrap();

    // 2) try to delete the newly created product
    let deleted_product = delete_product(&pool, &created_product.key()).await.unwrap();
    assert_eq!(
        deleted_product.name(),
        "Product name in english".to_string()
    );

    cleanup_test_database(&db_name).await;
}
