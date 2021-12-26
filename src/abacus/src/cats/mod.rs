use crate::auth::rbac;
use crate::auth::rbac::Actions::Cats;
use crate::auth::rbac::CatsActions::ListAllCats;
use crate::cats::dal::{list_all_cats, AllCatsFilter, CatInfo};
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;

mod dal;

pub(crate) struct CatsQuery;

#[juniper::graphql_object(context = Context)]
impl CatsQuery {
    async fn list_all_cats(
        context: &Context,
        all_cats_filter: Option<AllCatsFilter>, // TODO: remove `Option` (make required) when FE is migrated
    ) -> AbacusGraphQLResult<Vec<CatInfo>> {
        rbac::verify_permissions(&context.user, &Cats(ListAllCats)).await?;
        Ok(list_all_cats(&context.pool, &all_cats_filter).await?)
    }
}
