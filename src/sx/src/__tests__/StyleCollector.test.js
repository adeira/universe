// @flow

import styleCollector from '../StyleCollector';

afterEach(() => {
  styleCollector.styles.clear();
});

it('works with simple styles', () => {
  const styleMap = {};

  styleCollector.addStyles(
    {
      test: { color: 'blue' },
      lol: {
        fontSize: 16,
        color: 'blue',
      },
    },
    styleMap,
  );

  expect(styleCollector.styles).toMatchInlineSnapshot(`
    Map {
      "_4fo5TC" => StyleNode {
        "propertyName": "color",
        "pseudo": "",
        "styleValue": "#00f",
      },
      "Zld8p" => StyleNode {
        "propertyName": "font-size",
        "pseudo": "",
        "styleValue": "1rem",
      },
    }
  `);
  expect(styleMap).toMatchInlineSnapshot(`
    Object {
      "lol": Object {
        "color": "_4fo5TC",
        "fontSize": "Zld8p",
      },
      "test": Object {
        "color": "_4fo5TC",
      },
    }
  `);
});

it('works with pseudo styles', () => {
  const styleMap = {};
  styleCollector.addStyles(
    {
      lol: {
        'fontSize': 16,
        'color': 'blue',
        ':hover': {
          color: 'pink',
        },
      },
    },
    styleMap,
  );

  expect(styleCollector.styles).toMatchInlineSnapshot(`
    Map {
      "Zld8p" => StyleNode {
        "propertyName": "font-size",
        "pseudo": "",
        "styleValue": "1rem",
      },
      "_4fo5TC" => StyleNode {
        "propertyName": "color",
        "pseudo": "",
        "styleValue": "#00f",
      },
      "_4rAdwD" => StyleNode {
        "propertyName": "color",
        "pseudo": ":hover",
        "styleValue": "#ffc0cb",
      },
    }
  `);

  expect(styleMap).toMatchInlineSnapshot(`
    Object {
      "lol": Object {
        "color": "_4fo5TC",
        "color:hover": "_4rAdwD",
        "fontSize": "Zld8p",
      },
    }
  `);
});

it('works with mediaQueries', () => {
  const styleMap = {};
  styleCollector.addStyles(
    {
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
    },
    styleMap,
  );

  expect(styleCollector.styles).toMatchInlineSnapshot(`
    Map {
      "@media (min-width: 900px)" => StyleCollector {
        "addStyles": [Function],
        "mediaName": "@media (min-width: 900px)",
        "styles": Map {
          "_4fo5TC" => StyleNode {
            "propertyName": "color",
            "pseudo": "",
            "styleValue": "#00f",
          },
        },
      },
      "@media print" => StyleCollector {
        "addStyles": [Function],
        "mediaName": "@media print",
        "styles": Map {
          "wUqnh" => StyleNode {
            "propertyName": "color",
            "pseudo": "",
            "styleValue": "#f00",
          },
          "@media (max-width: 12cm)" => StyleCollector {
            "addStyles": [Function],
            "mediaName": "@media (max-width: 12cm)",
            "styles": Map {
              "_4fo5TC" => StyleNode {
                "propertyName": "color",
                "pseudo": "",
                "styleValue": "#00f",
              },
            },
          },
        },
      },
    }
  `);

  expect(styleMap).toMatchInlineSnapshot(`
    Object {
      "nestedMedia": Object {
        "color@media (max-width: 12cm)": "_4fo5TC",
        "color@media print": "wUqnh",
      },
      "test": Object {
        "color@media (min-width: 900px)": "_4fo5TC",
      },
    }
  `);
});
