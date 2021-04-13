This folder (`flow-typed/npm`) should not be managed manually but via `flow-typed` CLI tool:

```text
yarn global add flow-typed
flow-typed --help
```

To update some definitions run (example for Next.js):

```text
flow-typed search next
flow-typed install --overwrite next@9
```
