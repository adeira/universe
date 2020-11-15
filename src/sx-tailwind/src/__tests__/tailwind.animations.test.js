// @flow

import resolveConfig from 'tailwindcss/resolveConfig';

import convertToSx from '../tailwindToSx';

const tailwindConfig = resolveConfig({});

it('converts Tailwind default animations', async () => {
  const { styles, keyframes } = await convertToSx(
    `@tailwind base;
    @tailwind components;
    @tailwind utilities;
    `,
    tailwindConfig,
  );

  expect(styles['animate-none']).toMatchInlineSnapshot(`
    Object {
      "animation": "none",
    }
  `);

  expect(styles['animate-spin']).toMatchInlineSnapshot(`
    Object {
      "animation": "1s linear infinite",
      "animationName": "spin",
    }
  `);
  expect(styles['animate-ping']).toMatchInlineSnapshot(`
      Object {
        "animation": "1s cubic-bezier(0, 0, 0.2, 1) infinite",
        "animationName": "ping",
      }
    `);
  expect(styles['animate-pulse']).toMatchInlineSnapshot(`
    Object {
      "animation": "2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "animationName": "pulse",
    }
  `);
  expect(styles['animate-bounce']).toMatchInlineSnapshot(`
    Object {
      "animation": "1s infinite",
      "animationName": "bounce",
    }
  `);

  expect(keyframes).toMatchInlineSnapshot(`
    Object {
      "bounce": Object {
        "0%, 100%": Object {
          "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          "transform": "translateY(-25%)",
        },
        "50%": Object {
          "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          "transform": "none",
        },
      },
      "ping": Object {
        "75%, 100%": Object {
          "opacity": "0",
          "transform": "scale(2)",
        },
      },
      "pulse": Object {
        "50%": Object {
          "opacity": ".5",
        },
      },
      "spin": Object {
        "to": Object {
          "transform": "rotate(360deg)",
        },
      },
    }
  `);
});
