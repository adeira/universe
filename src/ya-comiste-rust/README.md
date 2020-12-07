This server is written in Rust, exposes GraphQL API (via Warp) and works with ArangoDB database behind the scenes.

- Rust tl;dr: https://doc.rust-lang.org/stable/rust-by-example/
- Rust book: https://doc.rust-lang.org/book/
- Juniper: https://graphql-rust.github.io/juniper/current/
- ArangoDB: https://www.arangodb.com/docs/stable/ (multi-model DB)
- JSON Schema validator: https://www.jsonschemavalidator.net/

```text
(cd src/ya-comiste-rust && cargo run)
(cd src/ya-comiste-rust && cargo fmt)
(cd src/ya-comiste-rust && cargo clippy)
(cd src/ya-comiste-rust && cargo test --offline)
```

- http://127.0.0.1:8080/

```text
brew services start arangodb
```

- or -

```text
/usr/local/opt/arangodb/sbin/arangod
```

- http://127.0.0.1:8529/ (user `ya-comiste-rust`, no password)

Example query:

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

# TODO

- setup CI for Rust
- DB strings and source-code translations
- dataloaders
- DB schema validations

# ArangoDB

Fetching all sections inside one entrypoint (for SDUI):

```aql
FOR vertex, edge IN 1..1 OUTBOUND 'entrypoints/com.yaComiste.Explore' entrypoint_sections
// PRUNE edge.user == 'users/87047'
// FILTER edge.user == 'users/87047'
SORT vertex.section_order ASC
RETURN vertex
```

See graph traversals: https://www.arangodb.com/docs/stable/aql/graphs-traversals.html

- `_id` - document handle (uniquely identifies a document in the database)
- `_key` - document's primary key (uniquely identifies a document in the collection it is stored in)
- `_rev` - document revision

## Arangodump & Arangorestore

Database backup (empty password):

```text
arangodump \
    --output-directory="src/ya-comiste-rust/arangodb/dump" \
    --all-databases=true \
    --overwrite=true \
    --compress-output=false \
    --maskings="src/ya-comiste-rust/arangodb/masking.json"
```

Database restore:

```text
arangorestore \
    --input-directory="src/ya-comiste-rust/arangodb/dump" \
    --all-databases=true
```

## AQL (_ArangoDB Query Language_) basics

- https://www.arangodb.com/why-arangodb/sql-aql-comparison/

```aql
RETURN DOCUMENT("users/335")

INSERT { name: "Katie Foster", age: 27 } INTO users
RETURN NEW

RETURN DOCUMENT( ["users/335", "users/680", "users/790"] )

FOR user IN users
  RETURN user

FOR user IN users
  SORT user.age DESC
  RETURN user

FOR user IN users
  FILTER user.age > 27
  SORT user.age
  RETURN user.name

# or REPLACE (to replace the whole object instead of updating it)
UPDATE "335" WITH { age: 40 } IN users
RETURN NEW

# custom result projection
FOR user IN users
  RETURN { userName: user.name, age: user.age }

FOR user IN users
  RETURN CONCAT(user.name, "'s age is ", user.age)

FOR user1 IN users
  FOR user2 IN users
    FILTER user1 != user2
    RETURN [user1.name, user2.name]

FOR user1 IN users
  FOR user2 IN users
    FILTER user1 != user2
    RETURN {
        pair: [user1.name, user2.name],
        sumOfAges: user1.age + user2.age
    }

FOR user1 IN users
  FOR user2 IN users
    FILTER user1 != user2
    LET sumOfAges = user1.age + user2.age
    FILTER sumOfAges < 100
    RETURN {
        pair: [user1.name, user2.name],
        sumOfAges: sumOfAges
    }

REMOVE "335" IN users

FOR user IN users
    FILTER user.age >= 30
    REMOVE user IN users
```
