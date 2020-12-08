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

## Arangodump & Arangorestore

Database backup (empty password):

```text
arangodump \
    --output-directory="src/ya-comiste-rust/__dump" \
    --all-databases=true \
    --overwrite=true \
    --compress-output=false \
    --maskings="src/ya-comiste-rust/__dump/masking.json"
```

Database restore:

```text
arangorestore \
    --input-directory="src/ya-comiste-rust/__dump" \
    --all-databases=true
```
