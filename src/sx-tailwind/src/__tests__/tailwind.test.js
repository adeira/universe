// @flow

import resolveConfig from 'tailwindcss/resolveConfig';

import convertToSx from '../tailwindToSx';

const tailwindConfig = resolveConfig({});

it('converts whole Tailwind', async () => {
  const tailwind = await convertToSx(
    `@tailwind base;
    @tailwind components;
    @tailwind utilities;
    `,
    tailwindConfig,
  );

  expect(Object.keys(tailwind)).toHaveLength(18120);

  expect(tailwind['bg-orange-300']).toMatchInlineSnapshot(`
    Object {
      "--bg-opacity": "1",
      "backgroundColor": "rgba(251, 211, 141, var(--bg-opacity))",
    }
  `);

  expect(tailwind['sm:font-bold']).toMatchInlineSnapshot(`
      Object {
        "@media (min-width: 640px)": Object {
          "fontWeight": 700,
        },
      }
    `);

  expect(tailwind['lg:focus:shadow-outline']).toMatchInlineSnapshot(`
    Object {
      "@media (min-width: 1024px)": Object {
        ":focus": Object {
          "boxShadow": "0 0 0 3px rgba(66, 153, 225, 0.5)",
        },
      },
    }
  `);
});
