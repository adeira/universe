use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};
use crate::commerce::dal::product_categories::{
    get_product_categories_by_ids, search_all_product_categories,
};
use crate::locale::SupportedLocale;

// (cd src/abacus && cargo t -- --ignored commerce::dal::product_categories_tests)

#[ignore]
#[tokio::test]
async fn search_all_product_categories_test() {
    let db_name = "search_all_product_categories_test";
    let pool = prepare_empty_test_database(&db_name).await;

    // 1) try to find all product categories in ENGLISH
    let found_categories_en = search_all_product_categories(&pool, &SupportedLocale::EnUS)
        .await
        .unwrap();

    assert_eq!(found_categories_en.len(), 2);
    insta::assert_debug_snapshot!(found_categories_en);

    // 2) try to find all product categories in SPANISH
    let found_categories_en = search_all_product_categories(&pool, &SupportedLocale::EsMX)
        .await
        .unwrap();

    assert_eq!(found_categories_en.len(), 2);
    insta::assert_debug_snapshot!(found_categories_en);

    cleanup_test_database(&db_name).await;
}

#[ignore]
#[tokio::test]
async fn get_product_categories_by_ids_test() {
    let db_name = "get_product_categories_by_ids_test";
    let pool = prepare_empty_test_database(&db_name).await;

    // 1) try to find product categories in ENGLISH by IDs
    let found_categories_en = get_product_categories_by_ids(
        &pool,
        &SupportedLocale::EnUS,
        &[
            "product_categories/coffee".to_string(), // added by DB migration
            "product_categories/tea".to_string(),    // added by DB migration
        ],
    )
    .await
    .unwrap();

    assert_eq!(found_categories_en.len(), 2);
    insta::assert_debug_snapshot!(found_categories_en);

    // 2) try to find one product category in SPANISH using DB key
    let found_categories_en = get_product_categories_by_ids(
        &pool,
        &SupportedLocale::EsMX,
        &[
            "coffee".to_string(), // notice it's not a DB `_id` but DB `_key`
        ],
    )
    .await
    .unwrap();

    assert_eq!(found_categories_en.len(), 1);
    insta::assert_debug_snapshot!(found_categories_en);

    cleanup_test_database(&db_name).await;
}
