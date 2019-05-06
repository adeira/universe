# Unreleased
- Experimental Flow support for operation loader (needed for `@match` and `@module`).

# 2.1.0
- Babel Relay preset is now part of this package. Removed from `@kiwicom/babel-preset-kiwicom` in version 3.0.0. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@kiwicom/babel-preset-kiwicom', 'next/babel'],
  plugins: ['relay'],
};
```

# 2.0.0
- Upgraded to Relay version 4.0.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0). Our previous versions 1.x disallowed some deprecated usages of Relay so this upgrade should be relatively straightforward. Check new testing tools in this release - especially `MockPayloadGenerator` and `RelayMockEnvironment`. There is also an improved support for `@match`/`@module` directives (available from `@kiwicom/relay` version 1.0) which works well with `@kiwicom/babel-preset-kiwicom` from version 3.0. Please give it a try and give us your feedback.

# 1.2.0
- Network fetcher now accepts optional `refetchConfig` to be able to adjust `fetchTimeout` and `retryDelays` (see for more details: https://github.com/kiwicom/fetch)

# 1.1.0
- `Disposable` Flow type exposed publicly
- `Environment` (incomplete) Flow type exposed publicly
