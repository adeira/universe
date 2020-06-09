// @flow strict

const path = require('path');

const readFileSync = require('../readFileSync');

/*::

import type { EslintRule } from './EslintRule.flow';

*/

function isRelayImport(node) {
  return /\/__generated__\/.*\.graphql/.test(node.source.value);
}

function extractTypes(source) {
  const regExp = /export(?:\s+opaque)?\s+type\s+(?<typeName>[^\s=]+)\s*[=:]/gm;
  const types = [];
  let match;
  while ((match = regExp.exec(source))) {
    types.push(match[1]);
  }
  return types.reverse();
}

module.exports = ({
  meta: {
    docs: {},
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration: (node) => {
        if (!isRelayImport(node)) {
          return;
        }
        const generatedFileName = path.join(
          path.dirname(context.getFilename()),
          node.source.value.endsWith('.js') ? node.source.value : `${node.source.value}.js`,
        );
        let generatedSource = '';
        try {
          generatedSource = readFileSync(generatedFileName, {
            encoding: 'utf-8',
          });
        } catch (error) {
          context.report(node.source, "Can't read the file");
          return;
        }
        const types = extractTypes(generatedSource);
        node.specifiers.forEach((specifier) => {
          if (node.importKind !== 'type' && specifier.importKind !== 'type') {
            return;
          }
          if (!types.includes(specifier.imported.name)) {
            context.report(
              specifier.imported,
              `"${
                specifier.imported.name
              }" is not exported from the generated file (exported types: ${types.join(', ')})`,
            );
          }
        });
      },
    };
  },
} /*: EslintRule  */);
