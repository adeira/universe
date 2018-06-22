'use strict';

const rule = require('../../../lib/rules/only-nullable-fields');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
});

const NewExpressionError = {
  message: 'Avoid using GraphQLNonNull.',
  type: 'NewExpression',
};

ruleTester.run('only-nullable-fields', rule, {
  valid: [
    '({ fields: { id: { type: GraphQLID } } })',
    '({ fields: { list: { type: new GraphQLList(GraphQLBaggage) } } })',
    'new GraphQLInputObjectType({ fields: { from: { type: new GraphQLNonNull(GraphQLString) } } })',
    '({ args: { term: { type: new GraphQLNonNull(GraphQLString) } } })',
    '({ fields: {} })',
    '({})',
    '({ ...{} })',
  ],

  invalid: [
    {
      code: '({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } })',
      errors: [NewExpressionError],
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLNonNull(new GraphQLList(GraphQLBaggage)) } } })',
      errors: [NewExpressionError],
    },
    {
      code:
        'new GraphQLInputObjectType({ fields: { from: { type: new GraphQLNonNull(GraphQLString) } } });' + // this is fine
        'var b = { fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }', // this is not
      errors: [
        Object.assign({}, NewExpressionError, {
          line: 1,
          column: 127,
        }),
      ],
    },
    {
      code:
        'export default { type: new GraphQLList(new GraphQLNonNull(GraphQLBooking)) };',
      errors: [NewExpressionError],
    },
    {
      code:
        'export default {' +
        '  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLPlace))),' +
        '  args: { search: { type: GraphQLString } }' +
        '}',
      errors: [NewExpressionError, NewExpressionError],
    },
  ],
});
