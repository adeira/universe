```js
// TODO: move to a bit more declarative model for certain scenarios. For example, we should keep
// the latest JSON schemas for our collections and instead of migrating them we should just consider
// them to be the source of truth and modify the DB accordingly to the latest version without any
// migrations.
```

These migrations are written in Rust on purpose. It allows you to:

- do whatever you could do from Rust code (not limited to some YAML or AQL syntax)
- migrate not only structure but manipulate data as well
- write integration tests for these migrations

As a disadvantage they might be more verbose.
