---
id: flow
title: All-in
sidebar_label: All-in
---

- **https://flow.org/en/docs/faq/**
- https://github.com/facebook/flow/wiki
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

## Force type casting

You may find yourself in a situation where you want to force cast some type despite it's originally defined differently. Example:

```js
type StringOrNumber = string | number;
const foo: StringOrNumber = 'hello';

const bar1: string = foo; // cannot assign `foo` to `bar` because number is incompatible with string
const bar2: string = (foo: string); // cannot cast `foo` to string because number is incompatible with string
```

Both errors are correct and valid. The solution is to cast the type via `any` like this:

```js
const bar: string = (foo: any);
```

> So you cast `foo` to an `any` because `any` accepts any type of value as an input. Then because the `any` type also allows you to read all possible types from it, you can assign the `any` value to `bar` because an `any` is also a string.

This obviously means that you are going against the type system and you might be doing something wrong. Did you want to use conditional refinement instead?

```js
type StringOrNumber = string | number;
const foo: StringOrNumber = 'hello';

if (typeof foo === 'string') {
  const bar: string = foo; // no errors!
}
```

> It's important to note that both suppression comments and cast-through any are **unsafe**. They override Flow completely, and will happily perform completely nonsensical "casts". To avoid this, use refinements that Flow understands whenever you can, and avoid use of the other, unsafe "casting" techniques.

Source: https://stackoverflow.com/questions/41328728/how-can-flow-be-forced-to-cast-a-value-to-another-type/45068255

## Oncalls in Facebook (Flow related)

> so the way it works is that the Flow team has a rotating oncall. it's relatively calm as oncalls go (we aren't getting woken up in the middle of the night), but whoever is oncall is responsible for doing support (we have an internal group where people can ask questions), and also responsible for taking the lead if something goes wrong with Flow or the various related integrations we have. near the beginning of the year we also made it so that the oncall is responsible for addressing libdef and documentation PRs, since there is usually no clear owner for those, and pretty much anyone should be able to review them

(source Discord)

## Sound vs. complete

> A sound type system (or analysis) is one that rejects all erroneous programs, and a complete system accepts all correct programs.

> A sound type system is one that is not lenient, in that it rejects all invalid programs plus some number of valid programs. A complete type system accepts all valid programs, and some invalid ones to boot. Which to pick?

- https://eschew.wordpress.com/2009/08/31/sound-and-complete/
- https://stackoverflow.com/a/21437375/3135248

Please note: not everything can be expressed/modeled in your type system so you have to take into account also dynamic errors (division by zero or integer overflow) when writing your program.

> Programmers dislike having the computer reject a program that would have run fine, simply because the computer couldn’t make sure it would run fine without actually running it. In short, restrictive type systems drive programmers to more flexible environments.

## Contributing to native libdevs

