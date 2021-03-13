// @flow strict

import fs from 'fs';
import SignedSource from '@adeira/signed-source';
import { Source } from 'graphql';

/**
 * Returns extended GraphQL schema from the path. It optionally checks whether the schema is signed
 * via `@adeira/signed-source` and validates the signature if yes.
 */
export default function getSchemaSource(schemaPath: string): Source {
  let source = fs.readFileSync(schemaPath, 'utf8');

  if (SignedSource.isSigned(source)) {
    if (!SignedSource.verifySignature(source)) {
      throw new Error(
        `Schema '${schemaPath}' has invalid signature! Did you do some manual changes? You can download a fresh schema using 'adeira-fetch-schema' script.`,
      );
    }
  }

  source = `
  directive @include(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT
  directive @skip(if: Boolean) on FRAGMENT_SPREAD | FIELD | INLINE_FRAGMENT

  ${source}
  `;

  return new Source(source, schemaPath);
}
