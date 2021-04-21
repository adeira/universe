// @flow

import type { Node } from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { SxDesignProvider } from '../index';
import type { SupportedLocales, SupportedDirections } from '../src/constants';

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

type StorybookGlobalTypes = {|
  +locale: {|
    +name: string,
    +description: string,
    +defaultValue: SupportedLocales,
    +toolbar: {|
      +icon: 'globe',
      +items: $ReadOnlyArray<{|
        +value: SupportedLocales,
        +right: string,
        +title: string,
      |}>,
    |},
  |},
  +direction: {|
    +name: string,
    +description: string,
    +defaultValue: SupportedDirections,
    +toolbar: {|
      +icon: 'redirect',
      +items: $ReadOnlyArray<{|
        +value: SupportedDirections,
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
        { value: 'no-NO', right: '🇳🇴', title: 'Norsk (NO)' },
        { value: 'ru-RU', right: '🇷🇺', title: 'Русский (RU)' },
        { value: 'uk-UA', right: '🇺🇦', title: 'Українська (UA)' },
      ],
    },
  },
  direction: {
    name: 'Direction',
    description: 'Layout direction',
    defaultValue: 'ltr',
    toolbar: {
      icon: 'redirect',
      items: [
        { value: 'ltr', title: 'Left to right (LTR)' },
        { value: 'rtl', title: 'Right to left (RTL)' },
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
        +locale: SupportedLocales,
        +direction: SupportedDirections,
        +backgrounds?: {| +value: string |},
      |},
    |},
  ): Node => {
    return (
      <SxDesignProvider
        locale={globals.locale}
        direction={globals.direction}
        theme={globals.backgrounds?.value === DARK_MODE_BACKGROUND ? 'dark' : 'light'}
      >
        <Story />
      </SxDesignProvider>
    );
  },
];
