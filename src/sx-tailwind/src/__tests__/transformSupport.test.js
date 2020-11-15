// @flow

import resolveConfig from 'tailwindcss/resolveConfig';

import convertToSx from '../tailwindToSx';

const config = resolveConfig({});

it('supports translateY', async () => {
  const css = `.-translate-y-1 {
    --transform-translate-y: -0.25rem;
  }`;

  expect(await convertToSx(css, config)).toMatchInlineSnapshot(`
    Object {
      "-translate-y-1": Object {
        "--transform-translate-y": "-0.25rem",
      },
    }
  `);
});

it('supports translateX', async () => {
  const css = `.translate-x-10 {
    --transform-translate-x: 2.5rem;
  }`;

  expect(await convertToSx(css, config)).toMatchInlineSnapshot(`
    Object {
      "translate-x-10": Object {
        "--transform-translate-x": "2.5rem",
      },
    }
  `);
});

it('supports skewY', async () => {
  const css = `.hover\\:-skew-y-12:hover {
    --transform-skew-y: -12deg;
  }`;

  expect(await convertToSx(css, config)).toMatchInlineSnapshot(`
    Object {
      "hover:-skew-y-12": Object {
        ":hover": Object {
          "--transform-skew-y": "-12deg",
        },
      },
    }
  `);
});

it('supports skewX', async () => {
  const css = `.skew-x-0 {
    --transform-skew-x: 0;
  }`;

  expect(await convertToSx(css, config)).toMatchInlineSnapshot(`
    Object {
      "skew-x-0": Object {
        "--transform-skew-x": "0",
      },
    }
  `);
});

it('supports rotate', async () => {
  const css = `.sm\\:hover\\:-rotate-90:hover {
    --transform-rotate: -90deg;
  }`;

  expect(await convertToSx(css, config)).toMatchInlineSnapshot(`
    Object {
      "sm:hover:-rotate-90": Object {
        ":hover": Object {
          "--transform-rotate": "-90deg",
        },
      },
    }
  `);
});

it('supports scale', async () => {
  const css = `.scale-75 {
    --transform-scale-x: .75;
    --transform-scale-y: .75;
  }`;

  expect(await convertToSx(css, config)).toMatchInlineSnapshot(`
    Object {
      "scale-75": Object {
        "--transform-scale-x": ".75",
        "--transform-scale-y": ".75",
      },
    }
  `);
});
