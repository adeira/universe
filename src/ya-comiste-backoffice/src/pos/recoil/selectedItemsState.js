// @flow

import { isBrowser } from '@adeira/js';
import { atom, selector, useRecoilState, DefaultValue, useRecoilValue } from 'recoil';

/* global window */

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  if (!isBrowser()) {
    return;
  }

  const savedValue = window.localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

type AtomItem = {|
  +[string]: {|
    +itemID: string,
    +itemUnitAmount: number,
    +units: number,
  |},
|};

const selectedItemsAtom = atom<AtomItem>({
  key: 'selectedItems',
  default: {},
  effects_UNSTABLE: [
    localStorageEffect('BO:selectedItems'), // TODO: application specific naming
  ],
});

type SelectorItem = {|
  +totalSelectedItems: number,
  +totalPrice: number,
|};

const selectedItemsStatsSelector = selector<SelectorItem>({
  key: 'selectedItemsStats',
  get: ({ get }) => {
    const selectedItems = get(selectedItemsAtom);

    let totalSelectedItems = 0;
    let totalPrice = 0;
    Object.keys(selectedItems).forEach((key) => {
      const v = selectedItems[key];
      totalSelectedItems += v.units;
      totalPrice += v.units * v.itemUnitAmount;
    });

    return {
      totalSelectedItems,
      totalPrice, // TODO: adjust ¹⁄₁₀₀ centavo
    };
  },
});

export default function useSelectedItemsApi(): $FlowFixMe {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsAtom);
  const selectedItemsStats = useRecoilValue(selectedItemsStatsSelector);

  return {
    selectedItems,
    select: (item) => {
      setSelectedItems((previousItems) => {
        const previousItem = previousItems[item.itemID];
        return {
          ...previousItems,
          [item.itemID]: {
            ...previousItem,
            ...item,
            units: (previousItem?.units ?? 0) + 1, // how many units items (units) selected
          },
        };
      });
    },
    // deselect: (itemID) => setSelectedItems((previousItems) => previousItems.delete(itemID)),
    stats: selectedItemsStats,
  };
}
