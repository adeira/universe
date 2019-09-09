- **https://flow.org/en/docs/faq/**
- https://github.com/wgao19/flow-notes
- https://github.com/facebook/flow/blob/master/Changelog.md
- https://github.com/niieani/typescript-vs-flowtype
- https://github.com/vkurchatkin/typescript-vs-flow
- https://github.com/lttb/flown
- https://gist.github.com/kangax/aa59598cf28d02f38579d8a95b5cbf92
- https://github.com/dustinspecker/awesome-flow
- https://gajus.github.io/flow-runtime/
- https://medium.com/flow-type/what-the-flow-team-has-been-up-to-54239c62004f#a548
- Paper: [Fast and Precise Type Checking for JavaScript](https://arxiv.org/pdf/1708.08021.pdf)

Showerthoughts:

> flow infers the widest type that makes your code work ... if you don't want inference to widen your type, the solution is always to annotate

# The New Spread Model

Part 1: https://medium.com/flow-type/coming-soon-changes-to-object-spreads-73204aef84e1

# `RestrictedElement<typeof MenuItem>`

[flow.org/try](https://flow.org/try/#0PTAEAEDMBsHsHcBQjgCpQFMDO0CWA7AFwFoATXLAQwCNoNRVhkBjWfLQ0AJQ0uc4C8oAE4YAjgFdcogBQByUX0JyAlAG5khAJ4AHegDEJ+frjYBhWAFsdbDER75SGYQB4A1ABUHT4QD5QQjI6wrA6WABcoJT4WioB-l52PhqI2nqgZtCUWFgW1rb2Sc7uiY7O-kKZ2VguiKDcvPwAJHk2+HaELtFaADRRMf4AZKAEhM6QfPQA3iJFwjIqkaU+oAC+PYi+KRgAHjbCnGn0PBzCuPwYpACidJYdJTcYd0QeuhiRPEpNj8+Er3oVUBTAA+dVAbiO4TB9WBoA8Pw6-ww0NAsKqOVaBUI3mKJ0IZwu11u93hxJeb18vhRsMMxkIpnwmPahTKrjxBLGRKeJIR5IBvg29TcwVCEX6vVAIDhAAt6CKwqAjiMsFFoIpSFpQMxKDpCBJRKQRvhFbLFW9QJBcBhoKRBZKwNFDRIsAQAOagXmEAAKIQVomY+pdADdrZrtcbXRhOCHhJrdnp2LgQwA6UAASXYY0opDBUtgkFAOkoWjdFtgwhNlE4rGsEkIVYZfTToCczFwTkNhFgoGd9G6yCFAGsMFoPo1CE0ANIj1GgfASaDQO1uUSQSLdDbA1YpKUATVgEi10Uw+Eg5eY9BrNhd9LYlGgharY2E7FA8FwhGlDVO505nqhzBZDkoAALJ2BIaZjJYmA7GMjgqp8-DJky9wglu-hTKsiCAdUoHgQAyhgRbCFW5YwXBpAIeOyFWG0qHAuhQJYThwFgfO5FJFRSg0fkzKdCCYLMNKuA2qI+BjtxZjCaJdgAILCCRWi1PU9Tsr+lyei4Rz5nh86QU8-iwmphKadpBZsRIhHEaRfh2gKiCMZh2FASqABysCELJFkoUQHHwQ0km0ViLhoasGFYSgYCyYuJqXtJpBiWaegqvecDwJcybYWwHCKtghAAIwBKAMhgi4FlUipoBleB+nQcAFUqdV85WZQJFdhW9WlcA5WIOoyBSu5nneUFfHKnOHn9KqaWXFq8WZawma5RwABMRUlfUTUSA1G0WbVkrbVVFktW1ZGdZVUxoKATT6GlVx7BgJkKeWkSDV54E+ZwFDjZwqUIDNBCxbMP6ErNIkJXYmBkoQWAogwRq6YeV5YqmADy+DQJqu1Qf0hpHURrU2VEohTX9pCpoAoOQMMAWGVS4r3DbxHT7V1PV9c5uE4sIWBvXp2O7BRXFIR9IUMWFQJgmJPgLBJSGmW8OlYwZ4uVaIeovodNXY-VGj1FhEULTlYwcAAzGtpU9bTit1Qdm3HYTZ2NZz3NW8zG3deBVJsyxVGslg+FWFGwn4K6HjSlWTs8xBfOwZxAVCyN9GObmYD7oeiiLpqWDSgeNqgAAVs6nC9t++LqVyvygLKoh9NQdbpm+0SEMnirdk4ljZfiVb0J+9AwLsuDUCJH5aJl9SS840tx4QyZy3oOkR1bGEoqr+rGi4C+a08+062siARVKIHlt3YfGoVdAhg+ThEVli1G4QAAsZs7R7KKbXtDvP81+MnR1NtO-7dxPxulDuHOYztN7WxZi-NmUoABCuBXSRhyglSg8BqB8EHMVXA7c4hfU-FWUAslqCnCUB9ZU+A5DVlog2Wg9B3yfkiiaL6RZCDPnwKmZs8BG4t1mtESMlZCAAEJipBlwJQSurCwjhBAK6D80oJDUGTDWYAedqAhHgPgZa+UACsKhEBAA), alternative to: https://flow.org/en/docs/react/children/#toc-only-allowing-a-specific-element-type-as-children

# Unsealed objects in Flow

https://flow.org/en/docs/types/objects/#toc-unsealed-objects

Unsealed objects are a special case in Flow. They allow you to create an empty object to be able to add properties later (see the docs). There are some special properties worth mentioning:

1) reading unknown property from unsealed objects is unsafe

```js
const obj = {};

obj.foo = 1;
obj.bar = true;

var foo: number  = obj.foo; // Works!
var bar: boolean = obj.bar; // Works!
var baz: string  = obj.baz; // Works? (reads from unsealed objects with no matching writes are never checked)
```

2) cannot assign unsealed object to the exact type

