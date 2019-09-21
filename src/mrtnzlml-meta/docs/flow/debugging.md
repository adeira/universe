---
id: debugging
title: Debugging
sidebar_label: Debugging
---

## `$Flow$DebugPrint`, `$Flow$DebugThrow`, `$Flow$DebugSleep`

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

## Advanced debugging

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
