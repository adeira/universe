// @flow

import type { Node } from 'react';
import { atom, type RecoilState } from 'recoil';

type State = {|
  +message: null | FbtWithoutString | Node,
  +type?: 'SUCCESS' | 'ERROR',
|};

export const uiStatusBarAtom = (atom({
  key: 'uiStatusBarAtom',
  default: {
    message: null,
  },
}): RecoilState<State>);
