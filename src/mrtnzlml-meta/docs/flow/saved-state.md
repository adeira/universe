---
id: saved-state
title: Saved state
sidebar_label: Saved state
---

Saved state allows you to save internal Flow state to your filesystem (`.flow.saved_state` filename is important):

```text
💃 yarn flow save-state --root=. --out=.flow.saved_state
Asking server to create a saved-state file at `/project_root/.flow.saved_state`
Created saved-state file `/project_root/.flow.saved_state`
```

You also have to have `.flow.saved_state_file_changes` file with changed file in this format (absolute paths are fine as well):

```text
src/packages/eslint-config-kiwicom/index.js
src/packages/eslint-config-kiwicom/ourRules.js
```

Now, stop the Flow server and start it again like this:

```text
💃 yarn flow start --saved-state-fetcher=local --saved-state-no-fallback
```

You should be able to see that saved state is being used from logs (logs without saved state):

```text
[2019-08-28 16:09:09.039] argv=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow start
[2019-08-28 16:09:09.039] lazy_mode=off
[2019-08-28 16:09:09.039] arch=classic
[2019-08-28 16:09:09.039] abstract_locations=off
[2019-08-28 16:09:09.039] max_workers=16
[2019-08-28 16:09:09.064] Initializing Server (This might take some time)
[2019-08-28 16:09:09.065] executable=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow
[2019-08-28 16:09:09.065] version=0.106.2
// highlight-next-line
[2019-08-28 16:09:09.065] No saved state available
[2019-08-28 16:09:09.066] Parsing
[2019-08-28 16:09:09.754] File /Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/map-or-similar/map-or-similar.min.gzip.js is malformed
[2019-08-28 16:09:14.437] File /Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/memoizerific/memoizerific.min.gzip.js is malformed
[2019-08-28 16:09:16.555] Building package heap
[2019-08-28 16:09:16.833] Loading libraries
[2019-08-28 16:09:17.812] Resolving dependencies
[2019-08-28 16:09:19.483] Resolved requires changed
[2019-08-28 16:09:19.773] to_merge: Focused: 2508, Dependents: 0, Dependencies: 550
[2019-08-28 16:09:19.773] Calculating dependencies
[2019-08-28 16:09:19.784] Merging
[2019-08-28 16:09:26.445] Merge skipped 0 of 3058 modules
[2019-08-28 16:09:26.450] Done
[2019-08-28 16:09:26.450] Checked set: Focused: 2508, Dependents: 0, Dependencies: 550
[2019-08-28 16:09:26.453] Server is READY
[2019-08-28 16:09:26.453] Took 17.388532 seconds to initialize.
```

Logs WITH saved state:

```text
[2019-08-28 16:07:44.616] argv=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow start --saved-state-fetcher=local --saved-state-no-fallback
[2019-08-28 16:07:44.616] lazy_mode=off
[2019-08-28 16:07:44.616] arch=classic
[2019-08-28 16:07:44.616] abstract_locations=off
[2019-08-28 16:07:44.616] max_workers=16
[2019-08-28 16:07:44.641] Initializing Server (This might take some time)
[2019-08-28 16:07:44.641] executable=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow
[2019-08-28 16:07:44.641] version=0.106.2
// highlight-next-line
[2019-08-28 16:07:44.645] Reading saved-state file at "/Users/mrtnzlml/Work/kiwi-private/incubator/universe/.flow.saved_state"
[2019-08-28 16:07:44.677] Decompressing saved-state data
[2019-08-28 16:07:44.835] Denormalizing saved-state data
[2019-08-28 16:07:44.836] Denormalizing the data for the parsed files
[2019-08-28 16:07:44.891] Denormalizing the data for the unparsed files
[2019-08-28 16:07:45.148] Finished loading saved-state
[2019-08-28 16:07:45.148] Saved state script reports 2 files changed & we care about 2 of them
[2019-08-28 16:07:45.149] Restoring heaps
[2019-08-28 16:07:45.472] Loading libraries
[2019-08-28 16:07:46.360] Resolving dependencies
[2019-08-28 16:07:47.736] recheck 2 modified, 0 deleted files
[2019-08-28 16:07:47.736] modified files:
[2019-08-28 16:07:47.736] 1/2: /Users/mrtnzlml/Work/kiwi-private/incubator/universe/src/packages/eslint-config-kiwicom/index.js
[2019-08-28 16:07:47.736] 2/2: /Users/mrtnzlml/Work/kiwi-private/incubator/universe/src/packages/eslint-config-kiwicom/ourRules.js
[2019-08-28 16:07:47.736] Parsing
[2019-08-28 16:07:47.744] Resolved requires are unchanged
[2019-08-28 16:07:47.744] Re-resolving directly dependent files
[2019-08-28 16:07:47.745] Resolved requires are unchanged
[2019-08-28 16:07:47.745] Recalculating dependency graph
[2019-08-28 16:07:47.750] Merge prep
[2019-08-28 16:07:47.750] to_merge: Focused: 0, Dependents: 0, Dependencies: 0
[2019-08-28 16:07:47.750] Calculating dependencies
[2019-08-28 16:07:47.750] Merging
[2019-08-28 16:07:47.750] Merge skipped 0 of 0 modules
[2019-08-28 16:07:47.750] Done
[2019-08-28 16:07:47.750] Checked set: Focused: 0, Dependents: 0, Dependencies: 0
[2019-08-28 16:07:49.571] to_merge: Focused: 2508, Dependents: 0, Dependencies: 550
[2019-08-28 16:07:49.571] Calculating dependencies
[2019-08-28 16:07:49.582] Merging
[2019-08-28 16:07:56.261] Merge skipped 0 of 3058 modules
[2019-08-28 16:07:56.267] Done
[2019-08-28 16:07:56.267] Checked set: Focused: 2508, Dependents: 0, Dependencies: 550
[2019-08-28 16:07:56.271] Server is READY
[2019-08-28 16:07:56.271] Took 11.629359 seconds to initialize.
```

