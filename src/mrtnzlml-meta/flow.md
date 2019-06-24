- **https://flow.org/en/docs/faq/**
- https://github.com/wgao19/flow-notes
- https://github.com/facebook/flow/blob/master/Changelog.md
- https://github.com/niieani/typescript-vs-flowtype

# Contributing to native libdevs

https://github.com/facebook/flow#building-flow

```
make
bash runtests.sh -t node_tests bin/flow
bash runtests.sh -t node_tests -r bin/flow
```

# Saved state

_TODO_

https://github.com/facebook/flow/commit/a65982f3adccd7faab86d55871803a07b26f8394

# Trust mode

_TODO_

https://github.com/facebook/flow/commit/959b4bad08ebf9fb2c2d4446653b8192bd0eb7d8

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

# Interesting Flow commands

```text
💃 universe [master] y flow graph --help                                                                                               
yarn run v1.16.0
$ /Users/mrtnzlml/Work/kiwi-private/incubator/universe/node_modules/.bin/flow graph --help
Usage: flow graph SUBCOMMAND [OPTIONS]...
Outputs dependency graphs of flow repositories

SUBCOMMANDS:
cycle: Produces a graph of the dependency cycle containing the input file
dep-graph: Produces the dependency graph of a repository
```

```text
y flow dump-types src/apps/graphql/src/index.js
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