```js
type Foo = {| a?: string, b?: string |}

const foo1: Foo = {a: ''}             // works as expected
const foo2: Foo = {}                  // doesn't work, but should (?)
const foo3: Foo = {...null}           // this is equivalent to {} but is not an unsealed object
const foo4: Foo = Object.freeze({})   // alternatively
```

https://github.com/facebook/flow/issues/7566#issuecomment-526534111

# Oncalls in Facebook (Flow related)

> so the way it works is that the Flow team has a rotating oncall. it's relatively calm as oncalls go (we aren't getting woken up in the middle of the night), but whoever is oncall is responsible for doing support (we have an internal group where people can ask questions), and also responsible for taking the lead if something goes wrong with Flow or the various related integrations we have. near the beginning of the year we also made it so that the oncall is responsible for addressing libdef and documentation PRs, since there is usually no clear owner for those, and pretty much anyone should be able to review them

(source Discord)

# Sound vs. complete

> A sound type system (or analysis) is one that rejects all erroneous programs, and a complete system accepts all correct programs.

> A sound type system is one that is not lenient, in that it rejects all invalid programs plus some number of valid programs. A complete type system accepts all valid programs, and some invalid ones to boot. Which to pick?

- https://eschew.wordpress.com/2009/08/31/sound-and-complete/
- https://stackoverflow.com/a/21437375/3135248

Please note: not everything can be expressed/modeled in your type system so you have to take into account also dynamic errors (division by zero or integer overflow) when writing your program.

> Programmers dislike having the computer reject a program that would have run fine, simply because the computer couldn’t make sure it would run fine without actually running it. In short, restrictive type systems drive programmers to more flexible environments.

# Contributing to native libdevs

https://github.com/facebook/flow#building-flow

```
make
bash runtests.sh -t node_tests bin/flow
bash runtests.sh -t node_tests -r bin/flow
```

Note:

> `make build-flow-debug` should be faster

# Saved state

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

You should be able to see that saved state is being used from logs:

<details>
<summary>Logs without saved state</summary>

