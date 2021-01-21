use crate::graphql_context::Context;
use crate::sdui::sdui_section::SDUISection;
use juniper::{EmptySubscription, FieldResult, RootNode};

#[derive(Clone, Copy, Debug)]
pub struct Query;

/// Unfortunately, due to Rust limitations, it's not possible to implement custom queries per crate.
/// Therefore, we have to have one main "god" query which exposes the public interface. Good side of
/// this is that it forces us to make these resolvers as thin as possible and moving all the business
/// logic lower in the app structure.
#[juniper::graphql_object(
    context = Context,
    name = "Query",
    description = "Root query of the graph.",
)]
impl Query {
    // TODO: separate public and backoffice GraphQL schema

    async fn mobile_entrypoint_sections(
        key: String,
        context: &Context,
    ) -> FieldResult<Vec<SDUISection>> {
        crate::sdui::api::mobile_entrypoint_sections(key, context).await
    }

    async fn search_products(
        context: &Context,
        client_locale: crate::commerce::api::ClientLocale,
        price_sort_direction: crate::commerce::api::PriceSortDirection,
        search_term: Option<String>,
    ) -> Option<Vec<Option<crate::commerce::api::Product>>> {
        crate::commerce::api::search_products(
            &context,
            &client_locale,
            &price_sort_direction,
            &search_term,
        )
        .await
    }

    async fn get_product(
        context: &Context,
        client_locale: crate::commerce::api::ClientLocale,
        product_id: juniper::ID,
    ) -> Option<crate::commerce::api::Product> {
        crate::commerce::api::get_product(&context, &client_locale, &product_id.to_string()).await
    }

    /// Returns information about the current user (can be authenticated or anonymous).
    async fn whoami(context: &Context) -> crate::auth::api::WhoamiPayload {
        crate::auth::api::whoami(context).await
    }

    fn pos() -> crate::pos::api::POS {
        crate::pos::api::POS {}
    }
}

#[derive(Clone, Copy, Debug)]
pub struct Mutation;

#[juniper::graphql_object(
    context = Context,
    name = "Mutation",
    description = "Root mutation of the graph.",
)]
impl Mutation {
    // TODO: separate public and backoffice GraphQL schema

    /// This function accepts Google ID token (after receiving it from Google Sign-In in a mobile
    /// device) and returns authorization payload. There is no concept of sign-in and sign-up
    /// because every user with a valid JWT ID token will be either authorized OR registered and
    /// authorized. Invalid tokens and disabled tokens will be rejected.
    ///
    /// Please note: repeated calls will result in error since we cannot authorize the user twice
    /// and we cannot return the previous token either (since it's hashed).
    async fn authorize_mobile(
        google_id_token: String,
        context: &Context,
    ) -> FieldResult<crate::auth::api::AuthorizeMobilePayload> {
        crate::auth::api::authorize_mobile(&google_id_token, &context).await
    }

    /// The purpose of this `deauthorize` mutation is to remove the active sessions and efectivelly
    /// make the mobile application unsigned. Mobile applications should remove the session token
    /// once deauthorized.
    ///
    /// Repeated calls will result in failure since it's not possible to deauthorize twice.
    async fn deauthorize_mobile(
        session_token: String, // TODO: this could be removed (?) - we can use the user from context
        context: &Context,
    ) -> crate::auth::api::DeauthorizeMobilePayload {
        crate::auth::api::deauthorize_mobile(&session_token, &context).await
    }

    async fn product_create(
        context: &Context,
        product_input: crate::commerce::api::ProductInput,
    ) -> crate::commerce::api::ProductOrError {
        crate::commerce::api::create_product(&context, &product_input).await
    }

    async fn product_delete(
        context: &Context,
        product_id: juniper::ID,
    ) -> crate::commerce::api::ProductOrError {
        crate::commerce::api::delete_product(&context, &product_id.to_string()).await
    }
}

pub type Schema = RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

pub fn create_graphql_schema() -> Schema {
    Schema::new(Query, Mutation, EmptySubscription::<Context>::new())
}

#[cfg(test)]
mod tests {
    use std::fs;
    use std::path::Path;

    fn test_graphql_schema_snapshot(new_schema_path: &str, saved_schema_path: &str) {
        let saved_schema_snapshot =
            fs::read_to_string(saved_schema_path).expect("unable to read schema file");

        assert!(signedsource::is_signed(&saved_schema_snapshot));
        assert!(signedsource::is_valid_signature(&saved_schema_snapshot));

        let new_schema_snapshot = signedsource::sign_file(&format!(
            "# {}\n\n{}",
            signedsource::SIGNING_TOKEN,
            super::create_graphql_schema().as_schema_language()
        ));

        if saved_schema_snapshot != new_schema_snapshot {
            fs::write(new_schema_path, new_schema_snapshot)
                .expect("unable to write new schema file");
        }

        assert_eq!(
            Path::new(new_schema_path).exists(),
            false,
            "schema snapshot with *.new extension should not exist - please resolve it"
        );
    }

    #[test]
    fn schema_public_snapshot() {
        // This test will make sure that the schema generated by server is ready to be used by
        // public clients. How to do it better?
        let new_schema_path = "./../../ya-comiste-meta/schema.public.graphql.new";
        let saved_schema_path = "./../../ya-comiste-meta/schema.public.graphql";
        test_graphql_schema_snapshot(new_schema_path, saved_schema_path);
    }

    #[test]
    fn test_backoffice_snapshot() {
        // This test will make sure that the schema generated by server is ready to be used by
        // backoffice clients. How to do it better?
        let new_schema_path = "./../../ya-comiste-meta/schema.backoffice.graphql.new";
        let saved_schema_path = "./../../ya-comiste-meta/schema.backoffice.graphql";
        test_graphql_schema_snapshot(new_schema_path, saved_schema_path);
    }
}
