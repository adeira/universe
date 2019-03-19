// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../only-nullable-fields');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

const errors = ['Avoid using GraphQLNonNull.'];

ruleTester.run('only-nullable-fields', rule, {
  valid: [
    '({ fields: { id: { type: GraphQLID } } })',
    '({ fields: { list: { type: new GraphQLList(GraphQLBaggage) } } })',
    'new GraphQLInputObjectType({ fields: { from: { type: GraphQLNonNull(GraphQLString) } } })',
    'new GraphQLInputObjectType({ fields: { from: { type: new GraphQLNonNull(GraphQLString) } } })',
    '({ args: { term: { type: GraphQLNonNull(GraphQLString) } } })',
    '({ args: { term: { type: new GraphQLNonNull(GraphQLString) } } })',
    '({ fields: {} })',
    '({})',
    '({ ...{} })',
  ],

  invalid: [
    {
      code: '({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } })',
      errors,
    },
    {
      code: '({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLNonNull(GraphQLList(GraphQLBaggage)) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLNonNull(new GraphQLList(GraphQLBaggage)) } } })',
      errors,
    },
    {
      code:
        'new GraphQLInputObjectType({ fields: { from: { type: new GraphQLNonNull(GraphQLString) } } });' + // this is fine
        'var b = { fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }', // this is not
      errors,
    },
    {
      code:
        'export default { type: new GraphQLList(new GraphQLNonNull(GraphQLBooking)) };',
      errors,
    },
    {
      code:
        'export default {' +
        '  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLPlace))),' +
        '  args: { search: { type: GraphQLString } }' +
        '}',
      errors: ['Avoid using GraphQLNonNull.', 'Avoid using GraphQLNonNull.'],
    },
  ],
});
