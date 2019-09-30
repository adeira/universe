---
id: unsealed-objects
title: Unsealed objects
sidebar_label: Unsealed objects
---

Tl;dr: they can be tricky.

- docs: https://flow.org/en/docs/types/objects/#toc-unsealed-objects
- issues to study: https://github.com/facebook/flow/labels/unsealed%20objects

Unsealed objects are a special case in Flow. They allow you to create an empty object to be able to add properties later (see the docs). There are some special properties worth mentioning:

1. reading unknown property from unsealed objects is unsafe

```js
const obj = {};

obj.foo = 1;
obj.bar = true;

const foo: number = obj.foo; // Works!
const bar: boolean = obj.bar; // Works!
const baz: string = obj.baz; // Works? (reads from unsealed objects with no matching writes are never checked)

const fail: string = obj.foo; // Errors correctly.
```

2. you cannot assign unsealed object to the exact type

```js
type Foo = {| a?: string, b?: string |};

const foo1: Foo = { a: '' }; // works as expected
const foo2: Foo = {}; // doesn't work, but should (?)
const foo3: Foo = { ...null }; // this is equivalent to {} but is not an unsealed object (it's sealed)
const foo4: Foo = Object.freeze({}); // alternatively, seal the object manually
```

- https://github.com/facebook/flow/issues/7566#issuecomment-526534111
- https://github.com/facebook/flow/issues/2977#issuecomment-390827317

## Gotchas

```js
const a: { foo: string } = {}; // No error?! ❌
const b: { foo: string } = { ...null }; // Error ✅

const x: {} = ''; // Error ✅
```

```js
type Record = {
  foo: number,
  bar: string,
};

const x: Record = {}; // No error?! ❌
```

https://github.com/facebook/flow/issues/8091

There is also a know bug with unsealed objects vs. optional chaining lint:

```js
// @flow strict

type State = {|
  base?: {|
    data: {|
      a: string,
    |},
  |},
|};

const getBase = (state: State) => state.base ?? {};

// Fixed version:
// const getBase = (state: State) => state.base ?? { data: undefined };

export const getA = (state: State) => getBase(state).data?.a;
```

This core results incorrectly in:

```text
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/optional-chain-flow.js:16:39

This use of optional chaining (?.) is unnecessary because getBase(...).data [1] cannot be nullish or because an earlier
?. will short-circuit the nullish case. (unnecessary-optional-chain)

     13│ // Fixed version:
     14│ // const getBase = (state: State) => state.base ?? { data: undefined };
     15│
 [1] 16│ export const getA = (state: State) => getBase(state).data?.a;
     17│

Found 1 error
```

See: https://github.com/facebook/flow/issues/8065

## Note on `Object` type

This is most probably not really about sealed types but it feels somehow related.

This is fine:

```js
const test: { a: string } = {};
const x = test.a; // ✅
test.a = '2'; // ✅
```

But you cannot read/write from an empty `Object` type

```js
const test: {} = {};
const x = test.a; // ❌
test.a = 2; // ❌
```

Previously, `Object` type was internally defined like `{ [key: string]: any }` which implies what you can do with it:

```js
const test: { [key: string]: any } = {};
const x = test.a; // ✅
test.a = '2'; // ✅
```

```js
const test: { [key: string]: any } = {};
const x = test.a; // ✅
test.a = 2; // ✅
```
