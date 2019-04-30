# Unreleased
- Babel Relay preset is now part of this package. Removed from `@kiwicom/babel-preset-kiwicom`. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@kiwicom/babel-preset-kiwicom', 'next/babel'],
  plugins: ['relay'],
};
```

# 2.0.0
- Upgraded to Relay version 4.0.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0). Our previous versions 1.x disallowed some deprecated usages of Relay so this upgrade should be relatively straightforward. Check new testing tools in this release - especially `MockPayloadGenerator` and `RelayMockEnvironment`.

# 1.2.0
- Network fetcher now accepts optional `refetchConfig` to be able to adjust `fetchTimeout` and `retryDelays` (see for more details: https://github.com/kiwicom/fetch)

# 1.1.0
- `Disposable` Flow type exposed publicly
- `Environment` (incomplete) Flow type exposed publicly
