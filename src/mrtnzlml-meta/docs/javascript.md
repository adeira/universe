---
id: javascript
title: JavaScript
sidebar_label: JavaScript
---

- https://justjavascript.com/
- http://exploringjs.com/es6/
- https://ponyfoo.com/articles/es6
- https://developer.mozilla.org/en-US/docs/Web
- https://github.com/jamiebuilds/itsy-bitsy-data-structures/blob/master/itsy-bitsy-data-structures.js
- https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js
- https://github.com/ehmicky/cross-platform-node-guide, https://shapeshed.com/writing-cross-platform-node/
- https://github.com/leebyron/spec-md/blob/f1392942b69fb7868baf64129f615f97739d9058/static/linkSelections.js
- [Computing average in a constant time](https://stackoverflow.com/a/22999488/3135248) (average streaming)
- [connect.js explained](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e)
- [slim-redux.js](https://gist.github.com/gaearon/ffd88b0e4f00b22c3159)
- https://github.com/gaearon/suspense-experimental-github-demo
- https://github.com/relayjs/relay-examples/blob/4fe8cbf44e03d50972b1ff4da4b9c205e0525d47/issue-tracker/src/JSResource.js

## V8 Built-in functions

- https://v8.dev/docs/builtin-functions
- https://github.com/v8/v8/blob/master/src/runtime/runtime.h
- https://v8.dev/docs/memory-leaks

```js
function foo() {
  const x = { bar: 'bar' };
  %DebugTrackRetainingPath(x);
  return () => {
    return x;
  };
}
const closure = foo();
gc();
```

vvv

```text
💃 universe [master] node --allow-natives-syntax --track-retaining-path --expose-gc src/test.js

#################################################
Retaining path for 0x33a90e9bcb89:

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Distance from root 3: 0x33a90e9bcb89 <Object map = 0x33a9d65bbf09>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Distance from root 2: 0x33a90e9bcb51 <FunctionContext[5]>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Distance from root 1: 0x33a90e9bcc09 <JSFunction (sfi = 0x33a99d8d7a89)>

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Root: (Isolate)
-------------------------------------------------
```

## Yarn comments in `package.json`

```json
{
  "private": true,
  "devDependencies": {
    "//": [
      "Please note: `react` dependency here is necessary in order to solve hoisting issues",
      "with React Native (Expo) and their locked React version. Yarn hoisted wrong version.",
      "It can eventually be removed (try Relay and RN-Expo examples to verify it works)."
    ],
    "flow-bin": "^0.95.1",
    "react": "^16.8.6"
  }
}
```

https://github.com/yarnpkg/yarn/pull/3829/files (also great example of `test.concurrent` usage ^^)

## Clearing/resetting/restoring Jest mocks

I am never gonna remember this correctly I guess.

- `jest.clearAllMocks()` only clears the internal state of the mock
- `jest.resetAllMocks()` does the same + it removes any mocked implementations or return values
- `jest.restoreAllMocks()` does everything above but it restores the original non-mocked implementation (and works only with `jest.spyOn`)

https://github.com/facebook/jest/issues/5143

## isObject()

```js
function isObject(value): boolean %checks {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
```

Jest [implementation](https://github.com/facebook/jest/blob/d7ca8b23acf2fdd1d070496efb2b2709644a6f4f/packages/jest-snapshot/src/utils.js#L79-L81):

```js
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}
```

## Is this thing a number?

TL;DR - do not use only `isNaN` for this and write a lot of tests.

StackOverflow [implementation](https://stackoverflow.com/a/1830844/3135248) (so far ✅):

```js
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

Facebook [implementation](https://github.com/facebook/fbjs/blob/cfd39964ba4b9ce351c314ed512e654ffa9cad26/packages/fbjs/src/useragent/VersionRange.js#L210-L218) (❌ fails for many values like `null`, booleans, Date object, empty strings, ...):

```js
function isNumber(number) {
  return !isNaN(number) && isFinite(number);
}
```

@cookielab implementation (❌ fails for values like `7.2acdgs` and it's not multiplatform):

```js
function isNumeric(n) {
  return Number.isFinite(Number.parseFloat(n));
}
```

Please note that `isNaN` and `Number.isNaN` [differs significantly](https://stackoverflow.com/a/25176685/3135248) (`isNaN` performs a type conversion). The same for `isFinite` vs `Number.isFinite`:

> In comparison to the global `isFinite()` function, this method doesn't forcibly convert the parameter to a number. This means only values of the type number, that are also finite, return `true`.

See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite

```js
Number.isFinite('0'); // false, would've been true with global isFinite('0')
Number.isFinite(null); // false, would've been true with global isFinite(null)
```

Polyfill (to understand the difference better):

```js
Number.isFinite =
  Number.isFinite ||
  function (value) {
    return typeof value === 'number' && isFinite(value);
  };
```
