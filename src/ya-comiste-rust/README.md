TODOs:

```text
🚧 001 - DB strings and source-code translations
🚧 002 - DB schema validations (JSON schema)
🚧 003 - server monitoring and error reporting (?)
🚧 004 - integration tests for ArangoDB queries - auth package (https://youtu.be/muvU1DYrY0w, https://github.com/dropbox/dbx_build_tools)
🚧 005 - implement https://github.com/woltapp/blurhash
🚧 006 - use Bazel https://bazelbuild.github.io/rules_rust/
✅ 007 - DB migrations
🚧 008 - queries whitelisting
```

# Rust server

This server is written in Rust (using [Warp](https://github.com/seanmonstar/warp)), exposes GraphQL API (via [Juniper](https://github.com/graphql-rust/juniper)) and works with [ArangoDB](https://github.com/arangodb/arangodb) database behind the scenes.

- Rust: https://www.rust-lang.org/learn
- Juniper: https://graphql-rust.github.io/juniper/current/
- ArangoDB:
  - https://www.arangodb.com/docs/stable/ (multi-model DB)
  - https://www.arangodb.com/docs/stable/data-modeling-documents-schema-validation.html
  - JSON Schema validator: https://www.jsonschemavalidator.net/

## Install and run

```text
(cd src/ya-comiste-rust && cargo run --bin server)
(cd src/ya-comiste-rust && cargo clippy --all-targets)
(cd src/ya-comiste-rust && cargo doc --open --no-deps)
```

The server will be accessible here: http://127.0.0.1:8080/graphql (use https://insomnia.rest/graphql/)

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

## Testing

```text
(cd src/ya-comiste-rust && cargo test --offline)
```

There are some extra tests which are slow or require extra infrastructure (network access, ArangoDB). There tests are ignored by default but can be executed manually:

```text
(cd src/ya-comiste-rust && cargo test --offline -- --ignored)
```

Ignored tests are not being run on CI (at least not yet)!

## Database migrations

Database migrations are currently being run automatically during the server start. It's not and ideal or final solution but it's "good enough" for now.

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

## Fulltext search

There are 2 custom analyzers at this moment:

```text
arangosh \
    --server.password="" \
    --server.database=ya-comiste
```

```js
var analyzers = require('@arangodb/analyzers');
analyzers.save(
  'text_en_ngrams',
  'text',
  {
    locale: 'en.utf-8',
    accent: false,
    case: 'lower',
    stemming: false,
    edgeNgram: {
      min: 2,
      max: 2,
      preserveOriginal: false,
      // streamType: 'utf8',
    },
    stopwords: [],
    stopwords: ['the'], // TODO
  },
  ['frequency', 'norm', 'position'],
);
```

```js
var analyzers = require('@arangodb/analyzers');
analyzers.save(
  'bigram',
  'ngram',
  {
    min: 2,
    max: 2,
    preserveOriginal: false,
    streamType: 'utf8',
  },
  ['frequency', 'norm', 'position'],
);
```
