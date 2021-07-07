/// Creates hashmap to be directly used when calling ArangoDB (`resolve_aql` expects `HashMap<&str, Value>`).
macro_rules! hashmap_json {
    // Empty hashmap:
    () => {{
        let map = ::std::collections::HashMap::new();
        map
    }};

    // With trailing comma:
    ($($key:expr => $val:expr,)*) => {{
        let mut map = ::std::collections::HashMap::new();
        $(map.insert($key, serde_json::json!($val));)*
        map
    }};

    // Without trailing comma:
    ($($key:expr => $val:expr),*) => {{
        let mut map = ::std::collections::HashMap::new();
        $(map.insert($key, serde_json::json!($val));)*
        map
    }};
}

#[cfg(test)]
mod tests {
    use serde_json::{json, Value};
    use std::collections::HashMap;

    #[test]
    fn hashmap_json_empty_test() {
        let hashmap_macro: HashMap<&str, Value> = hashmap_json![];
        let hashmap_manual: HashMap<&str, Value> = HashMap::new();
        assert_eq!(hashmap_macro, hashmap_manual)
    }

    #[test]
    fn hashmap_json_trailing_comma_test() {
        let hashmap_macro: HashMap<&str, Value> = hashmap_json![
            "A" => -1,
            "B" => true,
            "C" => 12.5,
            "D" => "a string",
            "E" => json!(["an", "array"]),
            "F" => json!({"an": "object"}),
            "G" => json!(null), // trailing comma here!
        ];

        let mut hashmap_manual: HashMap<&str, Value> = HashMap::new();
        hashmap_manual.insert("A", json!(-1));
        hashmap_manual.insert("B", json!(true));
        hashmap_manual.insert("C", json!(12.5));
        hashmap_manual.insert("D", json!("a string"));
        hashmap_manual.insert("E", json!(["an", "array"]));
        hashmap_manual.insert("F", json!({"an": "object"}));
        hashmap_manual.insert("G", json!(null));

        assert_eq!(hashmap_macro, hashmap_manual)
    }

    #[test]
    fn hashmap_json_no_trailing_comma_test() {
        let hashmap_macro: HashMap<&str, Value> = hashmap_json![
            "A" => 1,
            "B" => 2,
            "C" => 3 // NO trailing comma here
        ];

        let mut hashmap_manual: HashMap<&str, Value> = HashMap::new();
        hashmap_manual.insert("A", json!(1));
        hashmap_manual.insert("B", json!(2));
        hashmap_manual.insert("C", json!(3));

        assert_eq!(hashmap_macro, hashmap_manual)
    }

    #[test]
    fn hashmap_json_alternative_syntax_1_test() {
        let hashmap_macro: HashMap<&str, Value> = hashmap_json! {
            "A" => 1, "B" => 2,
        };

        let mut hashmap_manual: HashMap<&str, Value> = HashMap::new();
        hashmap_manual.insert("A", json!(1));
        hashmap_manual.insert("B", json!(2));

        assert_eq!(hashmap_macro, hashmap_manual)
    }

    #[test]
    fn hashmap_json_alternative_syntax_2_test() {
        let hashmap_macro: HashMap<&str, Value> = hashmap_json! (
            "A" => 1, "B" => 2,
        );

        let mut hashmap_manual: HashMap<&str, Value> = HashMap::new();
        hashmap_manual.insert("A", json!(1));
        hashmap_manual.insert("B", json!(2));

        assert_eq!(hashmap_macro, hashmap_manual)
    }
}