```text
[2019-08-28 16:09:09.039] argv=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow start
[2019-08-28 16:09:09.039] lazy_mode=off
[2019-08-28 16:09:09.039] arch=classic
[2019-08-28 16:09:09.039] abstract_locations=off
[2019-08-28 16:09:09.039] max_workers=16
[2019-08-28 16:09:09.064] Initializing Server (This might take some time)
[2019-08-28 16:09:09.065] executable=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow
[2019-08-28 16:09:09.065] version=0.106.2
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
</details>

<details>
<summary>Logs WITH saved state</summary>

```text
[2019-08-28 16:07:44.616] argv=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow start --saved-state-fetcher=local --saved-state-no-fallback
[2019-08-28 16:07:44.616] lazy_mode=off
[2019-08-28 16:07:44.616] arch=classic
[2019-08-28 16:07:44.616] abstract_locations=off
[2019-08-28 16:07:44.616] max_workers=16
[2019-08-28 16:07:44.641] Initializing Server (This might take some time)
[2019-08-28 16:07:44.641] executable=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow
[2019-08-28 16:07:44.641] version=0.106.2
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
</details>

You can see that there is already some improvement. It's very convenient to combine it with `--lazy` mode:

```text
💃 yarn flow start --saved-state-fetcher=local --saved-state-no-fallback --lazy
```

<details>
<summary>Logs WITH saved state and lazy mode</summary>

```text
[2019-08-28 16:11:47.493] argv=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow start --saved-state-fetcher=local --saved-state-no-fallback --lazy
[2019-08-28 16:11:47.493] lazy_mode=fs
[2019-08-28 16:11:47.493] arch=classic
[2019-08-28 16:11:47.493] abstract_locations=off
[2019-08-28 16:11:47.493] max_workers=16
[2019-08-28 16:11:47.516] Initializing Server (This might take some time)
[2019-08-28 16:11:47.516] executable=/Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/flow-bin/flow-osx-v0.106.2/flow
[2019-08-28 16:11:47.516] version=0.106.2
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
</details>

That's a huge improvement (from original cold start 17s to cold start 3s). Don't forget to refocus the lazy mode in case of Flow server already running:

```text
💃 flow force-recheck --focus --lazy --input-file=.flow.saved_state_file_changes
```

- https://github.com/facebook/flow/commit/a65982f3adccd7faab86d55871803a07b26f8394

# Trust mode

_TODO_

https://github.com/facebook/flow/commit/959b4bad08ebf9fb2c2d4446653b8192bd0eb7d8

# `[rollouts]` config

The optional rollout section has 0 or more lines. Each line defines a single rollout. For example:

```ini
[rollouts]

testA=40% on, 60% off
testB=50% blue, 20% yellow, 30% pink
```

The first line defines a rollout named "testA" with two groups. The second line defines a rollout named "testB" with three groups. Each rollout's groups must sum to 100. Some config examples (usages):

```ini
[rollouts]
verify_sig=0% on, 100% off

[options]
(verify_sig=on) experimental.well_formed_exports=true
```

See: https://github.com/facebook/flow/pull/8018/files

# Enums

```js
const Enum = Object.freeze({
  X: 'x',
  Y: 'y',
});

type EnumT = $Values<typeof Enum>;
('a': EnumT);
```

Results in:

```text
7: ('a': EnumT);
    ^ Cannot cast `'a'` to `EnumT` because string [1] is incompatible with enum [2].
   References:
   7: ('a': EnumT);
       ^ [1]
   7: ('a': EnumT);
            ^ [2]
