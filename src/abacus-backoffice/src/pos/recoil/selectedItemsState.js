// @flow

import * as Immutable from 'immutable';
import { isBrowser } from '@adeira/js';
import { atom, selector, useRecoilState, DefaultValue, useRecoilValue } from 'recoil';

export type AtomItemType = {
  +__compositeID: string, // composite of product ID and addons IDs for deduplication
  +units: number,
  +itemID: string, // original product ID
  +itemTitle: string,
  +itemUnitAmount: number,
  +itemAddons?: $ReadOnlyArray<{
    +itemAddonID: string,
    +itemAddonTitle: string,
    +itemAddonExtraPrice: number,
  }>,
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
  effects_UNSTABLE: [localStorageEffect('abacus-backoffice:pos:selectedItems')],
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
      const itemAddonExtraPrice =
        itemMap.itemAddons?.reduce((acc, itemAddon) => {
          return acc + itemAddon.itemAddonExtraPrice;
        }, 0) ?? 0;

      totalSelectedItems += itemMap.units;
      totalPrice +=
        itemMap.units * itemMap.itemUnitAmount + // price per product unit * number of product units
        itemMap.units * itemAddonExtraPrice; // extra addon price * number of product units
    });

    return {
      totalSelectedItems,
      totalPrice, // TODO: adjust ¹⁄₁₀₀ centavo
    };
  },
});

export default function useSelectedItemsApi(): {
  +selectedItems: AtomValue,
  +select: (
    $Diff<
      AtomItemType,
      // composite ID is being computed when the idem is selected (hence the omission)
      { +__compositeID: string },
    >,
  ) => void,
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
        // Sort the addons so we can achieve stable ID and order:
        const newItemAddons = [...(newItem.itemAddons ?? [])].sort((a, b) => {
          // $FlowIgnore[unnecessary-optional-chain]: https://github.com/facebook/flow/issues/8187#issuecomment-703424208
          const idA = a.itemAddonID?.toUpperCase(); // ignore upper and lowercase
          // $FlowIgnore[unnecessary-optional-chain]: https://github.com/facebook/flow/issues/8187#issuecomment-703424208
          const idB = b.itemAddonID?.toUpperCase();
          if (idA < idB) {
            return -1;
          } else if (idA > idB) {
            return 1;
          }
          return 0;
        });

        // Item ID composes of the original item ID with additional item addons IDs (we use it later for deduplication).
        const __compositeID =
          newItemAddons.reduce((acc, curVal) => {
            return `${acc}%${curVal.itemAddonID}`;
          }, newItem.itemID) ?? newItem.itemID;

        const itemIndex = previousItems.findIndex((item) => item.__compositeID === __compositeID);
        if (itemIndex === -1) {
          return previousItems.push({
            __compositeID,
            units: newItem.units,
            itemID: newItem.itemID,
            itemTitle: newItem.itemTitle,
            itemUnitAmount: newItem.itemUnitAmount,
            itemAddons: newItemAddons,
          });
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
        const itemIndex = previousItems.findIndex((item) => item.__compositeID === itemID);
        if (itemIndex === -1) {
          return previousItems;
        }
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
        const itemIndex = previousItems.findIndex((item) => item.__compositeID === itemID);
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
