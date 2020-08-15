// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../no-invalid-flow-annotations');

const ruleTester = new RuleTester();

ruleTester.run('no-invalid-flow-annotations', rule, {
  valid: [
    '/* @flow */',
    '/* @flow strict */',
    '/* @flow strict-local */',
    '// @flow',
    '// @flow strict',
    '// @flow strict-local',
    `// @flow
    // This file contains code
    `,
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
    {
      code: '// @flow trict',
      errors: [
        'It appears you have a typo, valid values are @flow, @flow strict and @flow strict-local',
      ],
    },
    {
      code: '// @flow strict local',
      errors: [
        'It appears you have a typo, valid values are @flow, @flow strict and @flow strict-local',
      ],
    },
    {
      code: '/* @flow strict-lcoal */',
      errors: [
        'It appears you have a typo, valid values are @flow, @flow strict and @flow strict-local',
      ],
    },
  ],
});
