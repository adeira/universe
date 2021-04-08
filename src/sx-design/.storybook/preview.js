// @flow

import type { Node } from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { SxDesignProvider } from '../index';

const DARK_MODE_BACKGROUND = '#333';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    disable: false,
    default: 'twitter',
    values: [
      { name: 'light mode', value: '#fff' },
      { name: 'dark mode', value: DARK_MODE_BACKGROUND },
    ],
    grid: {
      disable: false,
    },
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
    defaultViewport: 'tablet',
  },
};

type StorybookSupportedLocales = 'cs-CZ' | 'en-US' | 'es-MX';
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
|};

export const globalTypes: StorybookGlobalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'cs-CZ', right: '🇨🇿', title: 'Čeština (CZ)' },
        { value: 'en-US', right: '🇺🇸', title: 'English (US)' },
        { value: 'es-MX', right: '🇲🇽', title: 'Español (MX)' },
      ],
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
        +backgrounds?: {| +value: string |},
      |},
    |},
  ): Node => {
    return (
      <SxDesignProvider
        locale={globals.locale}
        theme={globals.backgrounds?.value === DARK_MODE_BACKGROUND ? 'dark' : 'light'}
      >
        <Story />
      </SxDesignProvider>
    );
  },
];
