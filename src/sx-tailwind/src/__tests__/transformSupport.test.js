// @flow

import generate from '../sxGenerator';

it('supports translateY', () => {
  const css = `.-translate-y-1 {
    --transform-translate-y: -0.25rem;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "-translate-y-1": Object {
        "--transform-translate-y": "-0.25rem",
      },
    }
  `);
});

it('supports translateX', () => {
  const css = `.translate-x-10 {
    --transform-translate-x: 2.5rem;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "translate-x-10": Object {
        "--transform-translate-x": "2.5rem",
      },
    }
  `);
});

it('supports skewY', () => {
  const css = `.hover\\:-skew-y-12:hover {
    --transform-skew-y: -12deg;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "hover:-skew-y-12": Object {
        ":hover": Object {
          "--transform-skew-y": "-12deg",
        },
      },
    }
  `);
});

it('supports skewX', () => {
  const css = `.skew-x-0 {
    --transform-skew-x: 0;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "skew-x-0": Object {
        "--transform-skew-x": "0",
      },
    }
  `);
});

it('supports rotate', () => {
  const css = `.sm\\:hover\\:-rotate-90:hover {
    --transform-rotate: -90deg;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "sm:hover:-rotate-90": Object {
        ":hover": Object {
          "--transform-rotate": "-90deg",
        },
      },
    }
  `);
});

it('supports scale', () => {
  const css = `.scale-75 {
    --transform-scale-x: .75;
    --transform-scale-y: .75;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "scale-75": Object {
        "--transform-scale-x": ".75",
        "--transform-scale-y": ".75",
      },
    }
  `);
});
