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

  const { styles, keyframes } = await convertToSx(
    `@tailwind base;
    @tailwind components;
    @tailwind utilities;
    `,
    config,
  );

  expect(Object.keys(styles)).toHaveLength(21870);
  expect(Object.keys(keyframes)).toHaveLength(4);

  expect(styles['text-adeira-green']).toMatchInlineSnapshot(`
    Object {
      "--text-opacity": "1",
      "color": "rgba(85, 224, 198, var(--text-opacity))",
    }
  `);

  expect(styles['tablet:font-bold']).toMatchInlineSnapshot(`
    Object {
      "@media (min-width: 720px)": Object {
        "fontWeight": 700,
      },
    }
  `);
});
