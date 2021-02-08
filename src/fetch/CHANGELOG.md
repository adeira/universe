# Unreleased

# 2.0.0

Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588

# 1.0.4

- internal stylistic changes, dependencies bump, documentation updates

# 1.0.3

- `@babel/runtime` added into dependencies

# 1.0.1

- UserAgent header on server changed to `@adeira/fetch (+https://github.com/adeira/universe; %s)`

# 0.2.5.0

- HTTP status code 422 (Unprocessable entity) is now considered to be non-transient (no retries)

# 0.2.4.0

- `@kiwicom/fetch` now overwrites default User-Agent string with our custom value so you can easily identify it.

# 0.2.3.0

- HTTP status code 429 (Too Many Requests) is now considered to be non-transient (no retries)
- Cross-fetch ponyfill upgraded to the latest version (https://github.com/lquixada/cross-fetch/releases/tag/v3.0.1)

# 0.2.2.0

- Flow types are now strict about inputs values

# 0.2.1.0

- HTTP status code 400 is now considered to be non-transient (no retries)

# 0.2.0.0

- Upgrade dependencies, check this for breaking changes: https://github.com/github/fetch/releases/tag/v3.0.0
