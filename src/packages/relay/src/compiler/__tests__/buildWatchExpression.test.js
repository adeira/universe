// @flow strict

import buildWatchExpression from '../buildWatchExpression';

it('builds correct watchman expression', () => {
  expect(
    buildWatchExpression({
      extensions: ['js', 'jsx'],
      include: ['**'],
      exclude: ['**/node_modules/**', '**/__[a-z]*__/**'],
    }),
  ).toMatchInlineSnapshot(`
    Array [
      "allof",
      Array [
        "type",
        "f",
      ],
      Array [
        "anyof",
        Array [
          "suffix",
          "js",
        ],
        Array [
          "suffix",
          "jsx",
        ],
      ],
      Array [
        "anyof",
        Array [
          "match",
          "**",
          "wholename",
        ],
      ],
      Array [
        "not",
        Array [
          "match",
          "**/node_modules/**",
          "wholename",
        ],
      ],
      Array [
        "not",
        Array [
          "match",
          "**/__[a-z]*__/**",
          "wholename",
        ],
      ],
    ]
  `);
});
