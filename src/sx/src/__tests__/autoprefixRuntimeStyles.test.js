// @flow

/* global document */

import { render } from '@testing-library/react';

import sx from '../../index';

it('autoprefix runtime styles', () => {
  render(<style data-adeira-sx />);

  const styleTag = document.querySelector('style');
  expect(styleTag?.sheet?.cssRules).toHaveLength(0);

  sx.create({
    test: {
      backgroundClip: 'text',
    },
  });

  expect(styleTag?.sheet?.cssRules).toHaveLength(1);
  expect(styleTag?.sheet?.cssRules).toMatchInlineSnapshot(`
    Array [
      CSSStyleRule {
        "__ends": 60,
        "__starts": 0,
        "parentRule": null,
        "parentStyleSheet": CSSStyleSheet {
          "cssRules": [Circular],
          "parentStyleSheet": null,
        },
        "selectorText": "._2D4soO",
        "style": CSSStyleDeclaration {
          "-webkit-background-clip": "text",
          "0": "-webkit-background-clip",
          "1": "background-clip",
          "__starts": 8,
          "_importants": Object {
            "-webkit-background-clip": "",
            "background-clip": "",
          },
          "background-clip": "text",
          "length": 2,
          "parentRule": [Circular],
        },
      },
    ]
  `);
});
