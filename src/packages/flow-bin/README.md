_This package is WIP and you should use it only when you know what are you doing._

Custom wrapper around Flow-bin with some additional default configuration tailored for our needs. Notable this package does typechecking with:

- lazy mode (https://flow.org/en/docs/lang/lazy-modes/)
- saved state

# Usage

```
yarn add --dev @kiwicom/flow-bin
```

To start using it, add the following lines to you `.gitignore` file:

```gitignore
.flow.saved_state
.flow.saved_state_file_changes
```

And run the following command: `yarn run kiwicom-flow-bin`

```text
$ kiwicom-flow-bin [restart] [--all]

      restart    Restarts Flow server.
      --all      Does complete check without any optimizations.
```

This will start the server in lazy mode and create a saved state if there are no errors. You should see the effect when you stop the Flow server and run this command again - it should be significantly faster. Please be aware that we currently support only projects with `master` branch as a base. You have to follow Universe conventions to be able to use it reliably.

# Recommended CI configuration (GitLab)

```yaml
flow:
  stage: test
  image: node:$NODEJS_VERSION
  tags: [high-performance]
  <<: *retry_on_failure
  script:
    - yarn install --offline --frozen-lockfile
    - yarn run kiwicom-flow-bin
  cache:
    # We are sharing the saved state between all branches: this should allow us to reuse the
    # saved state much more (it's not a good idea to rebuild it every time for every new MR).
    key: ${CI_JOB_NAME}
    paths:
      - .flow.saved_state
```

# Technical details

Complete re-check (`restart --all`) will take a long time. We run many optimizations by default. Notably we are running Flow in Lazy Mode and we are trying to re-use Saved State when possible. Lazy Mode and Saved State are currently not configurable from outside since it should not be needed. Here are some approximate example timings (on 12356 relevant files):

```text
yarn typecheck (first run)      ~13s      (cold start, lazy mode, no saved state) ❌
yarn typecheck (second run)     ~3s       (hot start, lazy mode, saved state) ✅
yarn typecheck restart          ~8s       (cold start, lazy mode, saved state) ❌
yarn typecheck restart --all    ~22s      (cold start, no lazy mode, no saved state) ❌
./node_modules/.bin/flow        ~0.14s    (just consulting already running and optimized server)
```

Please note: these times are still significantly affected by Babel transpilation process as well as the fact that we sometimes do more things than necessary (server shutdown, force recheck). The best performing setup for local development is currently this:

```
yarn typecheck    (this will start server and set all optimizations)
yarn flow         (this runs Flow directly on already optimized server)
```

# Additional resources

- https://github.com/facebook/flow/blob/2f02130fe8fdc195b41fb6ee4c2c97aae9f35268/tests/saved_state_init_recheck/test.sh
