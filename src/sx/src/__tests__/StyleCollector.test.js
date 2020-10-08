// @flow

import styleCollector from '../StyleCollector';

it('works with simple styles', () => {
  expect(
    styleCollector.collect({
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
        "test" => Set {
          StyleCollectorNode {
            "hash": "_4fo5TC",
            "styleName": "color",
            "styleValue": "#00f",
          },
        },
        "lol" => Set {
          StyleCollectorNode {
            "hash": "Zld8p",
            "styleName": "font-size",
            "styleValue": "1rem",
          },
          StyleCollectorNode {
            "hash": "_4fo5TC",
            "styleName": "color",
            "styleValue": "#00f",
          },
        },
      },
    }
  `);
});

it('works with pseudo styles', () => {
  expect(
    styleCollector.collect({
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
        "lol" => Set {
          StyleCollectorNode {
            "hash": "Zld8p",
            "styleName": "font-size",
            "styleValue": "1rem",
          },
          StyleCollectorNode {
            "hash": "_4fo5TC",
            "styleName": "color",
            "styleValue": "#00f",
          },
          StyleCollectorPseudoNode {
            "nodes": Set {
              StyleCollectorNode {
                "hash": "_4rAdwD",
                "styleName": "color",
                "styleValue": "#ffc0cb",
              },
              StyleCollectorNode {
                "hash": "_22QzO9",
                "styleName": "text-decoration",
                "styleValue": "underline",
              },
            },
            "pseudo": ":hover",
          },
        },
      },
    }
  `);
});

it('works with mediaQueries', () => {
  expect(
    styleCollector.collect({
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
        "test" => Set {
          StyleCollectorAtNode {
            "atRuleName": "@media (min-width: 900px)",
            "nodes": Set {
              StyleCollectorNode {
                "hash": "jwIA4",
                "styleName": "color",
                "styleValue": "#00f",
              },
            },
          },
        },
        "nestedMedia" => Set {
          StyleCollectorAtNode {
            "atRuleName": "@media print",
            "nodes": Set {
              StyleCollectorNode {
                "hash": "zIzjk",
                "styleName": "color",
                "styleValue": "#f00",
              },
              StyleCollectorAtNode {
                "atRuleName": "@media (max-width: 12cm)",
                "nodes": Set {
                  StyleCollectorNode {
                    "hash": "Uxdbe",
                    "styleName": "color",
                    "styleValue": "#00f",
                  },
                },
              },
            },
          },
        },
      },
    }
  `);
});
