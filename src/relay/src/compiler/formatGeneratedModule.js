// @flow strict

type FormatModuleInput = $ReadOnly<{
  documentType: $FlowFixMe,
  concreteText: string,
  typeText: string,
  sourceHash: string,
  devOnlyAssignments?: string,
  docText?: string,
  hash?: string,
}>;

export default function formatGeneratedModule({
  documentType,
  docText,
  concreteText,
  typeText,
  hash,
  sourceHash,
  devOnlyAssignments,
}: FormatModuleInput): string {
  const documentTypeImport = documentType
    ? `import type { ${documentType} } from 'relay-runtime';`
    : '';
  const docTextComment = docText != null ? `/*\n${docText.trim()}\n*/\n` : '';
  const hashText = hash != null ? `\n * ${hash}` : '';

  // See: https://github.com/facebook/relay/issues/2799
  const devOnlyAddons =
    devOnlyAssignments != null
      ? `\ndeclare var __DEV__: boolean;\nif (__DEV__) {\n  ${devOnlyAssignments}\n}`
      : '';

  // TODO: we should probably export the actual types from `@adeira/relay` rather than using the `flowlint:off` comment.
  return `/**
 * @flow${hashText}
 */

/* eslint-disable */

${documentTypeImport}
${typeText || ''}

${docTextComment}
const node: ${documentType ?? 'empty'} = ${concreteText};
// prettier-ignore
(node: any).hash = '${sourceHash}';${devOnlyAddons}
export default node;
`;
}
