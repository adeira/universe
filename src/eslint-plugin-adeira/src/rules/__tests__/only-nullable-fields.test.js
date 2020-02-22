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
    '({ fields: { list: { type: GraphQLList(GraphQLBaggage) } } })',
    '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLBaggage)) } } })',
    '({ fields: { list: { type: GraphQLList(GraphQLNonNull(GraphQLBaggage)) } } })',
    '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(GraphQLBaggage)) } } })',
    '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(GraphQLBaggage)) } } })',
    '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) } } }))) } } })',
    '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) } } }))) }, list2: GraphQLList(GraphQLNonNull(GraphQLString)) } })',
    'new GraphQLInputObjectType({ fields: { from: { type: GraphQLString } } })',
    'new GraphQLInputObjectType({ fields: { from: { type: GraphQLNonNull(GraphQLString) } } })',
    'new GraphQLInputObjectType({ fields: { from: { type: new GraphQLNonNull(GraphQLString) } } })',
    'new GraphQLInputObjectType({ fields: { list: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) }, list2: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) } } })',
    'new GraphQLInputObjectType({ fields: { list: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))) }, list2: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))) } } })',
    '({ args: { term: { type: GraphQLString } } })',
    '({ args: { term: { type: GraphQLNonNull(GraphQLString) } } })',
    '({ args: { term: { type: new GraphQLNonNull(GraphQLString) } } })',
    '({ args: { list: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) }, list2: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) } } })',
    '({ args: { list: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))) }, list2: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))) } } })',
    '({ fields: {} })',
    '({})',
    '({ ...{} })',
    `
      new GraphQLInputObjectType({
        name: 'Response',
        fields: {
          user: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'User',
                fields: {
                  fullName: { type: new GraphQLNonNull(GraphQLString) },
                },
              }),
            ),
          },
          message: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: 'SendCustomerServiceMailMessage',
                fields: {
                  language: { type: new GraphQLNonNull(GraphQLString) },
                },
              }),
            ),
          },
        },
      });
    `,
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
      code: '({ fields: { list: { type: GraphQLNonNull(GraphQLList(GraphQLBaggage)) } } })',
      errors,
    },
    {
      code: '({ fields: { list: { type: new GraphQLNonNull(new GraphQLList(GraphQLBaggage)) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(new GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: new GraphQLList(GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(new GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: new GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLInterfaceType({ fields: { id: { type: GraphQLNonNull(GraphQLID) } } }))) } } })',
      errors,
    },
    {
      code:
        '({ fields: { list: { type: GraphQLList(GraphQLNonNull(new GraphQLObjectType({ fields: { list: { type: new GraphQLList(GraphQLNonNull(GraphQLID)) } } }))) }, list2: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))) } })',
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
        'export default {' +
        '  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLPlace))),' +
        '  args: { search: { type: GraphQLString } }' +
        '}',
      errors,
    },
  ],
});
