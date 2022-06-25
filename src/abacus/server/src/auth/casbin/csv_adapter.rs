use async_trait::async_trait;
use casbin::{Adapter, Filter, Model, Result};

// TODO: convert to `ArandodbAdapter`
pub struct CSVAdapter {
    csv_content: String,
}

impl CSVAdapter {
    pub fn new(csv_content: &str) -> CSVAdapter {
        CSVAdapter {
            csv_content: csv_content.to_string(),
        }
    }
}

#[async_trait]
impl Adapter for CSVAdapter {
    async fn load_policy(&self, m: &mut dyn Model) -> Result<()> {
        let mut lines = self.csv_content.lines();

        for line in lines.by_ref() {
            // load_policy_line:
            if let Some(tokens) = crate::auth::casbin::util::parse_csv_line(line) {
                let key = &tokens[0];

                if let Some(ref sec) = key.chars().next().map(|x| x.to_string()) {
                    if let Some(ast_map) = m.get_mut_model().get_mut(sec) {
                        if let Some(ast) = ast_map.get_mut(key) {
                            ast.policy.insert(tokens[1..].to_vec());
                        }
                    }
                }
            }
        }

        Ok(())
    }

    async fn load_filtered_policy<'a>(&mut self, _m: &mut dyn Model, _f: Filter<'a>) -> Result<()> {
        Ok(())
    }

    async fn save_policy(&mut self, _m: &mut dyn Model) -> Result<()> {
        Ok(())
    }

    async fn clear_policy(&mut self) -> Result<()> {
        Ok(())
    }

    fn is_filtered(&self) -> bool {
        false
    }

    async fn add_policy(&mut self, _sec: &str, _ptype: &str, _rule: Vec<String>) -> Result<bool> {
        Ok(true)
    }

    async fn add_policies(
        &mut self,
        _sec: &str,
        _ptype: &str,
        _rules: Vec<Vec<String>>,
    ) -> Result<bool> {
        Ok(true)
    }

    async fn remove_policy(
        &mut self,
        _sec: &str,
        _ptype: &str,
        _rule: Vec<String>,
    ) -> Result<bool> {
        Ok(true)
    }

    async fn remove_policies(
        &mut self,
        _sec: &str,
        _ptype: &str,
        _rule: Vec<Vec<String>>,
    ) -> Result<bool> {
        Ok(true)
    }

    async fn remove_filtered_policy(
        &mut self,
        _sec: &str,
        _ptype: &str,
        _field_index: usize,
        _field_values: Vec<String>,
    ) -> Result<bool> {
        Ok(true)
    }
}
