// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';
import { useRecoilState } from 'recoil';

import { uiStatusBarAtom } from './recoil/uiStatusBarAtom';

export default function StatusBar(): Node {
  const [statusBar, setStatusBar] = useRecoilState(uiStatusBarAtom);

  if (statusBar.message == null) {
    return null;
  }

  const classes = {
    SUCCESS: 'statusBarSuccess',
    ERROR: 'statusBarError',
  };

  return (
    <div className={styles('statusBar', statusBar.type != null && classes[statusBar.type])}>
      <div className={styles('statusBarContent')}>{statusBar.message}</div>
      <button
        type="button"
        onClick={() => setStatusBar({ message: null })}
        className={styles('statusBarClose')}
      >
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="close"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
        </svg>
      </button>
    </div>
  );
}

// Warning colors: #fffbe6, #ffe58f
const styles = sx.create({
  statusBar: {
    display: 'flex',
    padding: '1rem',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#e6f7ff', // defaults to "info" colors
    borderColor: '#91d5ff',
  },
  statusBarSuccess: {
    backgroundColor: '#f6ffed',
    borderColor: '#b7eb8f',
  },
  statusBarError: {
    backgroundColor: '#fff2f0',
    borderColor: '#ffccc7',
  },
  statusBarContent: {
    flex: 1,
  },
  statusBarClose: {
    marginLeft: '1rem',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
});
