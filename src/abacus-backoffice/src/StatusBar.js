// @flow

import { Note } from '@adeira/sx-design';
import React, { type Node } from 'react';
import { useRecoilState } from 'recoil';

import { uiStatusBarAtom } from './recoil/uiStatusBarAtom';

export default function StatusBar(): Node {
  const [statusBar] = useRecoilState(uiStatusBarAtom);

  if (statusBar.message == null) {
    return null;
  }

  return <Note tint={statusBar.type}>{statusBar.message}</Note>;
}
