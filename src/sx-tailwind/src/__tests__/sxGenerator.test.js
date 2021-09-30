// @flow

import resolveConfig from 'tailwindcss/resolveConfig';

import convertToSx from '../tailwindToSx';

const config = resolveConfig({});

it('works with class selector', async () => {
  const css = `.rounded-sm {
    border-radius: 0.125rem;
    border-width: 2;
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "rounded-sm": Object {
          "borderRadius": "0.125rem",
          "borderWidth": 2,
        },
      },
    }
  `);
});

it('works with pseudo class selector', async () => {
  const css = `.focus\\:shadow-outline:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "focus:shadow-outline": Object {
          ":focus": Object {
            "boxShadow": "0 0 0 3px rgba(66, 153, 225, 0.5)",
          },
        },
      },
    }
  `);
});

it('supports classes in media query', async () => {
  const css = `@media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "container": Object {
          "@media (min-width: 640px)": Object {
            "maxWidth": "640px",
          },
        },
      },
    }
  `);
});

// eslint-disable-next-line jest/no-disabled-tests
it.skip('supports nested media queries', async () => {
  const css = `@media (min-width: 768px) {
    .container {
      width: 100%;
    }

    @media (min-width: 640px) {
      .container {
        max-width: 640px;
      }
    }
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "container": Object {
        "@media (min-width:768px)": Object {
          "@media (min-width:640px)": Object {
            "maxWidth": "640px",
          },
          "width": "100%",
        },
      },
    }
  `);
});

it('generates multiple declarations', async () => {
  const css = `.rounded-sm {
    border-radius: 0.125rem;
    border-width: 2;
  }

  .focus\\:shadow-outline:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "focus:shadow-outline": Object {
          ":focus": Object {
            "boxShadow": "0 0 0 3px rgba(66, 153, 225, 0.5)",
          },
        },
        "rounded-sm": Object {
          "borderRadius": "0.125rem",
          "borderWidth": 2,
        },
      },
    }
  `);
});

it('ignores vendor prefixed declarations', async () => {
  const css = `.appearance-none {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "appearance-none": Object {
          "appearance": "none",
        },
      },
    }
  `);
});

it('ignores vendor prefixed values', async () => {
  const css = `.sticky {
    position: sticky;
    position: -webkit-sticky;
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "sticky": Object {
          "position": "sticky",
        },
      },
    }
  `);
});

it('does not remove rem units from line-height', async () => {
  const css = `.leading-5 {
    line-height: 1.25rem;
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "leading-5": Object {
          "lineHeight": "1.25rem",
        },
      },
    }
  `);
});

it('does not remove rem units from font-size', async () => {
  const css = `.text-xs {
    font-size: 0.75rem;
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "text-xs": Object {
          "fontSize": "0.75rem",
        },
      },
    }
  `);
});

it('does overwrite declarations', async () => {
  const css = `.bg-black {
    --bg-opacity: 1;
    background-color: #000;
    background-color: rgba(0, 0, 0, var(--bg-opacity));
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {
        "bg-black": Object {
          "--bg-opacity": "1",
          "backgroundColor": "rgba(0, 0, 0, var(--bg-opacity))",
        },
      },
    }
  `);
});

it('skips empty styles', async () => {
  const css = `.hover\\:empty-style:hover {}`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {},
    }
  `);
});

it('supports keyframes at-rules', async () => {
  const css = `@keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {
        "spin": Object {
          "to": Object {
            "transform": "rotate(360deg)",
          },
        },
      },
      "styles": Object {},
    }
  `);
});

it('skips unsupported at-rules', async () => {
  const css = `@font-face {
    font-family: "Open Sans";
    src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
         url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {},
    }
  `);
});

it('skips :not pseudo class selectors', async () => {
  const css = `.space-y-0 > :not(template) ~ :not(template) {
    --space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--space-y-reverse)));
    margin-bottom: calc(0px * var(--space-y-reverse));
  }`;

  await expect(convertToSx(css, config)).resolves.toMatchInlineSnapshot(`
    Object {
      "keyframes": Object {},
      "styles": Object {},
    }
  `);
});