```

See: https://github.com/facebook/flow/commit/7c3390f7dcf886b0b39acfa505446614641ecb92

Please note: this only works when you define the object with values inside `Object.freeze`. Similar but alternative approach: https://github.com/facebook/flow/issues/627#issuecomment-389668600

## Large unions (simple enums) performance

> I've been working on this recently so I can give you an overview. Essentially the reasons large unions are slow is that the amount of work Flow needs to do can grow exponentially with the size of the union. To determine if a union is a valid subtype of another type, we need to consider whether every single element of the union is a valid subtype, while to determine if it's a supertype we need to check if at least one of its cases is a supertype. If the union isn't actually a supertype we end up needing to check every case. Where this gets really bad is when we compare two union types, and this can easily result in an exponential case where we need to perform a lot of work for every single combination of union cases.

> Luckily we have a lot of optimizations in place for dealing with unions, especially those that can be simplified to enums (unions of strings or number literals). 450 variants is really not that large in the scheme of things; we deal with unions with upwards of 100,000 elements routinely. The only caution I would suggest is to make sure that you don't add non-literal types to your enum unions, because that will cause our optimizations to fail and leave you with the worst case peformance.

Thanks @sainati on Discord.

# Callable objects

```js
type MemoizedFactorial = {
  cache: {
    [number]: number,
  },
  [[call]](number): number,
}

const factorial: MemoizedFactorial = n => {
  if (!factorial.cache) {
    factorial.cache = {}
  }
  if (factorial.cache[n] !== undefined) {
    return factorial.cache[n]
  }
  factorial.cache[n] = n === 0 ? 1 : n * factorial(n - 1)
  return factorial.cache[n]
}
```

- https://github.com/facebook/flow/pull/7790/files
- https://github.com/niieani/typescript-vs-flowtype/pull/55/files
- https://github.com/facebook/flow/commit/954a72704a6338778c940239573045b28c716488
- https://github.com/facebook/flow/commit/732eae55e102cdb7dfa7b6a85f0147d48c3afed7

# `$Flow$DebugPrint`, `$Flow$DebugThrow`, `$Flow$DebugSleep`

Throw and sleep are not very useful in normal code. Throw kills Flow and sleep adds delay in seconds. More useful is debug print which prints debug information:

```js
// @flow strict
const x = 10;
declare var flowDebugPrint: $Flow$DebugPrint;
flowDebugPrint(x);
```

Output:

```text
💃 universe [master] y flow
yarn run v1.16.0
$ /Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/.bin/flow
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/test.js:4:1

{
  "reason":{
    "pos":{
      "source":"/Users/mrtnzlml/Work/kiwi-private/incubator/universe/src/test.js",
     
"type":"SourceFile",
      "start":{"line":4,"column":16},
      "end":{"line":4,"column":16}
    },
   
"desc":"number"
  },
  "kind":"NumT",
  "literal":"10"
}

     1│ // @flow strict
     2│ const x = 10;
     3│ declare var flowDebugPrint: $Flow$DebugPrint;
     4│ flowDebugPrint(x);
     5│



Found 1 error
```

# Interesting Flow commands

```text
y flow graph cycle src/incubator/graphql/src/public/FAQ/types/outputs/FAQArticle.js

# Outputs dependency graphs of flow repositories. Subcommands:
# cycle: Produces a graph of the dependency cycle containing the input file
# dep-graph: Produces the dependency graph of a repository
```

```text
y flow dump-types src/packages/relay/src/QueryRenderer.js
```

```text
y flow check --debug
```

```text
y flow check --profile
```

[source](https://stackoverflow.com/a/40569640/3135248)

# Exact Objects by Default

TODO

- https://medium.com/flow-type/on-the-roadmap-exact-objects-by-default-16b72933c5cf
- https://github.com/facebook/flow/commit/1ac913040f38309480934ccb6717a3ffc65094a8

# Private object properties

```js
class Thing {
  prop1: string;
  #prop2: string = 'I am private!';
}

(new Thing()).prop1;
(new Thing()).prop2; // <- ERROR
```

```
7: (new Thing()).prop2;
                 ^ Cannot get `new Thing().prop2` because property `prop2` is missing in `Thing` [1].
    References:
    7: (new Thing()).prop2;
        ^ [1]
```

- https://github.com/tc39/proposal-class-fields#private-fields

# Exhaustive checking with empty type

[flow.org/try](https://flow.org/try/#0C4TwDgpgBAwghgZwgqBeKByAghqAfTAIQwG4AoMgMwFcA7AY2AEsB7WqCADwAs5qFgACk4AuWImQBKKAG8yUKE0pRhaVOmwZpchQoD0eqABMWUAdUqV5UAL4cANkkXLV6jcW3X9hk8aWUIACcIWmAzYAsrBTsIR2gdXQMoNnsQKGBA6mglKAB3aF5aI3sIIyg4e3soegkELxVRDgBbMFBJcmiyGzIgA)

```js
type Cases = 'A' | 'B';

