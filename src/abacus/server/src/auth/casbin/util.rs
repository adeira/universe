use lazy_static::lazy_static;
use regex::Regex;

lazy_static! {
    static ref ESC_C: Regex = ::regex::Regex::new(r#"(\s*"[^"]*"?|\s*[^,]*)"#).unwrap();
}

pub fn parse_csv_line<S: AsRef<str>>(line: S) -> Option<Vec<String>> {
    let line = line.as_ref().trim();
    if line.is_empty() || line.starts_with('#') {
        return None;
    }

    let mut res = vec![];
    for col in ESC_C.find_iter(line).map(|m| m.as_str().trim()) {
        res.push({
            if col.len() >= 2 && col.starts_with('"') && col.ends_with('"') {
                col[1..col.len() - 1].to_owned()
            } else {
                col.to_owned()
            }
        })
    }
    if res.is_empty() {
        None
    } else {
        Some(res)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_csv_parse_1() {
        assert_eq!(
            parse_csv_line("alice, domain1, data1, action1"),
            Some(vec![
                "alice".to_owned(),
                "domain1".to_owned(),
                "data1".to_owned(),
                "action1".to_owned()
            ])
        )
    }

    #[test]
    fn test_csv_parse_2() {
        assert_eq!(
            parse_csv_line("alice, \"domain1, domain2\", data1 , action1"),
            Some(vec![
                "alice".to_owned(),
                "domain1, domain2".to_owned(),
                "data1".to_owned(),
                "action1".to_owned()
            ])
        )
    }

    #[test]
    fn test_csv_parse_3() {
        assert_eq!(
            parse_csv_line(","),
            Some(vec!["".to_owned(), "".to_owned(),])
        )
    }

    #[test]
    fn test_csv_parse_4() {
        assert_eq!(parse_csv_line(" "), None);
        assert_eq!(parse_csv_line("#"), None);
        assert_eq!(parse_csv_line(" #"), None);
    }

    #[test]
    fn test_csv_parse_5() {
        assert_eq!(
            parse_csv_line("alice, \"domain1, domain2\", \"data1, data2\", action1"),
            Some(vec![
                "alice".to_owned(),
                "domain1, domain2".to_owned(),
                "data1, data2".to_owned(),
                "action1".to_owned()
            ])
        )
    }

    #[test]
    fn test_csv_parse_6() {
        assert_eq!(parse_csv_line("\" "), Some(vec!["\"".to_owned()]))
    }

    #[test]
    fn test_csv_parse_7() {
        assert_eq!(
            parse_csv_line("\" alice"),
            Some(vec!["\" alice".to_owned()])
        )
    }

    #[test]
    fn test_csv_parse_8() {
        assert_eq!(
            parse_csv_line("alice, \"domain1, domain2"),
            Some(vec!["alice".to_owned(), "\"domain1, domain2".to_owned(),])
        )
    }

    #[test]
    fn test_csv_parse_9() {
        assert_eq!(parse_csv_line("\"\""), Some(vec!["".to_owned()]));
    }

    #[test]
    fn test_csv_parse_10() {
        assert_eq!(
            parse_csv_line("r.sub.Status == \"ACTIVE\", /data1, read"),
            Some(vec![
                "r.sub.Status == \"ACTIVE\"".to_owned(),
                "/data1".to_owned(),
                "read".to_owned()
            ])
        );
    }
}
