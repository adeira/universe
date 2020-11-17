// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../flow-use-readonly-spread');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('flow-use-readonly-spread', rule, {
  valid: [
    `
    type Identifier = $ReadOnly<{|
      ...INode,
      +name: string,
    |}>;
`,
    `
    type Identifier = $ReadOnly<{|
      ...INode,
      -name: string,
    |}>;
`,
    `
    type Identifier = $ReadOnly<{|
      ...INode,
      name: string,
    |}>;
`,
    `
    type Identifier = {|
      ...INode,
      name: string,
    |};
`,
    `
    type Identifier = {|
      ...INode,
      name: string,
      +surname: string,
    |};
`,
    `
    type Identifier = {|
      +name: string,
    |};
`,
  ],

  invalid: [
    {
      code: `
        type Identifier = {|
          ...INode,
          +aaa: string,
        |};
      `,
      errors: [{ messageId: 'readonlySpread' }],
    },
    {
      code: `
        type Identifier = {|
          ...INode,
          +aaa: string,
          +bbb: string,
        |};
      `,
      errors: [{ messageId: 'readonlySpread' }],
    },
  ],
});