function exhaust(x: Cases) {
  if (x === 'A') {
    // do stuff
  } else if (x === 'B') {
    // do different stuff
  } else {
    // only true if we handled all cases
    (x: empty);
  }
}
```

- https://github.com/facebook/flow/commit/c603505583993aa953904005f91c350f4b65d6bd
- https://medium.com/@ibosz/advance-flow-type-1-exhaustive-checking-with-empty-type-a02e503cd3a0
- https://github.com/facebook/flow/pull/7655/files

# Predicate functions with `%checks`

`%checks` is an experimental predicate type. Check this code (no Flow errors):

```js
function isGreaterThan5(x: string | number) {    
  if (typeof x === 'string') {
    return parseInt(x) > 5;
  }
  return x > 5;
}
```

But you can slightly refactor it and you'll get unexpected errors:

```js
function isString(y) {
  return typeof y === 'string';
}

function isGreaterThan5(x: string | number) {
  if (isString(x)) {
    return parseInt(x) > 5;
  }
  return x > 5;
}
```

```
9:   return x > 5;
            ^ Cannot compare string [1] to number [2].
References:
5: function isGreaterThan5(x: string | number) {
                              ^ [1]
9:   return x > 5;
                ^ [2]
```

You have to fix it like this:

```js
function isString(y): %checks {
  return typeof y === 'string';
}
```

You can also declare the predicate like this:

```js
declare function isSchema(schema: mixed): boolean %checks(schema instanceof GraphQLSchema);
```

- https://flow.org/en/docs/types/functions/#toc-predicate-functions
- https://github.com/facebook/flow/issues/3048
- https://github.com/facebook/flow/issues/34

# Difference between `&` and `...`

It's easy to misunderstand the difference between intersection types (`A & B`) and spreading types (`{ ...A, b:boolean }`) in Flow.

```js
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

// Intersection types are the opposite of union types!
const a: A & B & C = {
  a: 1,
  b: true,
  c: 'ok'
}

const b: $Exact<A> | $Exact<B> | $Exact<C> = {
  a: 1,
//  b: true,
//  c: 'ok'
}

const c: {
  ...{ a: number, b: string },
  a: string
} = {
  a: '1', // only string, no number
  b: '2'
}

const d: {|
  ...{| a: number, b: string |},
  a: string
|} = {
  a: '1', // works the same with exact types
  b: '2'
}

// Impossible type:
// const e: {| a: number |} & {| a: string |} = {
//   a: ???,
// }
```

No errors!

- https://www.knyz.org/blog/post/flow-union-intersection-spead/

# `@flow` pragma consequences

1. `/*:: ... */` and `/*: ... */` comments have special meaning (https://flow.org/en/docs/types/comments/)
2. `a<b>(c)` becomes a type argument, rather than `((a < b) > c)`

https://github.com/facebook/flow/issues/7928#issuecomment-511428223

# Conditions in Flow using `$Call`

- https://gist.github.com/miyaokamarina/934887ac2aff863b9c73283acfb71cf0
- https://flow.org/en/docs/types/utilities/#toc-call
- https://github.com/niieani/typescript-vs-flowtype/issues/37

# Advanced debugging

`yarn flow` errors may be sometimes very cryptic:

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/apps/autobooking/queries/Autobooking.js:27:26

Cannot call await with context.dataLoaders.autobooking.getResult(...) bound to p because property autobooking is missing
in Promise [1].

     src/apps/autobooking/queries/Autobooking.js
     24│     { bid }: argsType,
     25│     context: GraphqlContextType
     26│   ): Promise<AutobookingType> => {
     27│     const result = await context.dataLoaders.autobooking.getResult(bid)
     28│     const { autobooking, status } = result
     29│
     30│     if (autobooking === null) {

     src/apps/autobooking/Datasource.js
 [1] 19│   ): Promise<{|
     20│     +autobooking: Autobooking | null,
     21│     +status: string
     22│   |}> {
```

It helps to inspect the whole stacktrace using `yarn flow --show-all-branches`:

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/apps/autobooking/queries/Autobooking.js:27:26

Cannot call await with context.dataLoaders.autobooking.getResult(...) bound to p because:
 • Either cannot return object literal because in property status of type argument R [1]:
    • Either string [2] is incompatible with string literal pending [3].
    • Or string [2] is incompatible with string literal check_failed [4].
    • Or string [2] is incompatible with string literal ready [5].
    • Or string [2] is incompatible with string literal started [6].
    • Or string [2] is incompatible with string literal too_expensive [7].
 • Or property autobooking is missing in Promise [8].

                 src/apps/autobooking/queries/Autobooking.js
                  24│     { bid }: argsType,
                  25│     context: GraphqlContextType
                  26│   ): Promise<AutobookingType> => {
                  27│     const result = await context.dataLoaders.autobooking.getResult(bid)
                  28│     const { autobooking, status } = result
                  29│
                  30│     if (autobooking === null) {

                 /private/tmp/flow/flowlib_2c621631/core.js
             [1] 583│ declare class Promise<+R> {

                 src/apps/autobooking/Datasource.js
             [8]  19│   ): Promise<{|
                  20│     +autobooking: Autobooking | null,
             [2]  21│     +status: string
                  22│   |}> {

                 src/apps/autobooking/apiTypes/Autobooking.js
 [3][4][5][6][7]   7│   status: 'pending' | 'check_failed' | 'ready' | 'started' | 'too_expensive'
```

You can eventually use `yarn flow check --traces 100`

# Common configuration issues

1. Accidentally disabled flow for ALL JavaScript files

```ini
module.file_ext=.json
# do not forget to define '.js' here as well otherwise you basically disabled Flow
```

See: https://flow.org/en/docs/config/options/#toc-module-file-ext-string

2. Inncorrectly used `resolve_dirname` instead of `name_mapper`

See: https://github.com/facebook/flow/pull/5850

# Fun with Flow

## `boolean` is incompatible with `true | false`

```js
declare function foo(true | false): void
declare function bar(): boolean

foo(bar())
```

```
4: foo(bar())
       ^ Cannot call `foo` with `bar()` bound to the first parameter because: Either boolean [1] is incompatible with boolean literal `true` [2]. Or boolean [1] is incompatible with boolean literal `false` [3].
References:
2: declare function bar(): boolean                           ^ [1]
1: declare function foo(true | false): void
                        ^ [2]
1: declare function foo(true | false): void
                               ^ [3]
```

https://github.com/facebook/flow/issues/4196

## `mixed` type cannot be exhaused

```js
function test(x: mixed) {
  if (typeof x === 'string') {
    return true;
  }
  x; // still 'mixed' according to type-at-pos 🤔
}
```

[flow.org/try](https://flow.org/try/#0GYVwdgxgLglg9mABFApgZygCgB4C5EC2M2KAJgJSIDeAUIojMIplAJ4AOKcT2iAvAMQByDACcYYAOZDKtevVEooIUUiiiQKANx1EAX13YtiAPQnEGGABsrwoiVJDEAQwgQ4o0hMnI4yDigAtM5QgexwaIiAfBuAKLs0BkA)

One solution is to manually define your custom mixed type which [can be exhausted](https://flow.org/try/#0PTAEAEDMBsHsHcBQiAuBPADgU1AWTbgJYAeWAJqALyiKigA+oAbrIRbQ6AHYCu00NOo14BbAEZYAToM4BnFJMJcA5jMZjYsaFgCGXNaADeAOlMBfAwEFJknWgA8+IqTIA+AwApTxnZOWyALjwCEnIAbQBdAEoqdydQsg46GgBjWC55UBxqDx0g+UUVABpmIPiXGMp3QzNkLA8AcgaSgEYoxHqmktz8hSVlErEg0QlJSuqzKKA).

## Possibly undefined array elements

None of the typing systems can handle this correctly, all show no error during static analysis (but could be runtime error).

Flow ([pr](https://github.com/facebook/flow/pull/6823)):

```js
let a = [1,2,3]
let b: number = a[10] // undefined
let c = b * 2
```

Typescript ([issue](https://github.com/Microsoft/TypeScript/issues/13778)):

```js
let a = [1, 2, 3];
let b: number = a[10] // undefined
let c = b * 2
```

Reason:

```re
let a: array(int) = [|1, 2, 3|];
let b: int = a[10]  // undefined
let c = b * 2
```

# Flow shenanigans

```js
const [w, a, t] = {p: ''}; // no error
```

[flow.org/try](https://flow.org/try/#0MYewdgzgLgBA2gdwDQwIYqgXRgXhgbwAcAuGAcjIF8BuIA)

On the other hand, TS is OK with this code (while Flow throws an error correctly):

```js
const foo: {} = '';
```

https://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBAZiEAuGBvAvjAvDA5LgbiA

# Typescript shenanigans

Typescript types are exact by default but only on declaration. This means it [won't catch](https://typescript-play.js.org/#code/C4TwDgpgBAqgzhATlAvFA3gKClArgxAOwEMBbCALijmEQEtCBzAGmyglOLoBsqb6mmAL6ZMAYwD2hGngIBGKvCSoMbAHQb0spCXJUA5AA99UIcyjrN7TjwMgTZy2q2HXdh6xwhv78zgD0-lAAPKFQUtwgUMAAFnRwUABmXNxwwqKS0sDaiABMigQqWDgazjm6lFBGHhYlVhwp7qaeUKUublX2zelAA) cases like this:

```ts
type User = {
  username: string,
  email: string
}

const user1: User = {
  ...{ username: 'x' }, 
  ...{ email: 'y' },
  ...{ xxx: 'y' },
  yyy: 'y',   // <<< only this fails
}

const user2: User = {
  ...{ username: 'x' }, 
  ...{ email: 'y' },
  ...{ xxx: 'y' },
}
```

Flow doesn't have exact types by default (yet) but it can [handle these cases better](https://flow.org/try/#0C4TwDgpgBAqgzhATlAvFA3gHwFBSgVwUQDsBDAWwgC4o5hEBLYgcwBpcoJzSGAbGuoxbZMAX2zYAxgHtidAkQCMNeElQYOAOm3oFSMpRoByAB5Goo1lC07O3PsZDnLNzbpMfHz9nhB+vVngA9EFQADwRULK8IFDAABYMcFAAZjy8cNjiUrLyhEgATCpE6uiuuvkkFNRQpt7WeNpuduleFj5QTe6etU7tWdhAA):

```js
type User = {|
  username: string,
  email: string
|}

const user1: User = {
  ...{ username: 'x' }, 
  ...{ email: 'y' },
  ...{ xxx: 'y' },   // <<< this fails
  yyy: 'y',   // <<< this fails
}

const user2: User = {
  ...{ username: 'x' }, 
  ...{ email: 'y' },
  ...{ xxx: 'y' },   // <<< this fails
}
```

```text
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/test.js:8:21

Cannot assign object literal to user1 because:
 • property xxx is missing in User [1] but exists in object literal [2].
 • property yyy is missing in User [1] but exists in object literal [2].

         5│   email: string,
         6│ |};
         7│
 [1][2]  8│ const user1: User = {
         9│   ...{ username: 'x' },
        10│   ...{ email: 'y' },
        11│   ...{ xxx: 'y' },
        12│   yyy: 'y', // <<< only this fails
        13│ };
        14│
        15│ const user2: User = {
        16│   ...{ username: 'x' },


Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/test.js:15:21

Cannot assign object literal to user2 because property xxx is missing in User [1] but exists in object literal [2].

        12│   yyy: 'y', // <<< only this fails
        13│ };
        14│
 [1][2] 15│ const user2: User = {
        16│   ...{ username: 'x' },
        17│   ...{ email: 'y' },
        18│   ...{ xxx: 'y' },
        19│ };
        20│



Found 3 errors
```
