// @flow

module.exports = {
  meta: {
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
    fixable: 'code',
    messages: {
      sortImportsAlphabetically:
        "Import '{{firstUnsortedImport}}' should be before '{{beforeFirstUnsortedImport}}'.",
      sortTypeImportsAlphabetically:
        "Import 'type {{firstUnsortedImport}}' should be before 'type {{beforeFirstUnsortedImport}}'.",
    },
  },

  create(context /*: $FlowFixMe */) /*: $FlowFixMe */ {
    const sourceCode = context.getSourceCode();

    const fixImportSpecifiers = (fixer, importSpecifiers) => {
      if (
        importSpecifiers.some(
          (specifier) =>
            sourceCode.getCommentsBefore(specifier).length ||
            sourceCode.getCommentsAfter(specifier).length,
        )
      ) {
        // If there are comments in the ImportSpecifier list, don't rearrange the specifiers.
        return null;
      }

      return fixer.replaceTextRange(
        [importSpecifiers[0].range[0], importSpecifiers[importSpecifiers.length - 1].range[1]],
        importSpecifiers
          .slice() // clone the `importSpecifiers` array to avoid mutating it
          .sort((specifierA, specifierB) => {
            // sort the array into the desired order
            return specifierA.imported.name.toLowerCase() > specifierB.imported.name.toLowerCase()
              ? 1
              : -1;
          })
          .reduce((sourceText, specifier, index) => {
            // build a string out of the sorted list of import specifiers and the text
            // between the originals
            const textAfterSpecifier =
              index === importSpecifiers.length - 1
                ? ''
                : sourceCode
                    .getText()
                    .slice(importSpecifiers[index].range[1], importSpecifiers[index + 1].range[0]);
            return sourceText + sourceCode.getText(specifier) + textAfterSpecifier;
          }, ''),
      );
    };

    return {
      ImportDeclaration(node) {
        const importSpecifiers = node.specifiers.filter(
          (specifier) => specifier.type === 'ImportSpecifier' && specifier.importKind == null,
        );
        const importTypeSpecifiers = node.specifiers.filter(
          (specifier) => specifier.type === 'ImportSpecifier' && specifier.importKind === 'type',
        );

        const firstUnsortedIndex = importSpecifiers
          .map((specifier) => specifier.imported.name.toLowerCase())
          .findIndex((name, index, array) => array[index - 1] > name);
        const firstTypeUnsortedIndex = importTypeSpecifiers
          .map((specifier) => specifier.imported.name.toLowerCase())
          .findIndex((name, index, array) => array[index - 1] > name);

        if (firstUnsortedIndex !== -1) {
          context.report({
            node: importSpecifiers[firstUnsortedIndex],
            messageId: 'sortImportsAlphabetically',
            data: {
              firstUnsortedImport: importSpecifiers[firstUnsortedIndex].imported.name,
              beforeFirstUnsortedImport: importSpecifiers[firstUnsortedIndex - 1].imported.name,
            },
            fix(fixer) {
              return fixImportSpecifiers(fixer, importSpecifiers);
            },
          });
        }

        if (firstTypeUnsortedIndex !== -1) {
          context.report({
            node: importTypeSpecifiers[firstTypeUnsortedIndex],
            messageId: 'sortTypeImportsAlphabetically',
            data: {
              firstUnsortedImport: importTypeSpecifiers[firstTypeUnsortedIndex].imported.name,
              beforeFirstUnsortedImport:
                importTypeSpecifiers[firstTypeUnsortedIndex - 1].imported.name,
            },
            fix(fixer) {
              return fixImportSpecifiers(fixer, importTypeSpecifiers);
            },
          });
        }
      },
    };
  },
};
