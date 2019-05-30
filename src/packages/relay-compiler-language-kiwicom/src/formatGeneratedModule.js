// @flow

/*::

type FormatModuleInput = $ReadOnly<{|
  documentType: $FlowFixMe,
  concreteText: string,
  typeText: string,
  sourceHash: string,
  docText?: string,
  hash?: string,
  devOnlyAssignments?: string,
|}>;

*/

module.exports = function formatGeneratedModule(
  {
    documentType,
    docText,
    concreteText,
    typeText,
    hash,
    sourceHash,
    devOnlyAssignments,
  } /*: FormatModuleInput */,
) {
  const documentTypeImport = documentType
    ? `import type { ${documentType} } from 'relay-runtime';`
    : '';
  const docTextComment = docText ? '\n/*\n' + docText.trim() + '\n*/\n' : '';
  const hashText = hash ? `\n * ${hash}` : '';
  const devOnlyAddons = devOnlyAssignments
    ? `\nif (__DEV__) {\n  ${devOnlyAssignments}\n}`
    : '';

  return `/**
 * ${'@'}flow${hashText}
 */

/* eslint-disable */

'use strict';

/*::
${documentTypeImport}
${typeText || ''}
*/

${docTextComment}
const node/*: ${documentType || 'empty'}*/ = ${concreteText};
// prettier-ignore
(node/*: any*/).hash = '${sourceHash}';${devOnlyAddons}
module.exports = node;
`;
};
