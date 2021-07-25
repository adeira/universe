use crate::graphql_context::Context;
use juniper::{EmptySubscription, RootNode};

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
    fn analytics() -> crate::analytics::AnalyticsQuery {
        crate::analytics::AnalyticsQuery {}
    }

    fn auth() -> crate::auth::api::AuthQuery {
        crate::auth::api::AuthQuery {}
    }

    fn commerce() -> crate::commerce::api::CommerceQuery {
        crate::commerce::api::CommerceQuery {}
    }

    fn menu() -> crate::menu::api::MenuQuery {
        crate::menu::api::MenuQuery {}
    }

    fn pos() -> crate::pos::api::POSQuery {
        crate::pos::api::POSQuery {}
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
    fn auth() -> crate::auth::api::AuthMutation {
        crate::auth::api::AuthMutation {}
    }

    fn commerce() -> crate::commerce::api::CommerceMutation {
        crate::commerce::api::CommerceMutation {}
    }

    fn pos() -> crate::pos::api::POSMutation {
        crate::pos::api::POSMutation {}
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

    fn test_graphql_schema_snapshot(schema: &str, new_schema_path: &str, saved_schema_path: &str) {
        let saved_schema_snapshot =
            fs::read_to_string(saved_schema_path).expect("unable to read schema file");

        assert!(signedsource::is_signed(&saved_schema_snapshot));
        assert!(signedsource::is_valid_signature(&saved_schema_snapshot));

        let new_schema_snapshot =
            signedsource::sign_file(&format!("# {}\n\n{}", signedsource::SIGNING_TOKEN, schema));

        if saved_schema_snapshot != new_schema_snapshot {
            fs::write(new_schema_path, new_schema_snapshot)
                .expect("unable to write new schema file");
        }

        assert!(
            !Path::new(new_schema_path).exists(),
            "schema snapshot with *.new extension should not exist - please resolve it"
        );
    }

    /// This test will make sure that the schema generated by server is ready to be used by
    /// public clients. Please note that the paths below are relative to the project root (not this
    /// file, not the whole monorepo)
    #[test]
    fn schema_snapshot_test() {
        let new_schema_path = "./schema.graphql.new";
        let saved_schema_path = "./schema.graphql";
        test_graphql_schema_snapshot(
            &super::create_graphql_schema().as_schema_language(),
            &new_schema_path,
            &saved_schema_path,
        );
    }
}
