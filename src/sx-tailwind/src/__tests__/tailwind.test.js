// @flow

import resolveConfig from 'tailwindcss/resolveConfig';

import { generateTailwind } from '../tailwindToSx';

const tailwindConfig = resolveConfig({});

it('converts whole Tailwind', async () => {
  const { styles, keyframes } = await generateTailwind(tailwindConfig);

  expect(Object.keys(styles)).toHaveLength(35605);
  expect(Object.keys(keyframes)).toHaveLength(4);

  expect(styles['bg-red-300']).toMatchInlineSnapshot(`
    Object {
      "--tw-bg-opacity": "1",
      "backgroundColor": "rgba(252, 165, 165, var(--tw-bg-opacity))",
    }
  `);

  expect(styles['sm:font-bold']).toMatchInlineSnapshot(`
      Object {
        "@media (min-width: 640px)": Object {
          "fontWeight": 700,
        },
      }
    `);

  expect(styles['lg:focus:ring']).toMatchInlineSnapshot(`
    Object {
      "@media (min-width: 1024px)": Object {
        ":focus": Object {
          "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
          "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
          "boxShadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
        },
      },
    }
  `);
});
