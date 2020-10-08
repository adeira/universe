// @flow

import StyleCollector from '../StyleCollector';

afterEach(() => {
  StyleCollector.reset();
});

it('works with simple styles', () => {
  expect(
    StyleCollector.collect({
      test: { color: 'blue' },
      lol: {
        fontSize: 16,
        color: 'blue',
      },
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "hashRegistry": Map {
        "test" => Map {
          "color" => "_4fo5TC",
        },
        "lol" => Map {
          "fontSize" => "Zld8p",
          "color" => "_4fo5TC",
        },
      },
      "styleBuffer": Map {
        "_4fo5TC" => StyleCollectorNode {
          "hash": "_4fo5TC",
          "styleName": "color",
          "styleValue": "#00f",
        },
        "Zld8p" => StyleCollectorNode {
          "hash": "Zld8p",
          "styleName": "font-size",
          "styleValue": "1rem",
        },
      },
    }
  `);
});

it('works with pseudo styles', () => {
  expect(
    StyleCollector.collect({
      lol: {
        'fontSize': 16,
        'color': 'blue',
        ':hover': {
          color: 'pink',
          textDecoration: 'underline',
        },
      },
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "hashRegistry": Map {
        "lol" => Map {
          "fontSize" => "Zld8p",
          "color" => "_4fo5TC",
          "color:hover" => "_4rAdwD",
          "textDecoration:hover" => "_22QzO9",
        },
      },
      "styleBuffer": Map {
        "Zld8p" => StyleCollectorNode {
          "hash": "Zld8p",
          "styleName": "font-size",
          "styleValue": "1rem",
        },
        "_4fo5TC" => StyleCollectorNode {
          "hash": "_4fo5TC",
          "styleName": "color",
          "styleValue": "#00f",
        },
        ":hover" => StyleCollectorPseudoNode {
          "nodes": Map {
            "_4rAdwD" => StyleCollectorNode {
              "hash": "_4rAdwD",
              "styleName": "color",
              "styleValue": "#ffc0cb",
            },
            "_22QzO9" => StyleCollectorNode {
              "hash": "_22QzO9",
              "styleName": "text-decoration",
              "styleValue": "underline",
            },
          },
          "pseudo": ":hover",
        },
      },
    }
  `);
});

it('works with mediaQueries', () => {
  expect(
    StyleCollector.collect({
      test: {
        '@media (min-width: 900px)': {
          color: 'blue',
        },
      },
      nestedMedia: {
        '@media print': {
          'color': 'red',
          '@media (max-width: 12cm)': {
            color: 'blue',
          },
        },
      },
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "hashRegistry": Map {
        "test" => Map {
          "color@media (min-width: 900px)" => "jwIA4",
        },
        "nestedMedia" => Map {
          "color@media print" => "zIzjk",
          "color@media (max-width: 12cm)" => "Uxdbe",
        },
      },
      "styleBuffer": Map {
        "@media (min-width: 900px)" => StyleCollectorAtNode {
          "atRuleName": "@media (min-width: 900px)",
          "nodes": Map {
            "jwIA4" => StyleCollectorNode {
              "hash": "jwIA4",
              "styleName": "color",
              "styleValue": "#00f",
            },
          },
        },
        "@media print" => StyleCollectorAtNode {
          "atRuleName": "@media print",
          "nodes": Map {
            "zIzjk" => StyleCollectorNode {
              "hash": "zIzjk",
              "styleName": "color",
              "styleValue": "#f00",
            },
            "@media (max-width: 12cm)" => StyleCollectorAtNode {
              "atRuleName": "@media (max-width: 12cm)",
              "nodes": Map {
                "Uxdbe" => StyleCollectorNode {
                  "hash": "Uxdbe",
                  "styleName": "color",
                  "styleValue": "#00f",
                },
              },
            },
          },
        },
      },
    }
  `);
});
