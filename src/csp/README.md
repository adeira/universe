Utility to help you construct CSP headers.

Usage:

```js
const createContentSecurityPolicy = require('@adeira/csp');

const { key: cspKey, value: cspValue } = createContentSecurityPolicy({
  policy: {
    'default-src': 'self',
    'connect-src': 'https://example.com/graphql',
    'font-src': 'https://rsms.me/inter/font-files/',
    'style-src-elem': 'https://rsms.me/inter/inter.css',
    'report-uri': 'https://ingest.sentry.io/api/XYZ',
  },
  reportOnly: true,
});

// TODO: use the `cspKey` and `cspValue`
```
