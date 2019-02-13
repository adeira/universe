// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../no-invalid-flow-annotations');

const ruleTester = new RuleTester();

ruleTester.run('only-nullable-fields', rule, {
  valid: [
    '/* @flow */',
    '/* @flow strict */',
    '/* @flow strict-local */',
    '// @flow',
    '// @flow strict',
    '// @flow strict-local',
  ],

  invalid: [
    {
      code: '/* @noflow */',
      errors: ['Do not disable Flow type checker, use @flow instead.'],
    },
    {
      code: '// @noflow',
      errors: ['Do not disable Flow type checker, use @flow instead.'],
    },
    {
      code: '/* @flow weak */',
      errors: ['Weak mode in Flow is not allowed, use @flow instead.'],
    },
    {
      code: '// @flow weak',
      errors: ['Weak mode in Flow is not allowed, use @flow instead.'],
    },
  ],
});
