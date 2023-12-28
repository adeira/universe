# Sync Queues extension

Uses one queue as a source and keeps other queues configuration in sync.

TODO: add more details

Note: it is technically possible to connect one schema to multiple queues. It would however allow users to overwrite the schema from any child queue which might not be desirable. This solution keeps the schemas separated and only uses the source queue as a source of truth.
