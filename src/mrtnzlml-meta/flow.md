https://github.com/facebook/flow/blob/master/Changelog.md

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
