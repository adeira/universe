use crate::commerce::model::products::ProductMultilingualInput;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;

/// # Multilingual input validation rules
///
/// 1. There must be at least one translation variant available.
/// 2. Each translation variant must have a name, description is optional (enforced by the input type).
/// 3. Price cannot be bellow zero (must be positive).
pub(in crate::commerce::model) fn validate_product_multilingual_input(
    product_multilingual_input: &ProductMultilingualInput,
) -> anyhow::Result<()> {
    let translations = &product_multilingual_input.translations;

    // At least one translation variant must exist:
    if translations.is_empty() {
        anyhow::bail!("Product must have at least one translation variant.");
    }

    if translations.iter().any(|t| t.name.is_empty()) {
        anyhow::bail!("Product name cannot be empty.")
    }

    // Price must be higher than zero:
    if product_multilingual_input.price.unit_amount < 0 {
        anyhow::bail!("Product price cannot be smaller than zero.");
    }

    Ok(())
}

/// Makes sure that the product categories specified in GraphQL input actually exist.
pub(in crate::commerce::model) async fn validate_product_categories(
    context: &Context,
    client_locale: &SupportedLocale,
    graphql_categories: &Vec<String>,
) -> anyhow::Result<()> {
    if !graphql_categories.is_empty() {
        let resolved_product_categories =
            crate::commerce::model::product_categories::get_product_categories_by_ids(
                context,
                client_locale,
                graphql_categories,
            )
            .await?;

        if resolved_product_categories.len() != graphql_categories.len() {
            // This is just a simplified quick check where we compare number of categories from the
            // GraphQL input vs. number of categories returned from DB for these IDs. If the number
            // matches then all categories are valid. We might do more elaborate check later to suggest
            // which GraphQL input ID is wrong.
            anyhow::bail!("product category IDs specified in the GraphQL input are not valid")
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::commerce::model::products::{
        ProductMultilingualInputTranslations, ProductPriceInput,
    };
    use crate::locale::SupportedLocale;
    use crate::price::SupportedCurrency;

    #[test]
    fn validate_product_multilingual_input_valid_test() {
        assert!(
            validate_product_multilingual_input(&ProductMultilingualInput {
                ..Default::default()
            })
            .is_ok(),
        )
    }

    #[test]
    fn validate_product_multilingual_input_missing_translations_test() {
        assert_eq!(
            validate_product_multilingual_input(&ProductMultilingualInput {
                translations: vec![],
                ..Default::default()
            })
            .unwrap_err()
            .downcast::<&str>()
            .unwrap(),
            "Product must have at least one translation variant."
        )
    }

    #[test]
    fn validate_product_multilingual_input_empty_name_test() {
        assert_eq!(
            validate_product_multilingual_input(&ProductMultilingualInput {
                translations: vec![ProductMultilingualInputTranslations {
                    locale: SupportedLocale::EnUS,
                    name: String::from(""),
                    description: None,
                }],
                ..Default::default()
            })
            .unwrap_err()
            .downcast::<&str>()
            .unwrap(),
            "Product name cannot be empty."
        )
    }

    #[test]
    fn validate_product_multilingual_input_invalid_price_test() {
        assert_eq!(
            validate_product_multilingual_input(&ProductMultilingualInput {
                price: ProductPriceInput {
                    unit_amount: -10,
                    unit_amount_currency: SupportedCurrency::MXN,
                },
                ..Default::default()
            })
            .unwrap_err()
            .downcast::<&str>()
            .unwrap(),
            "Product price cannot be smaller than zero."
        )
    }
}