You can see that there is already some improvement. It's very convenient to combine it with `--lazy` mode:

```text
💃 yarn flow start --saved-state-fetcher=local --saved-state-no-fallback --lazy
```

Logs WITH saved state and lazy mode

```text
[2019-08-28 16:11:47.493] argv=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow start --saved-state-fetcher=local --saved-state-no-fallback --lazy
// highlight-next-line
[2019-08-28 16:11:47.493] lazy_mode=fs
[2019-08-28 16:11:47.493] arch=classic
[2019-08-28 16:11:47.493] abstract_locations=off
[2019-08-28 16:11:47.493] max_workers=16
[2019-08-28 16:11:47.516] Initializing Server (This might take some time)
[2019-08-28 16:11:47.516] executable=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow
[2019-08-28 16:11:47.516] version=0.106.2
// highlight-next-line
[2019-08-28 16:11:47.524] Reading saved-state file at "/Users/mrtnzlml/Work/kiwi-private/incubator/universe/.flow.saved_state"
[2019-08-28 16:11:47.557] Decompressing saved-state data
[2019-08-28 16:11:47.694] Denormalizing saved-state data
[2019-08-28 16:11:47.695] Denormalizing the data for the parsed files
[2019-08-28 16:11:47.754] Denormalizing the data for the unparsed files
[2019-08-28 16:11:48.005] Finished loading saved-state
[2019-08-28 16:11:48.006] Saved state script reports 2 files changed & we care about 2 of them
[2019-08-28 16:11:48.006] Restoring heaps
[2019-08-28 16:11:48.325] Loading libraries
[2019-08-28 16:11:49.220] Resolving dependencies
[2019-08-28 16:11:50.578] recheck 2 modified, 0 deleted files
[2019-08-28 16:11:50.578] modified files:
[2019-08-28 16:11:50.578] 1/2: /Users/mrtnzlml/Work/kiwi-private/incubator/universe/src/packages/eslint-config-kiwicom/index.js
[2019-08-28 16:11:50.578] 2/2: /Users/mrtnzlml/Work/kiwi-private/incubator/universe/src/packages/eslint-config-kiwicom/ourRules.js
[2019-08-28 16:11:50.578] Parsing
[2019-08-28 16:11:50.585] Resolved requires are unchanged
[2019-08-28 16:11:50.586] Re-resolving directly dependent files
[2019-08-28 16:11:50.586] Resolved requires are unchanged
[2019-08-28 16:11:50.586] Recalculating dependency graph
[2019-08-28 16:11:50.591] Server is READY
[2019-08-28 16:11:50.591] Took 3.075273 seconds to initialize.
```

That's a huge improvement (from original cold start 17s to cold start 3s). Don't forget to refocus the lazy mode in case of Flow server already running:

```text
💃 flow force-recheck --focus --lazy --input-file=.flow.saved_state_file_changes
```

- https://github.com/facebook/flow/commit/a65982f3adccd7faab86d55871803a07b26f8394
- https://github.com/facebook/flow/blob/2f02130fe8fdc195b41fb6ee4c2c97aae9f35268/tests/saved_state_init_recheck/test.sh
