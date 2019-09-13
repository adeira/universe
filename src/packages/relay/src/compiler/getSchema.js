// @flow strict

import fs from 'fs';
import SignedSource from '@kiwicom/signed-source';
import { buildASTSchema, parse } from 'graphql';

export default function getSchema(schemaPath: string) {
  let source = fs.readFileSync(schemaPath, 'utf8');

  if (!SignedSource.isSigned(source)) {
    throw new Error(
      `Schema '${schemaPath}' cannot be verified because it's missing a valid signature! Download a fresh schema using 'kiwicom-fetch-schema' script.`,
    );
  }

  if (!SignedSource.verifySignature(source)) {
    throw new Error(
      `Schema '${schemaPath}' has invalid signature! Did you do some manual changes? Download a fresh schema using 'kiwicom-fetch-schema' script.`,
    );
  }

  source = `
  directive @include(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT
  directive @skip(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT

  ${source}
  `;

  try {
    return buildASTSchema(parse(source), { assumeValid: true });
  } catch (error) {
    throw new Error(
      `
Error loading schema. Expected the schema to be a .graphql file, describing your GraphQL server's API. Error detail:

${error.stack}
    `.trim(),
    );
  }
}
