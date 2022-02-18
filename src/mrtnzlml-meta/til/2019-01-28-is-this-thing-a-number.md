---
title: Is this thing a number?
tags: ['javascript']
---

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
