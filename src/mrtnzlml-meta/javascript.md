- http://exploringjs.com/es6/
- https://ponyfoo.com/articles/es6
- https://developer.mozilla.org/en-US/docs/Web
- https://github.com/jamiebuilds/itsy-bitsy-data-structures/blob/master/itsy-bitsy-data-structures.js
- https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js

# Jest: test.concurrent( ... )

TODO: https://github.com/facebook/jest/pull/1688/files

# Clearing/resetting/restoring Jest mocks

I am never gonna remember this correctly I guess.

- `jest.clearAllMocks()` only clears the internal state of the mock
- `jest.resetAllMocks()` does the same + it removes any mocked implementations or return values
- `jest.restoreAllMocks()` does everything above but it restores the original non-mocked implementation (and works only with `jest.spyOn`)

https://github.com/facebook/jest/issues/5143

# Optional chaining & nullish coalescing

- https://github.com/tc39/proposal-optional-chaining
- https://github.com/tc39/proposal-nullish-coalescing

This replaces [IDX](https://github.com/facebookincubator/idx). First set flow (`.flowconfig`):

```
[options]
esproposal.optional_chaining=enable
esproposal.nullish_coalescing=enable

[lints]
unnecessary-optional-chain=error
```

See: https://flow.org/en/docs/linting/rule-reference/#toc-unnecessary-optional-chain

Add these two Babel plugins and you should be good to go:

- [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [@babel/plugin-proposal-nullish-coalescing-operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)

Note: this is still experimental feature and can be completely removed.

# isObject()

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

# Is this string/number a number?

TL;DR - do not use only `isNaN` for this and write a lot of tests.

Facebook [implementation](https://github.com/facebook/fbjs/blob/cfd39964ba4b9ce351c314ed512e654ffa9cad26/packages/fbjs/src/useragent/VersionRange.js#L210-L218):

```js
/**
 * Determines if `number` is a number.
 *
 * @param {mixed} number
 * @returns {boolean}
 */
function isNumber(number) {
  return !isNaN(number) && isFinite(number);
}
```

StackOverflow [implementation](https://stackoverflow.com/a/1830844/3135248):

```js
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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

# Dangerous getters

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
