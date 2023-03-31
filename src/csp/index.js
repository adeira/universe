// @flow strict

/*::

type Sources = string | $ReadOnlyArray<string>;
type Policy = {
  +'default-src': Sources,
  // Optional:
  +'base-uri'?: Sources,
  +'child-src'?: Sources,
  +'connect-src'?: Sources,
  +'font-src'?: Sources,
  +'form-action'?: Sources,
  +'frame-ancestors'?: Sources,
  +'frame-src'?: Sources,
  +'img-src'?: Sources,
  +'manifest-src'?: Sources,
  +'media-src'?: Sources,
  +'object-src'?: Sources,
  +'prefetch-src'?: Sources,
  +'report-uri'?: Sources,
  +'script-src'?: Sources,
  +'script-src-attr'?: Sources,
  +'script-src-elem'?: Sources,
  +'style-src'?: Sources,
  +'style-src-attr'?: Sources,
  +'style-src-elem'?: Sources,
  +'worker-src'?: Sources,
};

*/

// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources#sources
function quoteSource(source /*: Sources */) /*: string */ {
  const sourcesRequiringQuotes = [
    // TODO: nonce, hash-algorithm
    'self',
    'unsafe-eval',
    'wasm-unsafe-eval',
    'unsafe-hashes',
    'unsafe-inline',
    'none',
    'strict-dynamic',
    'report-sample',
  ];

  if (Array.isArray(source)) {
    return source.map(quoteSource).join(' ');
  }

  if (sourcesRequiringQuotes.includes(source)) {
    return `'${source}'`;
  }
  return source;
}

// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
module.exports = function createContentSecurityPolicy(
  { policy, reportOnly } /*: { +policy: Policy, +reportOnly?: boolean } */,
) /*: { +key: string, +value: string } */ {
  const isReportOnly = reportOnly === true;

  if (isReportOnly && policy['report-uri'] == null) {
    throw new Error("Content-Security-Policy-Report-Only requires 'report-uri' to be set");
  }

  const policyString = Object.keys(policy)
    .map((key /*: string */) => `${key} ${quoteSource(policy[key])}`)
    .join('; ');

  return {
    key: `Content-Security-Policy${isReportOnly ? '-Report-Only' : ''}`,
    value: policyString,
  };
};
