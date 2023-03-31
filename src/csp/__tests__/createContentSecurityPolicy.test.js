// @flow strict

const createContentSecurityPolicy = require('../index');

it("throws if 'reportOnly' is true but 'report-uri' is not set", () => {
  expect(() =>
    createContentSecurityPolicy({
      policy: { 'default-src': 'self' },
      reportOnly: true,
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Content-Security-Policy-Report-Only requires 'report-uri' to be set"`,
  );
});

it('correctly creates default CSP header', () => {
  expect(
    createContentSecurityPolicy({
      policy: { 'default-src': 'self' },
    }),
  ).toMatchInlineSnapshot(`
    {
      "key": "Content-Security-Policy",
      "value": "default-src 'self'",
    }
  `);
});

it('correctly creates report only default CSP header', () => {
  expect(
    createContentSecurityPolicy({
      policy: {
        'default-src': 'self',
        'report-uri': 'https://ingest.sentry.io/api/123',
      },
      reportOnly: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "key": "Content-Security-Policy-Report-Only",
      "value": "default-src 'self'; report-uri https://ingest.sentry.io/api/123",
    }
  `);
});

it('correctly creates CSP header with multiple directives', () => {
  expect(
    createContentSecurityPolicy({
      policy: {
        'default-src': 'self',
        'script-src': 'self',
        'style-src': 'self',
      },
    }),
  ).toMatchInlineSnapshot(`
    {
      "key": "Content-Security-Policy",
      "value": "default-src 'self'; script-src 'self'; style-src 'self'",
    }
  `);
});

it('correctly creates CSP header with multiple directives and report only', () => {
  expect(
    createContentSecurityPolicy({
      policy: {
        'default-src': 'self',
        'script-src': 'self',
        'style-src': 'self',
        'report-uri': 'https://ingest.sentry.io/api/123',
      },
      reportOnly: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "key": "Content-Security-Policy-Report-Only",
      "value": "default-src 'self'; script-src 'self'; style-src 'self'; report-uri https://ingest.sentry.io/api/123",
    }
  `);
});

it('correctly quotes the sources', () => {
  expect(
    createContentSecurityPolicy({
      policy: {
        'default-src': 'self',
        'script-src': ['self', 'unsafe-inline'],
        'style-src': ['self', 'unsafe-inline'],
      },
    }),
  ).toMatchInlineSnapshot(`
    {
      "key": "Content-Security-Policy",
      "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
    }
  `);
});

it('correctly quotes the sources with report only', () => {
  expect(
    createContentSecurityPolicy({
      policy: {
        'default-src': 'self',
        'script-src': ['self', 'unsafe-inline'],
        'style-src': ['self', 'unsafe-inline'],
        'report-uri': 'https://ingest.sentry.io/api/123',
      },
      reportOnly: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "key": "Content-Security-Policy-Report-Only",
      "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; report-uri https://ingest.sentry.io/api/123",
    }
  `);
});