First, you have to build Flow locally (check official README for updated instructions: https://github.com/facebook/flow):

```text
brew install opam                       # http://opam.ocaml.org/
opam init
opam switch create . --deps-only -y     # install OCaml and Flow's dependencies
eval $(opam env)                        # probably not necessary, read `opam init` step
make
```

Now, you can start making changes to libdevs:

```text
make
bash ./runtests.sh -t node_tests bin/flow
bash ./runtests.sh -t node_tests -r bin/flow
```

Please note (I didn't try it yet though):

> `make build-flow-debug` should be faster for local development

Now, you can use this new binary from source in your application to test new features. Just use newly built `bin/flow` instead of Flow binary from NPM like so:

```text
/Users/TKTK/flow/bin/flow status <ROOT>
```

## Trust mode

_TODO_

- https://github.com/facebook/flow/commit/959b4bad08ebf9fb2c2d4446653b8192bd0eb7d8
- https://github.com/facebook/flow/commit/fa0a8ef899925ed2b0939cb03678eceec821f5d0

## Enums

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

See:

- https://github.com/facebook/flow/commit/7c3390f7dcf886b0b39acfa505446614641ecb92
- https://github.com/facebook/flow/blob/369e1f93dde1ddafec7c5539a20e7b061672da6c/tests/values/object_types.js

Please note: this only works when you define the object with values inside `Object.freeze`. Similar but alternative approach: https://github.com/facebook/flow/issues/627#issuecomment-389668600

### Large unions (simple enums) performance

> I've been working on this recently so I can give you an overview. Essentially the reasons large unions are slow is that the amount of work Flow needs to do can grow exponentially with the size of the union. To determine if a union is a valid subtype of another type, we need to consider whether every single element of the union is a valid subtype, while to determine if it's a supertype we need to check if at least one of its cases is a supertype. If the union isn't actually a supertype we end up needing to check every case. Where this gets really bad is when we compare two union types, and this can easily result in an exponential case where we need to perform a lot of work for every single combination of union cases.

> Luckily we have a lot of optimizations in place for dealing with unions, especially those that can be simplified to enums (unions of strings or number literals). 450 variants is really not that large in the scheme of things; we deal with unions with upwards of 100,000 elements routinely. The only caution I would suggest is to make sure that you don't add non-literal types to your enum unions, because that will cause our optimizations to fail and leave you with the worst case peformance.

Thanks @sainati on Discord.

## Callable objects

```js
type MemoizedFactorial = {
  cache: {
    [number]: number,
  },
  [[call]](number): number,
};

const factorial: MemoizedFactorial = n => {
  if (!factorial.cache) {
    factorial.cache = {};
  }
  if (factorial.cache[n] !== undefined) {
    return factorial.cache[n];
  }
  factorial.cache[n] = n === 0 ? 1 : n * factorial(n - 1);
  return factorial.cache[n];
};
```

- https://github.com/facebook/flow/pull/7790/files
- https://github.com/niieani/typescript-vs-flowtype/pull/55/files
- https://github.com/facebook/flow/commit/954a72704a6338778c940239573045b28c716488
- https://github.com/facebook/flow/commit/732eae55e102cdb7dfa7b6a85f0147d48c3afed7

## Interesting Flow commands

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

## Exact Objects by Default

TODO

- https://medium.com/flow-type/on-the-roadmap-exact-objects-by-default-16b72933c5cf
- https://github.com/facebook/flow/commit/1ac913040f38309480934ccb6717a3ffc65094a8

## Private object properties

```js
class Thing {
  prop1: string;
  #prop2: string = 'I am private!';
}

new Thing().prop1;
new Thing().prop2; // <- ERROR
```

```
7: (new Thing()).prop2;
                 ^ Cannot get `new Thing().prop2` because property `prop2` is missing in `Thing` [1].
    References:
    7: (new Thing()).prop2;
        ^ [1]
```

- https://github.com/tc39/proposal-class-fields#private-fields

## Predicate functions with `%checks`

`%checks` is an experimental predicate type. Check this code (no Flow errors):

```js
function isGreaterThan5(x: string | number): boolean {
  if (typeof x === 'string') {
    return parseInt(x) > 5;
  }
  return x > 5;
}
```

But you can slightly refactor it and you'll get unexpected errors:

```js
function isString(y): boolean {
  return typeof y === 'string';
}

function isGreaterThan5(x: string | number): boolean {
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

This is because the refinement information of `y` as `string` instead of `string | number` is lost when returning from the `isString` function. You have to fix it like this:

```js
function isString(y): boolean %checks {
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

## Object indexer properties

```js
const o: { [string]: number, ... } = {};
o['foo'] = 0;
o['bar'] = 1;
o[42] = 2; // Error!
const foo: number = o['foo'];
```

> When an object type has an indexer property, property accesses are assumed to have the annotated type, even if the object does not have a value in that slot at runtime. It is the programmer’s responsibility to ensure the access is safe, as with arrays.

This is similar to the issue with [possibly undefined array elements](#possibly-undefined-array-elements):

```js
const obj: { [number]: string, ... } = {};
obj[42].length; // No type error, but will throw at runtime!
```

Indexer properties can be also mixed with normal properties:

```js
const obj: {
  size: number,
  [id: number]: string,
  ...
} = {
  size: 0,
};

function add(id: number, name: string) {
  obj[id] = name;
  obj.size++;
}
```

Please note: indexer property doesn't make any sense on exact objects:

```js
type S = {| [key: string]: string |};
const s: S = { key: 'value' }; // cannot assign object literal to `s` because property `key` is missing in `S`
```

This is not a bug - it simply doesn't make any sense with exact objects. It could be eventually repurposed though, see: https://github.com/facebook/flow/issues/7862

## Difference between `&` and `...`

It's easy to misunderstand the difference between intersection types (`A & B`) and spreading types (`{ ...A, b:boolean }`) in Flow.

```js
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

// Intersection types are the opposite of union types!
const a: A & B & C = {
  a: 1,
  b: true,
  c: 'ok',
};

const b: $Exact<A> | $Exact<B> | $Exact<C> = {
  a: 1,
  //  b: true,
  //  c: 'ok'
};

const c: {
  ...{ a: number, b: string },
  a: string,
} = {
  a: '1', // only string, no number
  b: '2',
};

const d: {|
  ...{| a: number, b: string |},
  a: string,
|} = {
  a: '1', // works the same with exact types
  b: '2',
};

// Impossible type:
// const e: {| a: number |} & {| a: string |} = {
//   a: ???,
// }
```

No errors!

- https://www.knyz.org/blog/post/flow-union-intersection-spead/

## `@flow` pragma consequences

1. `/*:: ... */` and `/*: ... */` comments have special meaning (https://flow.org/en/docs/types/comments/)
2. `a<b>(c)` becomes a type argument, rather than `((a < b) > c)`

https://github.com/facebook/flow/issues/7928#issuecomment-511428223

## Conditions in Flow using `$Call`

- https://gist.github.com/miyaokamarina/934887ac2aff863b9c73283acfb71cf0
- https://flow.org/en/docs/types/utilities/#toc-call
- https://github.com/niieani/typescript-vs-flowtype/issues/37

## Fun with Flow

### `boolean` is incompatible with `true | false`

```js
declare function foo(true | false): void;
declare function bar(): boolean;

foo(bar());
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

### `mixed` type cannot be exhausted

```js
declare var flowDebugPrint: $Flow$DebugPrint;

function test(x: mixed) {
  if (typeof x === 'string') {
    return true;
  }
  flowDebugPrint(x); // still 'mixed', see the output 🤔
}
```

[flow.org/try](https://flow.org/try/#0CYUwxgNghgTiAEA3W8BmED2B3AIiARgK4DmACjAJYB2ALgFzwAkAYplo3kWZbQNwBQ-VISpgaFDFXg0QAZxoAKAB4MAthSUhgASngBvfvHgVU8BTQCeABxAZTS+AF5n8AOTyexV7oNGjcGkIYKRoYQhABIwBfQzQ2ThJyakUlbV54AHoM+HkKCAg3dU1gVwAaHJAEGgALBAxCGisG+EA+DcAUXf4YoA)

Debug output:

```json
{
  "reason": {
    "pos": {
      "source": "-",
      "type": "SourceFile",
      "start": { "line": 7, "column": 18 },
      "end": { "line": 7, "column": 18 }
    },
    "desc": "mixed"
  },
  "kind": "MixedT"
}
```

One solution is to manually define your custom mixed type which [can be exhausted](https://flow.org/try/#0PTAEAEDMBsHsHcBQiAuBPADgU1AWTbgJYAeWAJqALyiKigA+oAbrIRbQ6AHYCu00NOo14BbAEZYAToM4BnFJMJcA5jMZjYsaFgCGXNaADeAOlMBfAwEFJknWgA8+IqTIA+AwApTxnZOWyALjwCEnIAbQBdAEoqdydQsg46GgBjWC55UBxqDx0g+UUVABpmIPiXGMp3QzNkLA8AcgaSgEYoxHqmktz8hSVlErEg0QlJSuqzKKA).

### Possibly undefined array elements

None of the typing systems can handle this correctly, all show no error during static analysis (but could be runtime error).

Flow ([pr](https://github.com/facebook/flow/pull/6823)):

```js
let a = [1, 2, 3];
let b: number = a[10]; // undefined
let c = b * 2;
```

Typescript ([issue](https://github.com/Microsoft/TypeScript/issues/13778)):

```js
let a = [1, 2, 3];
let b: number = a[10]; // undefined
let c = b * 2;
```

Reason:

```re
let a: array(int) = [|1, 2, 3|];
let b: int = a[10]  // undefined
let c = b * 2
```

## Flow shenanigans

```js
const [w, a, t] = { p: '' }; // no error
```

[flow.org/try](https://flow.org/try/#0MYewdgzgLgBA2gdwDQwIYqgXRgXhgbwAcAuGAcjIF8BuIA)

On the other hand, TS is OK with this code (while Flow throws an error correctly):

```js
const foo: {} = '';
```

https://www.typescriptlang.org/play/index.html#code/MYewdgzgLgBAZiEAuGBvAvjAvDA5LgbiA

## Typescript shenanigans

Typescript types are exact by default but only on declaration. This means it [won't catch](https://typescript-play.js.org/#code/C4TwDgpgBAqgzhATlAvFA3gKClArgxAOwEMBbCALijmEQEtCBzAGmyglOLoBsqb6mmAL6ZMAYwD2hGngIBGKvCSoMbAHQb0spCXJUA5AA99UIcyjrN7TjwMgTZy2q2HXdh6xwhv78zgD0-lAAPKFQUtwgUMAAFnRwUABmXNxwwqKS0sDaiABMigQqWDgazjm6lFBGHhYlVhwp7qaeUKUublX2zelAA) cases like this:

```ts
type User = {
  username: string;
  email: string;
};

const user1: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' },
  yyy: 'y', // <<< only this fails
};

const user2: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' },
};
```

Flow doesn't have exact types by default (yet) but it can [handle these cases better](https://flow.org/try/#0C4TwDgpgBAqgzhATlAvFA3gHwFBSgVwUQDsBDAWwgC4o5hEBLYgcwBpcoJzSGAbGuoxbZMAX2zYAxgHtidAkQCMNeElQYOAOm3oFSMpRoByAB5Goo1lC07O3PsZDnLNzbpMfHz9nhB+vVngA9EFQADwRULK8IFDAABYMcFAAZjy8cNjiUrLyhEgATCpE6uiuuvkkFNRQpt7WeNpuduleFj5QTe6etU7tWdhAA):

```js
type User = {|
  username: string,
  email: string,
|};

const user1: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' }, // <<< this fails
  yyy: 'y', // <<< this fails
};

const user2: User = {
  ...{ username: 'x' },
  ...{ email: 'y' },
  ...{ xxx: 'y' }, // <<< this fails
};
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
