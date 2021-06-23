// @flow

import { Note } from '@adeira/sx-design';
import { useRouter } from 'next/router';
import React, { useEffect, type Node } from 'react';
import { useRecoilState } from 'recoil';

import { uiStatusBarAtom } from './recoil/uiStatusBarAtom';

export default function StatusBar(): Node {
  const router = useRouter();
  const [statusBar, setStatusBar] = useRecoilState(uiStatusBarAtom);

  useEffect(() => {
    const handleRouteChange = () => {
      setStatusBar({ message: null }); // remove the status message when route changes
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, setStatusBar]);

  if (statusBar.message == null) {
    return null;
  }

  return <Note tint={statusBar.type}>{statusBar.message}</Note>;
}
