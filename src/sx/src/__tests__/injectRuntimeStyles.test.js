/**
 * @flow
 * @jest-environment jsdom
 */

/* global document */

import { render } from '@testing-library/react';

import sx from '../../index';

it('injects runtime styles', () => {
  render(<style data-adeira-sx />);

  const styleTag = document.querySelector('style');
  expect(styleTag?.sheet?.cssRules).toHaveLength(0);

  sx.create({
    test: {
      opacity: 0,
      height: '100px',
    },
  });

  expect(styleTag?.sheet?.cssRules).toHaveLength(2);
  expect(styleTag?.sheet?.cssRules).toMatchInlineSnapshot(`
    Array [
      CSSStyleRule {
        "__ends": 19,
        "__starts": 0,
        "parentRule": null,
        "parentStyleSheet": CSSStyleSheet {
          "cssRules": [Circular],
          "parentStyleSheet": null,
        },
        "selectorText": "._1YaT0o",
        "style": CSSStyleDeclaration {
          "0": "opacity",
          "__starts": 8,
          "_importants": Object {
            "opacity": "",
          },
          "length": 1,
          "opacity": "0",
          "parentRule": [Circular],
        },
      },
      CSSStyleRule {
        "__ends": 21,
        "__starts": 0,
        "parentRule": null,
        "parentStyleSheet": CSSStyleSheet {
          "cssRules": [Circular],
          "parentStyleSheet": null,
        },
        "selectorText": "._19net",
        "style": CSSStyleDeclaration {
          "0": "height",
          "__starts": 7,
          "_importants": Object {
            "height": "",
          },
          "height": "100px",
          "length": 1,
          "parentRule": [Circular],
        },
      },
    ]
  `);
});
