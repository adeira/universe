// @flow

import { RouterContext } from 'next/dist/shared/lib/router-context';
import type { Node } from 'react';

import './global.css';
import SxDesignWlcmProvider from '../src/SxDesignWlcmProvider';

const DARK_MODE_BACKGROUND = '#333';

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      height: '650px',
      width: '320px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet',
    styles: {
      height: '1112px',
      width: '834px',
    },
    type: 'tablet',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    disable: false,
    default: 'light mode',
    values: [
      // This makes the themes (light/dark) changeable in the Storybook top bar.
      // See README.md for more details.
      { name: 'light mode', value: '#fff' },
      { name: 'dark mode', value: DARK_MODE_BACKGROUND },
    ],
    grid: {
      disable: false,
    },
  },
  viewport: {
    viewports: customViewports,
    defaultViewport: 'tablet',
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story: $FlowFixMe): Node => {
    return (
      <SxDesignWlcmProvider>
        <Story />
      </SxDesignWlcmProvider>
    );
  },
];
