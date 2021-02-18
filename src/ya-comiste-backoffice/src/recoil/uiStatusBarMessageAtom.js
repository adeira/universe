// @flow

import type { Node } from 'react';
import { atom, type RecoilState } from 'recoil';

type State = null | FbtWithoutString | Node;

export const uiStatusBarMessageAtom = (atom({
  key: 'uiStatusBarMessageAtom',
  default: null,
}): RecoilState<State>);
