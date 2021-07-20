use crate::arangodb::Database;
use crate::arangors::analyzer::AnalyzerFeature::{Frequency, Norm, Position};
use crate::arangors::analyzer::{AnalyzerInfo, NgramAnalyzerProperties, NgramStreamType};
use crate::arangors::view::{ArangoSearchViewLink, ArangoSearchViewPropertiesOptions, ViewOptions};
use crate::migrations::utils::create_view;
use std::collections::HashMap;

pub async fn migrate(db: &Database) -> anyhow::Result<()> {
    db.create_analyzer(AnalyzerInfo::Ngram {
        name: String::from("bigram"),
        features: Some(vec![Frequency, Norm, Position]),
        properties: Some(
            NgramAnalyzerProperties::builder()
                .min(2)
                .max(2)
                .preserve_original(false)
                .stream_type(NgramStreamType::Utf8)
                .build(),
        ),
    })
    .await?;

    let mut links = HashMap::new();
    let mut links_fields = HashMap::new();

    links_fields.insert(
        String::from("translations"),
        ArangoSearchViewLink {
            analyzers: Some(vec![
                String::from("text_en"),
                String::from("text_es"),
                String::from("bigram"),
            ]),
            fields: None,
            include_all_fields: Some(true),
            track_list_positions: None,
            store_values: None,
        },
    );

    links.insert(
        String::from("products"),
        ArangoSearchViewLink {
            analyzers: None,
            fields: Some(links_fields),
            include_all_fields: Some(false),
            track_list_positions: None,
            store_values: None,
        },
    );

    create_view(
        &db,
        "search_products",
        ViewOptions::builder()
            .name(String::from("search_products"))
            .properties(
                ArangoSearchViewPropertiesOptions::builder()
                    .links(links)
                    .build(),
            )
            .build(),
    )
    .await
}
