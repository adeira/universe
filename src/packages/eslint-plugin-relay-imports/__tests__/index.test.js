// @flow

const RuleTester = require('eslint').RuleTester;

const plugin = require('..');

jest.mock('../readFileSync', () => (path, options) => {
  expect(options.encoding).toEqual('utf-8');
  if (path === '/path/__generated__/Module_data.graphql.js') {
    return `
          declare export opaque type Module_data$ref: FragmentReference;
          export type Module_data = any;
        `;
  }
  throw new Error('File not found');
});

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const validForBoth = [
  {
    // not a Relay import
    code: "import { graphql } from '@kiwicom/relay';",
    filename: '/path/Module.js',
  },
  {
    // perfectly valid Relay import with "import type"
    code:
      "import type { Module_data } from './__generated__/Module_data.graphql';",
    filename: '/path/Module.js',
  },
  {
    // perfectly valid Relay import with "import { type"
    code:
      "import { type Module_data } from './__generated__/Module_data.graphql';",
    filename: '/path/Module.js',
  },
];

ruleTester.run('no-values', plugin.rules['no-values'], {
  valid: [
    ...validForBoth,
    {
      // this rule doesn't mind whether the file exists
      code:
        "import type { WrongFile_data } from './__generated__/WrongFile_data.graphql';",
      filename: '/path/Module.js',
    },
  ],

  invalid: [
    {
      code:
        "import { Module_data } from './__generated__/Module_data.graphql';",
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
      code:
        "import { Module_data } from '../OtherDirectory/__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [{ message: '"Module_data" is not imported as a type' }],
    },
  ],
});

ruleTester.run('type-must-exist', plugin.rules['type-must-exist'], {
  valid: [
    ...validForBoth,
    {
      // value imports are ignored by this rule
      code: "import Module_data from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // filename including the extension
      code:
        "import type { Module_data } from './__generated__/Module_data.graphql.js';",
      filename: '/path/Module.js',
    },
  ],

  invalid: [
    {
      code:
        "import type { Wrong_type } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message:
            '"Wrong_type" is not exported from the generated file (exported types: Module_data, Module_data$ref)',
        },
      ],
    },
    {
      code:
        "import type { Wrong_type } from '../path/__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message:
            '"Wrong_type" is not exported from the generated file (exported types: Module_data, Module_data$ref)',
        },
      ],
    },
    {
      // one valid, one invalid
      code:
        "import type { Module_data, Wrong_type } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message:
            '"Wrong_type" is not exported from the generated file (exported types: Module_data, Module_data$ref)',
        },
      ],
    },
    {
      // file doesn't exist
      code:
        "import type { WrongFile_data } from './__generated__/WrongFile_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message: "Can't read the file",
        },
      ],
    },
  ],
});
