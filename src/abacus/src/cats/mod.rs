use crate::auth::rbac;
use crate::auth::rbac::Actions::Cats;
use crate::auth::rbac::CatsActions::ListAllCats;
use crate::cats::dal::{list_all_cats, CatInfo};
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;

mod dal;

pub(crate) struct CatsQuery;

#[juniper::graphql_object(context = Context)]
impl CatsQuery {
    async fn list_all_cats(context: &Context) -> AbacusGraphQLResult<Vec<CatInfo>> {
        rbac::verify_permissions(&context.user, &Cats(ListAllCats)).await?;
        Ok(list_all_cats(&context.pool).await?)
    }
}
