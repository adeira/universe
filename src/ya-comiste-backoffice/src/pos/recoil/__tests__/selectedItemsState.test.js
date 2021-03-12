// @flow

import { renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';

import useSelectedItemsApi from '../selectedItemsState';

/* global window */

afterEach(() => {
  window.localStorage.clear();
});

it('appends items as expected', () => {
  const { result } = renderHook(() => useSelectedItemsApi(), {
    wrapper: RecoilRoot,
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 0,
      "totalSelectedItems": 0,
    }
  `);

  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 10000,
      "totalSelectedItems": 1,
    }
  `);

  act(() => {
    result.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 20000,
      "totalSelectedItems": 2,
    }
  `);

  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 2,
      },
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 30000,
      "totalSelectedItems": 3,
    }
  `);
});

it('manipulates item counts correctly', () => {
  const { result } = renderHook(() => useSelectedItemsApi(), {
    wrapper: RecoilRoot,
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);

  // add some items
  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    result.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  // increase the first item count
  act(() => {
    result.current.increaseUnits('i_1');
  });
  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 2,
      },
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 30000,
      "totalSelectedItems": 3,
    }
  `);

  // now, let's try to delete the first item
  act(() => {
    result.current.decreaseUnits('i_1');
  });
  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);

  // and again (deleting the first item)
  act(() => {
    result.current.decreaseUnits('i_1');
  });
  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);

  // deleting the remaining item
  act(() => {
    result.current.decreaseUnits('i_2');
  });
  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);

  // and deleting some nonexistent item
  act(() => {
    result.current.decreaseUnits('wtf');
  });
  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);
});

it('preserves order of insertion', () => {
  const { result } = renderHook(() => useSelectedItemsApi(), {
    wrapper: RecoilRoot,
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);

  // add some items
  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    result.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);

  // let's try to delete them and add them in the reversed order:
  act(() => {
    result.current.decreaseUnits('i_1');
  });
  act(() => {
    result.current.decreaseUnits('i_2');
  });

  act(() => {
    result.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);
});

it('resets selected items correctly', () => {
  const { result } = renderHook(() => useSelectedItemsApi(), {
    wrapper: RecoilRoot,
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);

  // add some items
  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemTitle: 'I title 1',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });
  act(() => {
    result.current.select({
      itemID: 'i_2',
      itemTitle: 'I title 2',
      itemUnitAmount: 100_00,
      units: 1,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Immutable.List [
      Object {
        "itemID": "i_1",
        "itemTitle": "I title 1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
      Object {
        "itemID": "i_2",
        "itemTitle": "I title 2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    ]
  `);

  // let's reset the selected items
  act(() => {
    result.current.reset();
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`Immutable.List []`);
});
