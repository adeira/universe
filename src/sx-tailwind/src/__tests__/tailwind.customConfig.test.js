// @flow

import resolveConfig from 'tailwindcss/resolveConfig';

import convertToSx from '../tailwindToSx';

const customConfig = {
  theme: {
    extend: {
      colors: {
        adeira: {
          green: '#55e0c6',
        },
      },
      screens: {
        tablet: '720px',
      },
    },
  },
};

it('supports custom config', async () => {
  const config = resolveConfig(customConfig);

  const sxTailwind = await convertToSx(
    `@tailwind base;
    @tailwind components;
    @tailwind utilities;
    `,
    config,
  );

  expect(Object.keys(sxTailwind)).toHaveLength(21870);

  expect(sxTailwind['text-adeira-green']).toMatchInlineSnapshot(`
    Object {
      "--text-opacity": "1",
      "color": "rgba(85, 224, 198, var(--text-opacity))",
    }
  `);

  expect(sxTailwind['tablet:font-bold']).toMatchInlineSnapshot(`
    Object {
      "@media (min-width: 720px)": Object {
        "fontWeight": 700,
      },
    }
  `);
});
