# Unreleased

# 2.1.1

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

- Dependency requirements were updated.
- Minor internal changes.

# 2.1.0

- Added a new function `rangeMap` which helps with creating an array of elements with predefined length.

# 2.0.0

Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588

# 1.3.0

- TS types removed, use [`@types/adeira__js`](https://www.npmjs.com/package/@types/adeira__js), see: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/48501
- Internal changes, `@babel/runtime` dependency bump

# 1.2.4

- Extend `isObjectEmpty` to check for non-enumerable properties

# 1.2.0

- New basic TS types for `isBrowser`, `isNumeric`, `isObject`, `isObjectEmpty` and `sprintf`.

# 1.1.0

- New basic TS types for `invariant`, `warning` and `nullthrows`.
