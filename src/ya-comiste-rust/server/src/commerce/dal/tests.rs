use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};
use crate::commerce::dal::products::{create_product, delete_product, get_product_by_key};
use crate::commerce::model::products::{
    ProductMultilingualInput, ProductMultilingualInputTranslations, SupportedLocale,
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
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EnUS,
                name: Some("Product name in english".to_string()),
                description: Some("Product description in english".to_string()),
            }],
            ..Default::default()
        },
        &vec![],
    )
    .await
    .unwrap();

    // 2) try to find the newly created product
    let found_product = get_product_by_key(
        &pool,
        &SupportedLocale::EnUS,
        &created_product.key(),
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
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EsMX,
                name: Some("Product name in SPANISH".to_string()),
                description: Some("Product description in SPANISH".to_string()),
            }],
            ..Default::default()
        },
        &vec![],
    )
    .await
    .unwrap();

    // 2) try to find the newly created product - please note that we are trying to fetch the
    //    english version even though it's not available and the result should fallback to the
    //    first available language which is spanish in this case
    let found_product = get_product_by_key(
        &pool,
        &SupportedLocale::EnUS,
        &created_product.key(),
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
            ..Default::default()
        },
        &vec![],
    )
    .await
    .unwrap();

    // 2) try to find the newly created product in both client locales
    let found_en_product = get_product_by_key(
        &pool,
        &SupportedLocale::EnUS,
        &created_product.key(),
        &false, // the product should be inactive at this point (until manually activated)
    )
    .await
    .unwrap();
    assert_eq!(
        found_en_product.name(),
        Some("Product name in english".to_string())
    );

    let found_es_product = get_product_by_key(
        &pool,
        &SupportedLocale::EsMX,
        &created_product.key(),
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
            ..Default::default()
        },
        &vec![],
    )
    .await
    .unwrap();

    // 2) try to find the newly created product in both client locales
    let found_en_product = get_product_by_key(
        &pool,
        &SupportedLocale::EnUS,
        &created_product.key(),
        &false, // the product should be inactive at this point (until manually activated)
    )
    .await
    .unwrap();
    assert_eq!(
        found_en_product.name(),
        Some("Product name in english".to_string())
    );
    assert_eq!(found_en_product.description(), None);

    let found_es_product = get_product_by_key(
        &pool,
        &SupportedLocale::EsMX,
        &created_product.key(),
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
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EnUS,
                name: Some("Product name in english".to_string()),
                description: Some("Product description in english".to_string()),
            }],
            ..Default::default()
        },
        &vec![],
    )
    .await
    .unwrap();

    // 2) try to delete the newly created product
    let deleted_product = delete_product(&pool, &created_product.key()).await.unwrap();
    assert_eq!(
        deleted_product.name(),
        Some("Product name in english".to_string())
    );

    cleanup_test_database(&db_name).await;
}
