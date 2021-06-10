// @flow

import { atom, DefaultValue, type RecoilState } from 'recoil';

export type State = {
  +categories: {
    +all: boolean,
  },
  +relevance: {
    +price: 'LOW_TO_HIGH' | 'HIGH_TO_LOW',
  },
};

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
    ({ onSet }) => {
      // TODO: implement the URL hash restoration

      onSet((newState) => {
        if (newState instanceof DefaultValue) {
          // TODO
        } else {
          const chunks = new Map();

          if (newState.categories.all === true) {
            chunks.set('ca', 1);
          } else if (newState.categories.all === false) {
            chunks.set('ca', 0);
          } else {
            (newState.categories.all: empty);
          }

          if (newState.relevance.price === 'LOW_TO_HIGH') {
            chunks.set('rp', 'lh');
          } else if (newState.relevance.price === 'HIGH_TO_LOW') {
            chunks.set('rp', 'hl');
          } else {
            (newState.relevance.price: empty);
          }

          let hash = '';
          let separator = '';
          chunks.forEach((value, key) => {
            hash += `${separator}${key}:${value}`;
            separator = ';';
          });

          // TODO: or better update the `?query=` string?
          window.location.hash = hash;
        }
      });
    },
  ],
}): RecoilState<State>);
