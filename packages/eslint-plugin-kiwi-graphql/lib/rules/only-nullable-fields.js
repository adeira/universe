// @flow

/*::
type Node = {|
  +key: {|
    +name: string,
  |},
  +callee: {|
    +name: string,
  |},
|};

type Context = {|
  +report: (Node, string) => void,
|};
*/

module.exports = {
  meta: {
    docs: {
      description: 'Disallows GraphQLNonNull type.',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [], // no options
  },

  create: function(context /*: Context */) {
    /**
     * Whether should be this rule completely ignored.
     *
     * Type `GraphQLNonNull` is prohibited except these situations:
     *  - inside of `GraphQLInputObjectType`
     *  - in query or types arguments (`args` property)
     */
    let ignoreRule = false;

    return {
      Property: (node /*: Node */) => {
        if (node.key && node.key.name === 'args') {
          ignoreRule = true;
        }
      },
      'Property:exit': (node /*: Node */) => {
        if (node.key && node.key.name === 'args') {
          ignoreRule = false;
        }
      },

      NewExpression: function(node /*: Node */) {
        if (node.callee.name === 'GraphQLInputObjectType') {
          ignoreRule = true;
        }

        // disallow GraphQLNonNull
        if (ignoreRule === false && node.callee.name === 'GraphQLNonNull') {
          context.report(node, 'Avoid using GraphQLNonNull.');
        }
      },
      'NewExpression:exit': function(node /*: Node */) {
        if (node.callee.name === 'GraphQLInputObjectType') {
          ignoreRule = false;
        }
      },
    };
  },
};
