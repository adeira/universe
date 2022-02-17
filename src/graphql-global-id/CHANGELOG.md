# Unreleased

# 2.1.0

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

- GraphQL peer dependency extended to v15 and v16

# 2.0.1

- Upgrade of peer dependencies

# 2.0.0

Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588

# 1.2.0

- TS types removed, use [`@types/adeira__graphql-global-id`](https://www.npmjs.com/package/@types/adeira__graphql-global-id), see: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/48922
- Internal changes, dependency upgrades

# 1.1.0

- export Encoder

# 1.0.0

- removed deprecated functions `DEPRECATED_evaluateGlobalIdField` and `__isTypeOf`

# 0.8.0

- rename `evaluateGlobalIdField` to `DEPRECATED_evaluateGlobalIdField` (will be removed in next major version)
- rename `__isTypeOf` to `isTypeOf` (old version will be removed in the next major version)
