// @flow

import * as Immutable from 'immutable';
import { isBrowser } from '@adeira/js';
import { atom, selector, useRecoilState, DefaultValue, useRecoilValue } from 'recoil';

export type AtomItemType = {
  +itemID: string,
  +itemTitle: string,
  +itemUnitAmount: number,
  +units: number,
};

type AtomValue = Immutable.List<AtomItemType>;

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    if (!isBrowser()) {
      return;
    }

    const savedValue = window.localStorage.getItem(key);
    if (savedValue != null && savedValue !== 'undefined') {
      const reviver = function (key, value) {
        return Immutable.isKeyed(value) ? value.toObject() : value.toList();
      };
      const revivedValue = ((Immutable.fromJS(JSON.parse(savedValue), reviver): any): AtomValue);
      setSelf(revivedValue);
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const selectedItemsAtom = atom<AtomValue>({
  key: 'selectedItems',
  default: Immutable.List(),
  effects_UNSTABLE: [localStorageEffect('ycbo:selectedItems')],
});

type SelectorItem = {
  +totalSelectedItems: number,
  +totalPrice: number,
};

const selectedItemsStatsSelector = selector<SelectorItem>({
  key: 'selectedItemsStats',
  get: ({ get }) => {
    const selectedItems = get(selectedItemsAtom);

    let totalSelectedItems = 0;
    let totalPrice = 0;
    selectedItems.forEach((itemMap) => {
      totalSelectedItems += itemMap.units;
      totalPrice += itemMap.units * itemMap.itemUnitAmount;
    });

    return {
      totalSelectedItems,
      totalPrice, // TODO: adjust ¹⁄₁₀₀ centavo
    };
  },
});

export default function useSelectedItemsApi(): {
  +selectedItems: AtomValue,
  +select: (AtomItemType) => void,
  +increaseUnits: (string) => void,
  +decreaseUnits: (string) => void,
  +reset: () => void,
  +stats: SelectorItem,
} {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsAtom);
  const selectedItemsStats = useRecoilValue(selectedItemsStatsSelector);

  return {
    selectedItems,
    // Select adds a new item to the array while preserving order of the inserts. It de-duplicates
    // the items by their `itemID` so already existing items increase number of units instead.
    select: (newItem) => {
      setSelectedItems((previousItems) => {
        const itemIndex = previousItems.findIndex((item) => item.itemID === newItem.itemID);
        if (itemIndex === -1) {
          return previousItems.push(newItem);
        }
        const previousItem = previousItems.get(itemIndex);
        if (previousItem == null) {
          return previousItems;
        }
        return previousItems.set(
          itemIndex,
          {
            ...previousItem,
            ...newItem,
            units: (previousItem.units ?? 0) + 1,
          }, // how many units items (units) selected}
        );
      });
    },
    // This function expects already some items in memory and simply increases number of units.
    increaseUnits: (itemID) => {
      setSelectedItems((previousItems) => {
        const itemIndex = previousItems.findIndex((item) => item.itemID === itemID);
        const previousItem = previousItems.get(itemIndex);
        if (previousItem == null) {
          return previousItems;
        }
        const newUnits = previousItem.units + 1;
        return previousItems.set(itemIndex, { ...previousItem, units: newUnits });
      });
    },
    // This function expects already some items in memory and simply decreases number of units.
    decreaseUnits: (itemID) => {
      setSelectedItems((previousItems) => {
        const itemIndex = previousItems.findIndex((item) => item.itemID === itemID);
        if (itemIndex === -1) {
          return previousItems;
        }
        const previousItem = previousItems.get(itemIndex);
        if (previousItem == null) {
          return previousItems;
        }
        const newUnits = previousItem.units - 1;
        if (newUnits > 0) {
          return previousItems.set(itemIndex, { ...previousItem, units: newUnits });
        }
        // remove the item completely
        return previousItems.delete(itemIndex);
      });
    },
    reset: () => {
      setSelectedItems(() => Immutable.List());
    },
    stats: selectedItemsStats,
  };
}
