TODO:

- DB strings and source-code translations
- dataloaders for GraphQL queries
- DB schema validations (JSON schema)
- server monitoring and error reporting (?)

# Rust server

This server is written in Rust (using [Warp](https://github.com/seanmonstar/warp)), exposes GraphQL API (via [Juniper](https://github.com/graphql-rust/juniper)) and works with [ArangoDB](https://github.com/arangodb/arangodb) database behind the scenes.

- Rust tl;dr: https://doc.rust-lang.org/stable/rust-by-example/
- Rust book: https://doc.rust-lang.org/book/
- Juniper: https://graphql-rust.github.io/juniper/current/
- ArangoDB: https://www.arangodb.com/docs/stable/ (multi-model DB)
- JSON Schema validator: https://www.jsonschemavalidator.net/

## Install and run

```text
(cd src/ya-comiste-rust && cargo run)
(cd src/ya-comiste-rust && cargo fmt)
(cd src/ya-comiste-rust && cargo clippy)
(cd src/ya-comiste-rust && cargo test --offline)
```

The server will be accessible here: http://127.0.0.1:8080/

Start the database:

```text
brew services start arangodb
```

The database will be available here: http://127.0.0.1:8529/ (user `ya-comiste-rust`, no password)

Example GraphQL query:

```graphql
{
  mobileEntrypointSections(key: "com.yaComiste.Explore") {
    id
    __typename
    component(supported: ["SDUIScrollViewHorizontalComponent"]) {
      __typename
      ... on SDUICardComponent {
        id
      }
      ... on SDUIDescriptionComponent {
        id
      }
      ... on SDUIJumbotronComponent {
        id
      }
      ... on SDUIScrollViewHorizontalComponent {
        id
        cards {
          id
          __typename
        }
      }
    }
  }
}
```

# ArangoDB

Why ArangoDB? At the time of writing, it was essentially the most promising multi-model open-source DB (with graph support) out there. Source: https://db-engines.com/en/ranking/graph+dbms

- `_id` - document handle (uniquely identifies a document in the database)
- `_key` - document's primary key (uniquely identifies a document in the collection it is stored in)
- `_rev` - document revision

Resources:

- [Best Practices for AQL Graph Queries](https://www.arangodb.com/2020/05/best-practices-for-aql-graph-queries/)

## Arangodump & Arangorestore

Database backup **with** data (empty password):

```text
arangodump \
    --server.password="" \
    --server.database=ya-comiste \
    --output-directory="src/ya-comiste-rust/__dump" \
    --include-system-collections=true \
    --overwrite=true \
    --compress-output=false \
    --dump-data=true
```

Note: `--include-system-collections=true` + `--dump-data=true` is important because we are using named graphs and they are stored in a `_graphs` system collection. Eventually, we should probably split the dump into system exports with data and structural exports of the application. We are also not exporting `_system` DB at all.

Database restore:

```text
arangorestore \
    --input-directory="src/ya-comiste-rust/__dump" \
    --server.database=ya-comiste
```
