# Unreleased

# 0.4.0

Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

# 0.1.4.0

- BC checker now uses signed-source dependency directly

# 0.1.3.0

- BC checker now prints info about dangerous (but not breaking) changes

# 0.1.2.0

- GraphQL schema is now sorted lexicographically

# 0.1.1.0

- Output messages are now more helpful and tested
