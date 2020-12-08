A custom wrapper around [flow-bin](https://www.npmjs.com/package/flow-bin) with some additional default configuration tailored for [adeira/universe](https://github.com/adeira/universe) needs. This package does typechecking with:

- lazy mode (https://flow.org/en/docs/lang/lazy-modes/), and
- saved state (https://mrtnzlml.com/docs/flow/saved-state)

When running on CI, it does a full check (just to be sure everything is really OK).

# Usage

```
yarn add --dev flow-bin @adeira/flow-bin
```

To start using it, add the following lines to you `.gitignore` file:

```gitignore
.flow.saved_state
.flow.saved_state_file_changes
```

And run the following command: `yarn run adeira-flow-bin`

```text
$ adeira-flow-bin [COMMAND]

     restart    Restarts Flow server before running the check.
     stop       Stops Flow server.
     --all      Does complete check without any optimizations.
```

This will start the server in lazy mode and create a saved state if there are no errors. You should see the effect when you stop the Flow server and run this command again - it should be significantly faster. Please be aware that we currently support only projects with `master` branch as a base. You should follow [adeira/universe](https://github.com/adeira/universe) conventions to be able to use it reliably.

You can specify any additional options which Flow supports:

```text
$ adeira-flow-bin --flowconfig-name=.flowconfig.ios
```

There is also experimental `adeira-flow-migrate` binary which will help you to migrate the whole codebase. We currently support two projects:

- automatic migration to strict lint (`@flow strict`)
- automatic migration to "types-first" architecture

Use it only when you understand what's going on.

# Recommended CI configuration

## GitHub

```yaml
jobs:
  build:
    steps:
      # …
      - name: typecheck
        run: |
          yarn run adeira-flow-bin
```

## GitLab

```yaml
flow:
  stage: test
  image: node:$NODEJS_VERSION
  tags: [high-performance]
  script:
    - yarn install --offline --frozen-lockfile
    - yarn run adeira-flow-bin
  cache:
    # Ideally, we'd cache the saved state only on master and reuse it in other jobs. We should also
    # reuse only one runner to ensure maximum availability of the cache (see: https://docs.gitlab.com/ee/ci/caching/#good-caching-practices).
    # Note: do not cache per CI_JOB_NAME! It's because some branches can introduce new files into
    # saved state which won't be available in other branches (Flow will fail on missing file).
    key: flow-${CI_COMMIT_REF_SLUG}
    paths:
      - .flow.saved_state
```

If you utilize global cache with `node_modules`, extend it with `.flow.saved_state`:

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .flow.saved_state

flow:
  # ...
  script:
    - yarn run adeira-flow-bin
```

# Technical details

Complete re-check of the whole codebase (`restart --all`) usually takes a long time. That's why this package implements additional optimizations like _lazy mode_ and _saved state_. Here are some approximate example timings:

```text
yarn adeira-flow-bin (first run)      ~13s      (cold start, lazy mode, no saved state) ❌
yarn adeira-flow-bin (second run)     ~3s       (hot start, lazy mode, saved state) ✅
yarn adeira-flow-bin restart          ~8s       (cold start, lazy mode, saved state) ❌
yarn adeira-flow-bin restart --all    ~22s      (cold start, no lazy mode, no saved state) ❌
./node_modules/.bin/flow              ~0.14s    (just consulting already running and optimized server) ✅
```

The best performing setup for local development is currently this:

```
yarn adeira-flow-bin    (this will start server and set all optimizations)
yarn flow               (this runs Flow directly on already optimized server)
```

# Additional resources

- https://github.com/facebook/flow/blob/2f02130fe8fdc195b41fb6ee4c2c97aae9f35268/tests/saved_state_init_recheck/test.sh

**Read carefully!** This package relies on `@adeira/monorepo-utils` and Git. We assume that default branch is `origin/master` as it's common convention in Git. This is currently not configurable. This package will not work unless you are using Git.
