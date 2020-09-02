// @flow

import generate from '../sxGenerator';

it('works with class selector', () => {
  const css = `.rounded-sm {
    border-radius: 0.125rem;
    border-width: 2;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "rounded-sm": Object {
        "borderRadius": "0.125rem",
        "borderWidth": 2,
      },
    }
  `);
});

it('works with pseudo class selector', () => {
  const css = `.focus\\:shadow-outline:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "focus:shadow-outline": Object {
        ":focus": Object {
          "boxShadow": "0 0 0 3px rgba(66,153,225,0.5)",
        },
      },
    }
  `);
});

it('skips classes in media query', () => {
  const css = `@media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`Object {}`);
});

it('generates multiple declarations', () => {
  const css = `.rounded-sm {
    border-radius: 0.125rem;
    border-width: 2;
  }

  .focus\\:shadow-outline:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "focus:shadow-outline": Object {
        ":focus": Object {
          "boxShadow": "0 0 0 3px rgba(66,153,225,0.5)",
        },
      },
      "rounded-sm": Object {
        "borderRadius": "0.125rem",
        "borderWidth": 2,
      },
    }
  `);
});

it('ignores vendor prefixed declarations', () => {
  const css = `.appearance-none {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "appearance-none": Object {
        "appearance": "none",
      },
    }
  `);
});

it('ignores vendor prefixed values', () => {
  const css = `.sticky {
    position: -webkit-sticky;
    position: sticky;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "sticky": Object {
        "position": "sticky",
      },
    }
  `);
});

it('removes units from line-height', () => {
  const css = `.leading-5 {
    line-height: 1.25rem;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "leading-5": Object {
        "lineHeight": 1.25,
      },
    }
  `);
});

it('removes units from font-size', () => {
  const css = `.text-xs {
    font-size: 0.75rem;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "text-xs": Object {
        "fontSize": 0.75,
      },
    }
  `);
});

it('does not overwrite declarations', () => {
  const css = `.bg-black {
    --bg-opacity: 1;
    background-color: #000;
    background-color: rgba(0, 0, 0, var(--bg-opacity));
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`
    Object {
      "bg-black": Object {
        "backgroundColor": "#000",
      },
    }
  `);
});

it('skips empty styles', () => {
  const css = `.hover\\:-skew-y-12:hover {
    --transform-skew-y: -12deg;
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`Object {}`);
});

it('skips :not pseudo class selectors', () => {
  const css = `.space-y-0 > :not(template) ~ :not(template) {
    --space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--space-y-reverse)));
    margin-bottom: calc(0px * var(--space-y-reverse));
  }`;

  expect(generate(css)).toMatchInlineSnapshot(`Object {}`);
});
