/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = {
  meta: {
    fixable: true,
    docs: {},
    schema: [],
  },

  create(context) {
    return {
      Identifier(node) {
        const match = node.name.match(/^React\$(?<internalTypeName>.+)/);
        if (match !== null) {
          const validName = `React.${match.groups.internalTypeName}`;
          context.report({
            node,
            message:
              "Type identifier '{{invalidName}}' is not allowed. Use '{{validName}}' instead.",
            data: {
              invalidName: node.name,
              validName,
            },
            fix(fixer) {
              return fixer.replaceText(node, validName);
            },
          });
        }
      },
    };
  },
};
