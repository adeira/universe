/* eslint-disable flowtype/require-valid-file-annotation */

// We enumerate here all the React components Flow patches internally. It's because we don't want
// to fail on otherwise valid type names (but rather take the actual implementation into account).
// Both approaches have some disadvantages - this one can get outdated but it's otherwise accurate.
// See: https://github.com/facebook/flow/blob/53d85a11bcee948ed66282e6b1521d9608063b4d/src/services/type_info/insert_type_utils.ml#L171
const ReactComponents = [
  'AbstractComponent',
  'ChildrenArray',
  'ComponentType',
  'Config',
  'Context',
  'Element',
  'ElementConfig',
  'ElementProps',
  'ElementRef',
  'ElementType',
  'Key',
  'Node',
  'Portal',
  'Ref',
  'StatelessFunctionalComponent',
];

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
          const { internalTypeName } = match.groups;
          if (ReactComponents.includes(internalTypeName)) {
            const validName = `React.${internalTypeName}`;
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
        }
      },
    };
  },
};
