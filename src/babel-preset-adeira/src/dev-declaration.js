/* eslint-disable ft-flow/require-valid-file-annotation,ft-flow/no-types-missing-file-annotation */

module.exports = function (babel) {
  const t = babel.types;

  const DEV_IDENTIFIER = t.identifier('__DEV__');
  DEV_IDENTIFIER.typeAnnotation = t.typeAnnotation(t.booleanTypeAnnotation());
  const DEV_DECLARATION = t.declareVariable(DEV_IDENTIFIER);

  // https://github.com/babel/babel/blob/0a69b45126c8d5128bd7e0e196efbb370d8c8cda/packages/babel-plugin-transform-flow-strip-types/src/index.js#L8
  const FLOW_DIRECTIVE = /(?:@flow(?:\s+(?:strict(?:-local)?|weak))?|@noflow)/;

  return {
    pre() {
      this.usesDEV = false;
    },

    visitor: {
      Identifier: {
        enter(path) {
          this.usesDEV = this.usesDEV || path.isIdentifier({ name: '__DEV__' });
        },
      },
      Program: {
        exit(
          path,
          {
            file: {
              ast: { comments },
            },
          },
        ) {
          if (!this.usesDEV) {
            return;
          }

          let originalCommentValue = '@flow';

          // We expect that comments are always present in the code since
          // there should always be a flow annotation in the code and this
          // transformer is only for 'flow' target.
          for (const comment of (comments: Array<{
            [key: string]: any,
            ...
          }>)) {
            if (FLOW_DIRECTIVE.test(comment.value)) {
              originalCommentValue = comment.value.trim();
              comment.value = comment.value.replace(FLOW_DIRECTIVE, '');
              if (!comment.value.replace(/\*/g, '').trim()) {
                comment.ignore = true;
              }
            }
          }

          // Flow annotation must always be first in the file:
          // https://flow.org/en/docs/usage/#toc-prepare-your-code-for-flow
          path.addComment('leading', originalCommentValue);

          // Add the declaration at the front of the body if we've used __DEV__.
          path.node.body.unshift(DEV_DECLARATION);
        },
      },
    },
  };
};
