// @flow

import { isBrowser } from '@adeira/js';
import { atom, DefaultValue, type RecoilState } from 'recoil';

export type State = {
  +categories: {
    +all: boolean,
  },
  +relevance: {
    +price: 'LOW_TO_HIGH' | 'HIGH_TO_LOW',
  },
};

const FILTERS_SEP = ',';

export default (atom<State>({
  key: 'filtersAtom',
  default: {
    categories: {
      all: true,
    },
    relevance: {
      price: 'LOW_TO_HIGH',
    },
  },
  effects_UNSTABLE: [
    /**
     * 🚧 WIP 🚧
     *
     * Purpose of this effect is to persist the selected filter to the URL (so user can share the
     * link easily). It tries to create a compressed representation of the filters.
     */
    ({ onSet, setSelf }) => {
      if (isBrowser()) {
        const urlParams = new URLSearchParams(window.location.search);
        for (const filter of urlParams.get('f')?.split(FILTERS_SEP) ?? []) {
          const [key, value] = filter.split(':');
          // TODO: restore the filters properly
          if (key === 'rp') {
            setSelf({
              categories: { all: true },
              relevance: { price: value === 'lh' ? 'LOW_TO_HIGH' : 'HIGH_TO_LOW' },
            });
          }
        }
      }

      onSet((newState) => {
        if (newState instanceof DefaultValue) {
          // TODO
        } else {
          const filters = new Map();

          if (newState.categories.all === true) {
            filters.set('ca', 1);
          } else if (newState.categories.all === false) {
            filters.set('ca', 0);
          } else {
            (newState.categories.all: empty);
          }

          if (newState.relevance.price === 'LOW_TO_HIGH') {
            filters.set('rp', 'lh');
          } else if (newState.relevance.price === 'HIGH_TO_LOW') {
            filters.set('rp', 'hl');
          } else {
            (newState.relevance.price: empty);
          }

          let filterQuery = '';
          let separator = '';
          filters.forEach((value, key) => {
            filterQuery += `${separator}${key}:${value}`;
            separator = FILTERS_SEP;
          });

          // For example: `?f=ca:1,rp:hl` (all categories, price high to low)
          window.history.replaceState(null, null, `?f=${filterQuery}`);
        }
      });
    },
  ],
}): RecoilState<State>);
