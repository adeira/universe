// @flow

import type { Node } from 'react';

import { SxDesignProvider } from '../index';
import type { SupportedLocales } from '../src/constants';

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
};

type StorybookGlobalTypes = {
  +locale: {
    +name: string,
    +description: string,
    +defaultValue: SupportedLocales,
    +toolbar: {
      +icon: 'globe',
      +items: $ReadOnlyArray<{
        +value: SupportedLocales,
        +right: string,
        +title: string,
      }>,
    },
  },
};

export const globalTypes: StorybookGlobalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        // This makes the locales changeable in the Storybook top bar.
        // See README.md for more details.
        { value: 'ar-AR', right: '🇦🇪', title: 'العربية/عربي (AR)' },
        { value: 'cs-CZ', right: '🇨🇿', title: 'Čeština (CZ)' },
        { value: 'en-US', right: '🇺🇸', title: 'English (US)' },
        { value: 'es-MX', right: '🇲🇽', title: 'Español (MX)' },
        { value: 'no-NO', right: '🇳🇴', title: 'Norsk (NO)' },
        { value: 'ru-RU', right: '🇷🇺', title: 'Русский (RU)' },
        { value: 'uk-UA', right: '🇺🇦', title: 'Українська (UA)' },
      ],
    },
  },
};

export const decorators = [
  (
    Story: $FlowFixMe,
    {
      globals,
    }: {
      +globals: {
        +locale: SupportedLocales,
        +backgrounds?: { +value: string },
      },
    },
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
