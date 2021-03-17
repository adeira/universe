// @flow

import type { Node } from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { SxDesignProvider } from '../index';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // TODO: how to switch the background automatically based on `darkMode`?
  // backgrounds: {
  //   disable: true,
  //   grid: {
  //     disable: true,
  //   },
  // },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
    defaultViewport: 'tablet',
  },
};

type StorybookSupportedLocales = 'en-US' | 'es-MX';
type StorybookGlobalTypes = {|
  +locale: {|
    +name: string,
    +description: string,
    +defaultValue: StorybookSupportedLocales,
    +toolbar: {|
      +icon: 'globe',
      +items: $ReadOnlyArray<{|
        +value: StorybookSupportedLocales,
        +right: string,
        +title: string,
      |}>,
    |},
  |},
  +theme: $FlowFixMe,
|};

export const globalTypes: StorybookGlobalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', right: '🇺🇸', title: 'English (US)' },
        { value: 'es-MX', right: '🇲🇽', title: 'Español (MX)' },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'eye',
      items: ['light', 'dark'],
    },
  },
};

export const decorators = [
  (
    Story: $FlowFixMe,
    {
      globals,
    }: {|
      +globals: {|
        +locale: StorybookSupportedLocales,
        +theme: 'light' | 'dark',
      |},
    |},
  ): Node => {
    return (
      <SxDesignProvider locale={globals.locale} darkMode={globals.theme === 'dark'}>
        <Story />
      </SxDesignProvider>
    );
  },
];
