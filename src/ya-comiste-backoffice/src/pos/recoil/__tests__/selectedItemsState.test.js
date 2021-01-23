// @flow

import { renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';

import useSelectedItemsApi from '../selectedItemsState';

it('appends items as expected', () => {
  const { result } = renderHook(() => useSelectedItemsApi(), {
    wrapper: RecoilRoot,
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`Object {}`);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 0,
      "totalSelectedItems": 0,
    }
  `);

  act(() => {
    result.current.select({
      itemID: 'i_1',
      itemUnitAmount: 100_00,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Object {
      "i_1": Object {
        "itemID": "i_1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    }
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
      itemUnitAmount: 100_00,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Object {
      "i_1": Object {
        "itemID": "i_1",
        "itemUnitAmount": 10000,
        "units": 1,
      },
      "i_2": Object {
        "itemID": "i_2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    }
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
      itemUnitAmount: 100_00,
    });
  });

  expect(result.current.selectedItems).toMatchInlineSnapshot(`
    Object {
      "i_1": Object {
        "itemID": "i_1",
        "itemUnitAmount": 10000,
        "units": 2,
      },
      "i_2": Object {
        "itemID": "i_2",
        "itemUnitAmount": 10000,
        "units": 1,
      },
    }
  `);
  expect(result.current.stats).toMatchInlineSnapshot(`
    Object {
      "totalPrice": 30000,
      "totalSelectedItems": 3,
    }
  `);
});
