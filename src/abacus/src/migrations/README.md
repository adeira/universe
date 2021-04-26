These migrations are written in Rust on purpose. It allows you to:

- do whatever you could do from Rust code (not limited to some YAML or AQL syntax)
- migrate not only structure but manipulate data as well
- write integration tests for these migrations

As a disadvantage they might be more verbose.
