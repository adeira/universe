/**
 * @flow
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';

import useSelectedItemsApi from '../selectedItemsState';

afterEach(() => {
  window.localStorage.clear();
});

function renderSelectedItemsHook() {
  const { result } = renderHook(() => useSelectedItemsApi(), {
    wrapper: RecoilRoot,
  });

  return result;
}

function print(renderHookResult) {
  return {
    selectedItems: renderHookResult.current.selectedItems,
    stats: renderHookResult.current.stats,
  };
}

it('appends items as expected', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 10000,
        "totalSelectedItems": 1,
      },
    }
  `);

  act(() => {
    renderHookResult.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 20000,
        "totalSelectedItems": 2,
      },
    }
  `);

  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 2,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 30000,
        "totalSelectedItems": 3,
      },
    }
  `);
});

it('manipulates item counts correctly', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // add some items
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  // increase the first item count
  act(() => {
    renderHookResult.current.increaseUnits('i_1');
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 2,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 30000,
        "totalSelectedItems": 3,
      },
    }
  `);

  // now, let's try to delete the first item
  act(() => {
    renderHookResult.current.decreaseUnits('i_1');
  });
  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 20000,
        "totalSelectedItems": 2,
      },
    }
  `);

  // and again (deleting the first item)
  act(() => {
    renderHookResult.current.decreaseUnits('i_1');
  });
  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 10000,
        "totalSelectedItems": 1,
      },
    }
  `);

  // deleting the remaining item
  act(() => {
    renderHookResult.current.decreaseUnits('i_2');
  });
  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // and deleting some nonexistent item
  act(() => {
    renderHookResult.current.decreaseUnits('wtf');
  });
  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);
});

it('preserves order of insertion', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // add some items
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 20000,
        "totalSelectedItems": 2,
      },
    }
  `);

  // let's try to delete them and add them in the reversed order:
  act(() => {
    renderHookResult.current.decreaseUnits('i_1');
  });
  act(() => {
    renderHookResult.current.decreaseUnits('i_2');
  });

  act(() => {
    renderHookResult.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 20000,
        "totalSelectedItems": 2,
      },
    }
  `);
});

it('resets selected items correctly', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // add some items
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [],
          "itemID": "i_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 20000,
        "totalSelectedItems": 2,
      },
    }
  `);

  // let's reset the selected items
  act(() => {
    renderHookResult.current.reset();
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);
});

it('appends items with addons as expected', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // First, let's add a product WITHOUT addons
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
      ],
      "stats": Object {
        "totalPrice": 10000,
        "totalSelectedItems": 1,
      },
    }
  `);

  // Let's add the same product (same ID) but with extra addons
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      itemAddons: [
        {
          itemAddonID: 'i_a_1',
          itemAddonTitle: 'I addon title 1',
          itemAddonExtraPrice: 10_00,
        },
        {
          itemAddonID: 'i_a_2',
          itemAddonTitle: 'I addon title 2',
          itemAddonExtraPrice: 5_00,
        },
      ],
      units: 2,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [
            Object {
              "itemAddonExtraPrice": 1000,
              "itemAddonID": "i_a_1",
              "itemAddonTitle": "I addon title 1",
            },
            Object {
              "itemAddonExtraPrice": 500,
              "itemAddonID": "i_a_2",
              "itemAddonTitle": "I addon title 2",
            },
          ],
          "itemID": "i_1%i_a_1%i_a_2",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 2,
        },
      ],
      "stats": Object {
        "totalPrice": 33000,
        "totalSelectedItems": 3,
      },
    }
  `);
});

it('appends items with addons with a stable order', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // Let's add a product with extra addons:
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      itemAddons: [
        {
          itemAddonID: 'i_a_1',
          itemAddonTitle: 'I addon title 1',
          itemAddonExtraPrice: 10_00,
        },
        {
          itemAddonID: 'i_a_2',
          itemAddonTitle: 'I addon title 2',
          itemAddonExtraPrice: 5_00,
        },
      ],
      units: 2,
    });
  });

  const snapshotA = print(renderHookResult);
  expect(snapshotA).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [
            Object {
              "itemAddonExtraPrice": 1000,
              "itemAddonID": "i_a_1",
              "itemAddonTitle": "I addon title 1",
            },
            Object {
              "itemAddonExtraPrice": 500,
              "itemAddonID": "i_a_2",
              "itemAddonTitle": "I addon title 2",
            },
          ],
          "itemID": "i_1%i_a_1%i_a_2",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 2,
        },
      ],
      "stats": Object {
        "totalPrice": 23000,
        "totalSelectedItems": 2,
      },
    }
  `);

  // Remove the product and add it again but with reversed item addons order (should result in the same snapshot):
  act(() => {
    renderHookResult.current.reset();
  });
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      itemAddons: [
        {
          itemAddonID: 'i_a_2',
          itemAddonTitle: 'I addon title 2',
          itemAddonExtraPrice: 5_00,
        },
        {
          itemAddonID: 'i_a_1',
          itemAddonTitle: 'I addon title 1',
          itemAddonExtraPrice: 10_00,
        },
      ],
      units: 2,
    });
  });

  const snapshotB = print(renderHookResult);
  expect(snapshotA).toStrictEqual(snapshotB);
});

it('increases item units with addons correctly', () => {
  const renderHookResult = renderSelectedItemsHook();

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [],
      "stats": Object {
        "totalPrice": 0,
        "totalSelectedItems": 0,
      },
    }
  `);

  // Let's add a product with extra addons:
  act(() => {
    renderHookResult.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
    renderHookResult.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 150_00,
      itemAddons: [
        {
          itemAddonID: 'i_a_1',
          itemAddonTitle: 'I addon title 1',
          itemAddonExtraPrice: 10_00,
        },
        {
          itemAddonID: 'i_a_2',
          itemAddonTitle: 'I addon title 2',
          itemAddonExtraPrice: 8_00,
        },
      ],
      units: 2,
    });
  });

  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 1,
        },
        Object {
          "itemAddons": Array [
            Object {
              "itemAddonExtraPrice": 1000,
              "itemAddonID": "i_a_1",
              "itemAddonTitle": "I addon title 1",
            },
            Object {
              "itemAddonExtraPrice": 800,
              "itemAddonID": "i_a_2",
              "itemAddonTitle": "I addon title 2",
            },
          ],
          "itemID": "i_2%i_a_1%i_a_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 15000,
          "units": 2,
        },
      ],
      "stats": Object {
        "totalPrice": 43600,
        "totalSelectedItems": 3,
      },
    }
  `);

  // increase number of units of the first product
  act(() => {
    renderHookResult.current.increaseUnits('i_1');
  });
  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 2,
        },
        Object {
          "itemAddons": Array [
            Object {
              "itemAddonExtraPrice": 1000,
              "itemAddonID": "i_a_1",
              "itemAddonTitle": "I addon title 1",
            },
            Object {
              "itemAddonExtraPrice": 800,
              "itemAddonID": "i_a_2",
              "itemAddonTitle": "I addon title 2",
            },
          ],
          "itemID": "i_2%i_a_1%i_a_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 15000,
          "units": 2,
        },
      ],
      "stats": Object {
        "totalPrice": 53600,
        "totalSelectedItems": 4,
      },
    }
  `);

  // increase number of units of the second product (with addons)
  act(() => {
    renderHookResult.current.increaseUnits('i_2%i_a_1%i_a_2');
  });
  expect(print(renderHookResult)).toMatchInlineSnapshot(`
    Object {
      "selectedItems": Immutable.List [
        Object {
          "itemAddons": Array [],
          "itemID": "i_1",
          "itemTitle": "I title 1",
          "itemUnitAmount": 10000,
          "units": 2,
        },
        Object {
          "itemAddons": Array [
            Object {
              "itemAddonExtraPrice": 1000,
              "itemAddonID": "i_a_1",
              "itemAddonTitle": "I addon title 1",
            },
            Object {
              "itemAddonExtraPrice": 800,
              "itemAddonID": "i_a_2",
              "itemAddonTitle": "I addon title 2",
            },
          ],
          "itemID": "i_2%i_a_1%i_a_2",
          "itemTitle": "I title 2",
          "itemUnitAmount": 15000,
          "units": 3,
        },
      ],
      "stats": Object {
        "totalPrice": 70400,
        "totalSelectedItems": 5,
      },
    }
  `);
});
