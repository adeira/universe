#[derive(Clone, Debug, serde::Deserialize, PartialEq)]
pub struct Restaurant {
    _id: String,
    _key: String,
    _rev: String,
    pub name: String,
}

#[derive(Clone, Debug, serde::Deserialize, PartialEq)]
pub struct Shop {
    _id: String,
    _key: String,
    _rev: String,
    pub name: String,
}

/// SDUI Content is an enum of possible entities (like restaurants, shops and so on). We deserialize
/// them by DB collection name (see serde union tag).
#[derive(Clone, Debug, serde::Deserialize, PartialEq)]
#[serde(tag = "_serde_union_tag", content = "_serde_union_content")]
pub enum SDUIContent {
    #[serde(rename = "restaurants")]
    Restaurant(Restaurant),
    #[serde(rename = "shops")]
    Shop(Shop),
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_deserializes_restaurant_correctly() {
        assert_eq!(
            serde_json::from_str::<SDUIContent>(
                r#"{
                  "_serde_union_tag": "restaurants",
                  "_serde_union_content": {
                    "_key": "123456",
                    "_id": "restaurants/123456",
                    "_rev": "_abcdefg---",
                    "name": "El Cardenal"
                  }
                }"#
            )
            .unwrap(),
            SDUIContent::Restaurant(Restaurant {
                _id: "restaurants/123456".to_string(),
                _key: "123456".to_string(),
                _rev: "_abcdefg---".to_string(),
                name: "El Cardenal".to_string(),
            })
        );
    }

    #[test]
    fn it_deserializes_shop_correctly() {
        assert_eq!(
            serde_json::from_str::<SDUIContent>(
                r#"{
                  "_serde_union_tag": "shops",
                  "_serde_union_content": {
                    "_key": "123456",
                    "_id": "shops/123456",
                    "_rev": "_abcdefg---",
                    "name": "OXXO Santa Catarina"
                  }
                }"#
            )
            .unwrap(),
            SDUIContent::Shop(Shop {
                _id: "shops/123456".to_string(),
                _key: "123456".to_string(),
                _rev: "_abcdefg---".to_string(),
                name: "OXXO Santa Catarina".to_string(),
            })
        );
    }
}
