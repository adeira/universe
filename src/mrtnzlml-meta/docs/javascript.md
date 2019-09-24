---
id: javascript
title: JavaScript
sidebar_label: JavaScript
---

- http://exploringjs.com/es6/
- https://ponyfoo.com/articles/es6
- https://developer.mozilla.org/en-US/docs/Web
- https://github.com/jamiebuilds/itsy-bitsy-data-structures/blob/master/itsy-bitsy-data-structures.js
- https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js

## Beyond console.log()

https://medium.com/@mattburgess/beyond-console-log-2400fdf4a9d8

- `console.log/warn/error` with `%s`, `%o` and `%c`
- `console.dir`
- `console.table`
- `console.assert`
- `console.count/countReset`
- `console.trace`
- `console.time/timeEnd`
- `console.group/groupCollapsed/groupEnd`

## Optional chaining gotchas

```js
(function() {
  'use strict';
  undeclared_var?.b; // ReferenceError: undeclared_var is not defined
  arguments?.callee; // TypeError: 'callee' may not be accessed in strict mode
})();
```

- https://v8.dev/features/optional-chaining
- https://github.com/tc39/proposal-optional-chaining/commit/87e408d375bd749b21d70e65bd0cbbf57d9bcf82

## Node.js LTS or not?

> Node LTS is primarily aimed at enterprise use where there may be more resistance to frequent updates, extensive procurement procedures and lengthy test and quality requirements.

> Generally if you are able to keep up with the latest stable and future Node releases you should do so. These are stable and _production ready_ releases with excellent community support. Unstable and experimental functionality is kept behind build and runtime flags and should not affect your day to day operations.

https://stackoverflow.com/a/34655149/3135248

## Does it mutate 😱

- https://doesitmutate.xyz/
- https://stackoverflow.com/a/9009934/3135248

## Jest: test.concurrent( ... )

TODO: https://github.com/facebook/jest/pull/1688/files

## V8 Built-in functions

- https://v8.dev/docs/builtin-functions
- https://github.com/v8/v8/blob/master/src/runtime/runtime.h
- https://v8.dev/docs/memory-leaks

```js
function foo() {
  const x = { bar: 'bar' };
  %DebugTrackRetainingPath(x);
  return () => { return x; }
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
    "react": "^16.8.6",
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

## Splitting string

```js
"I 💖 U".split(' ');   // ✅: [ 'I', '💖', 'U' ]
"I💖U".split('');      // ❌: [ 'I', '�', '�', 'U' ]
```

Better alternatives:

```js
[..."I💖U"]
Array.from("I💖U")
"I💖U".split(/(?=[\s\S])/u)
```

More info: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), [stackoverflow.com](https://stackoverflow.com/a/34717402/3135248)

Please note - it's still a bit more complicated. Read this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split#Reversing_a_String_using_split()

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
Number.isFinite('0');       // false, would've been true with
                            // global isFinite('0')
Number.isFinite(null);      // false, would've been true with
                            // global isFinite(null)
```

Polyfill (to understand the difference better):

```js
Number.isFinite = Number.isFinite || function(value) {
    return typeof value === 'number' && isFinite(value);
}
```

## Dangerous getters

```js
// @flow

type x = {
  +address: ?{|
    +fullAddress: ?string,
  |},
};

class WTF {
  _address = {
    fullAddress: 'yay',
  };

  get address() {
    const addr = this._address;
    this._address = null;
    return addr;
  }
}

const y = new WTF();

// this is going to explode:
console.warn(
  y.address?.fullAddress && y.address.fullAddress,
);

// here is why:
// console.warn(
//   y.address,
//   y.address,
// );
```

source: https://github.com/facebook/flow/issues/5479#issuecomment-349749477

Unfortunatelly, Flow cannot uncover this version (which can also explode):

```js
{y.address && y.address.fullAddress && <Text>{y.address.fullAddress}</Text>}
```

## Dependency injection

- https://adonisjs.com/docs/4.1/ioc-container
- http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript
- https://github.com/gedbac/di4js
- https://medium.com/@maciekprzybylski/dependency-injection-in-javascript-74f8791ba7c8
- https://www.yusufaytas.com/dependency-injection-in-javascript/
- https://github.com/inversify/InversifyJS/

## Fun with JavaScript

Sleep sort:

```js
[3, 5, 1, 8, 2, 4, 9, 6, 7].forEach(num =>
  setTimeout(() => console.log(num), num),
);
```

https://twitter.com/JavaScriptDaily/status/856267407106682880
