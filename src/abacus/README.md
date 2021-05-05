# 🧮 ABACUS - Rust Backend

**🚧 WORK in PROGRESS 🚧**

This server is written in Rust (using [Warp](https://github.com/seanmonstar/warp)), exposes GraphQL API (via [Juniper](https://github.com/graphql-rust/juniper)) and works with [ArangoDB](https://github.com/arangodb/arangodb) database behind the scenes.

- Rust: https://www.rust-lang.org/learn
- Juniper: https://graphql-rust.github.io/juniper/current/
- ArangoDB:
  - https://www.arangodb.com/docs/stable/ (multi-model DB)
  - https://www.arangodb.com/docs/stable/data-modeling-documents-schema-validation.html
  - JSON Schema validator: https://www.jsonschemavalidator.net/

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=2c8353da1463&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

## Install and run

**🚧 WORK in PROGRESS 🚧**

We use [Telepresence](https://www.getambassador.io/docs/telepresence/latest/howtos/intercepts/) for the local development:

**Note: there is currently no K8S cluster for development. Production only. 💸**

```bash
telepresence connect
telepresence list
telepresence intercept abacus-deployment --port=5000:80 --env-file=./src/abacus/.env
```

You can now start the service locally, rest of the application will run in the remote Kubernetes cluster:

```bash
(cd src/abacus && cargo run -- --arangodb-url=http://arangodb-single-server.default.svc.cluster.local:8529)
```

The server will be accessible on: http://abacus.mrtnzlml.com:32123/graphql (or http://0.0.0.0:5000/graphql). It's recommended to use Insomnia to send request to the GraphQL API: https://insomnia.rest/graphql/

The database will be available on: http://arangodb-single-server.default.svc.cluster.local:8529 (when connected via `telepresence connect`). User `abacus`, no password.

```bash
telepresence leave abacus-deployment
telepresence quit
```

## Testing

```bash
(cd src/abacus && cargo clippy)
(cd src/abacus && cargo test)
```

There are some extra tests which are slow or require extra infrastructure (network access, ArangoDB). There tests are ignored by default but can be executed manually:

```text
(cd src/abacus && cargo test -- --ignored)
```

Note: ignored tests are not being run on CI (at least not yet)!

## Database migrations

Database migrations are currently being run automatically during the server start. It's not and ideal or final solution, but it's "good enough" for now.

## ArangoDB

- https://www.arangodb.com/
- https://hub.docker.com/r/arangodb/arangodb/

Why ArangoDB? At the time of writing, it was essentially the most promising multi-model open-source DB (with graph support) out there. Source: https://db-engines.com/en/ranking/graph+dbms

- `_id` - document handle (uniquely identifies a document in the database)
- `_key` - document's primary key (uniquely identifies a document in the collection it is stored in)
- `_rev` - document revision

Resources:

- [Best Practices for AQL Graph Queries](https://www.arangodb.com/2020/05/best-practices-for-aql-graph-queries/)

### Arangodump & Arangorestore

Database backup **with** data (empty password):

```text
arangodump \
    --server.password="" \
    --server.database=abacus \
    --output-directory="src/abacus/__dump" \
    --include-system-collections=true \
    --overwrite=true \
    --compress-output=false \
    --dump-data=true
```

Note: `--include-system-collections=true` + `--dump-data=true` is important because we are using named graphs and they are stored in a `_graphs` system collection. Eventually, we should probably split the dump into system exports with data and structural exports of the application. We are also not exporting `_system` DB at all.

Database restore:

```text
arangorestore \
    --input-directory="src/abacus/__dump" \
    --server.database=abacus
```

Arangosh access:

```text
arangosh \
    --server.password="" \
    --server.database=abacus
```

For example, to delete analyzers:

```js
var analyzers = require('@arangodb/analyzers');
analyzers.remove('bigram');
```

## TODOs

```text
🚧 001 - DB strings and source-code translations
🚧 002 - DB schema validations (JSON schema)
🚧 003 - server monitoring and error reporting (?)
🚧 004 - integration tests for ArangoDB queries - auth package (https://youtu.be/muvU1DYrY0w, https://github.com/dropbox/dbx_build_tools)
✅ 005 - implement https://github.com/woltapp/blurhash
🚧 006 - use Bazel https://bazelbuild.github.io/rules_rust/
✅ 007 - DB migrations
🚧 008 - queries whitelisting (persistent queries)
🚧 009 - explore WASM on server instead of Docker (https://github.com/deislabs/krustlet)
🚧 010 - ArangoDB database backups and restores (k8s)
🚧 011 - development k8s cluster + Telepresence
```
