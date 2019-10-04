// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../no-internal-flow-type');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('no-internal-flow-type', rule, {
  valid: [
    'type X = React.ComponentType<any>',
    'type X = React.Node',
    'type X = React.Element<React.ElementType>',
    'type X = React.ChildrenArray<string>',
    'type X = React.Key',
    'type X = React.Ref<typeof Component>',
  ],

  invalid: [
    {
      code: 'type X = React$ComponentType<any>',
      errors: [
        "Type identifier 'React$ComponentType' is not allowed. Use 'React.ComponentType' instead.",
      ],
    },
    {
      code: 'type X = React$Node',
      errors: ["Type identifier 'React$Node' is not allowed. Use 'React.Node' instead."],
    },
    {
      code: 'type X = React$Element<React$ElementType>',
      errors: [
        "Type identifier 'React$Element' is not allowed. Use 'React.Element' instead.",
        "Type identifier 'React$ElementType' is not allowed. Use 'React.ElementType' instead.",
      ],
    },
    {
      code: 'type X = React$ChildrenArray<string>',
      errors: [
        "Type identifier 'React$ChildrenArray' is not allowed. Use 'React.ChildrenArray' instead.",
      ],
    },
    {
      code: 'type X = React$Key',
      errors: ["Type identifier 'React$Key' is not allowed. Use 'React.Key' instead."],
    },
    {
      code: 'type X = React$Ref<typeof Component>',
      errors: ["Type identifier 'React$Ref' is not allowed. Use 'React.Ref' instead."],
    },
  ],
});
