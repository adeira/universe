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
    '// @flow\tstrict',
    `// @flow
    // This file contains code
    `,
    `/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */`,
  ],

  invalid: [
    {
      code: '/* @noflow */',
      errors: ["Do not disable Flow type checker, use '@flow' or '@flow strict' instead."],
    },
    {
      code: '// @noflow',
      errors: ["Do not disable Flow type checker, use '@flow' or '@flow strict' instead."],
    },
    {
      code: '/* @flow weak */',
      errors: ["Weak mode in Flow is not allowed, use '@flow' or '@flow strict' instead."],
    },
    {
      code: '// @flow weak',
      errors: ["Weak mode in Flow is not allowed, use '@flow' or '@flow strict' instead."],
    },
    {
      code: '// @flow wtf',
      errors: ["Flow annotation '@flow wtf' is not valid, did you mean '@flow'?"],
    },
    {
      code: '// @flow trict',
      errors: ["Flow annotation '@flow trict' is not valid, did you mean '@flow strict'?"],
    },
    {
      code: '// @flow strict local',
      errors: [
        "Flow annotation '@flow strict local' is not valid, did you mean '@flow strict-local'?",
      ],
    },
    {
      code: '/* @flow strict-lcoal */',
      errors: [
        "Flow annotation '@flow strict-lcoal' is not valid, did you mean '@flow strict-local'?",
      ],
    },
    {
      code: '/* @flow     strict */',
      errors: ["Flow annotation '@flow     strict' is not valid, did you mean '@flow strict'?"],
    },
  ],
});
