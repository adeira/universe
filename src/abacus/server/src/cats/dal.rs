use crate::arango::{resolve_aql_vector, ConnectionPool};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct CatInfo {
    _id: String,
    _key: String,
    name: String,
    description: String,
    order: i32,
    can_be_adopted: Option<bool>,
    date_adoption: Option<String>,
    date_deworming: Option<String>,
    date_castration: Option<String>,
    date_vaccination_rabies: Option<String>,
    date_vaccination_triple_felina: Option<String>,
    date_vaccination_cuadruple_felina: Option<String>,
}

// TODO: expose "birth" (approx. age)
#[juniper::graphql_object]
impl CatInfo {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    fn name(&self) -> String {
        self.name.to_owned()
    }

    fn description(&self) -> String {
        self.description.to_owned()
    }

    /// Order in which the cat was admitted to KOCHKA Café.
    fn order(&self) -> i32 {
        self.order.to_owned()
    }

    /// Most of the cats can be adopted but some cannot. This flag distinguishes exactly this.
    fn can_be_adopted(&self) -> Option<bool> {
        self.can_be_adopted.to_owned()
    }

    /// When was the cat adopted (when it leaved KOCHKA Café).
    fn date_of_adoption(&self) -> Option<String> {
        self.date_adoption.to_owned()
    }

    /// When was the cat dewormed for the last time.
    fn date_of_deworming(&self) -> Option<String> {
        self.date_deworming.to_owned()
    }

    /// When was the cat castrated.
    fn date_of_castration(&self) -> Option<String> {
        self.date_castration.to_owned()
    }

    fn date_of_vaccination_rabies(&self) -> Option<String> {
        self.date_vaccination_rabies.to_owned()
    }

    /// Felocell 3 and similar.
    fn date_of_vaccination_triple_felina(&self) -> Option<String> {
        self.date_vaccination_triple_felina.to_owned()
    }

    /// Purevax Feline 4 and similar.
    fn date_of_vaccination_cuadruple_felina(&self) -> Option<String> {
        self.date_vaccination_cuadruple_felina.to_owned()
    }
}

#[derive(juniper::GraphQLInputObject)]
pub struct AllCatsFilter {
    /// When `true` returns only adopted cats. When `false` returns only cats available for adoption.
    adopted: bool,
}

pub(in crate::cats) async fn list_all_cats(
    pool: &ConnectionPool,
    filter: &Option<AllCatsFilter>,
) -> anyhow::Result<Vec<CatInfo>> {
    match filter {
        Some(filter) => {
            resolve_aql_vector(
                pool,
                r#"
                  FOR cat IN cats
                    FILTER IS_NULL(cat.date_adoption) != @adopted
                    SORT cat.order ASC
                    RETURN cat
                "#,
                hashmap_json![
                    "adopted" => filter.adopted,
                ],
            )
            .await
        }
        None => {
            resolve_aql_vector(
                pool,
                r#"
                  FOR cat IN cats
                    SORT cat.order ASC
                    RETURN cat
                "#,
                hashmap_json![],
            )
            .await
        }
    }
}
