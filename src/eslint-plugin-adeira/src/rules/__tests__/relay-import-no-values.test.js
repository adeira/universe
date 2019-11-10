// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../relay-import-no-values');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('no-values', rule, {
  valid: [
    {
      // not a Relay import
      code: "import { graphql } from '@adeira/relay';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import with "import type"
      code: "import type { Module_data } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import with "import { type"
      code: "import { type Module_data } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import from artifact directory with "import type"
      code: "import type { Module_data } from '__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import from artifact directory with "import { type"
      code: "import { type Module_data } from '__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // this rule doesn't mind whether the file exists
      code: "import type { WrongFile_data } from './__generated__/WrongFile_data.graphql';",
      filename: '/path/Module.js',
    },
  ],

  invalid: [
    {
      code: "import { Module_data } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [{ message: '"Module_data" is not imported as a type' }],
    },
    {
      code: "import Module_data from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [{ message: '"Module_data" is not imported as a type' }],
    },
    {
      code:
        "import { Module_data, type Module_data$ref } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [{ message: '"Module_data" is not imported as a type' }],
    },
    {
      code: "import { Module_data } from '../OtherDirectory/__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [{ message: '"Module_data" is not imported as a type' }],
    },
  ],
});
