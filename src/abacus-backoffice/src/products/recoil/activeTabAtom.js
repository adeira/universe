// @flow

import { atom, type RecoilState } from 'recoil';
import { string } from '@recoiljs/refine';
import { urlSyncEffect } from 'recoil-sync';

export default (atom({
  key: 'activeTab',
  default: null,
  effects: [
    urlSyncEffect({
      storeKey: 'json-url',
      refine: string(),
      history: 'push',
    }),
  ],
}): RecoilState<string | null>);
