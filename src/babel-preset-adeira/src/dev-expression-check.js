/* eslint-disable ft-flow/require-valid-file-annotation */

// This check cannot be part of the 'dev-expression' plugin because we don't run it for Flow target.
// This check however runs everywhere
module.exports = function () {
  return {
    visitor: {
      VariableDeclaration(path) {
        const declarations = path.get('declarations');
        for (const declaration of declarations) {
          if (declaration.node.id.name === '__DEV__') {
            throw new Error(
              `You are trying to re-declare __DEV__ virtual constant but that's illegal. This constant is being defined by our Babel preset.`,
            );
          }
        }
      },
    },
  };
};
