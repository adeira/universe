// @flow strict

import fs from 'fs';
import SignedSource from '@adeira/signed-source';
import { Source } from 'graphql';

export default function getSchemaSource(schemaPath: string): Source {
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

  return new Source(source, schemaPath);
}
