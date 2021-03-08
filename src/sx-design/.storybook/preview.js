// @flow

import type { Node, Element } from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { init as fbtInit, IntlVariations } from 'fbt';
import type { SupportedLocales } from '../src/constants';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
};

// TODO: expose this as `SxDesignProvider` so everyone can change the values from outside (?)
function IntlProvider({ children, locale }: {| +children: Node, +locale: SupportedLocales |}) {
  const supportedLocales = {
    // TODO: support translations lazy loading
    'en-US': require('../translations/out/en-US.json'),
    'es-MX': require('../translations/out/es-MX.json'),
  };

  fbtInit({
    translations: supportedLocales[locale],
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale,
      }),
    },
  });

  return children;
}

export const decorators = [
  (
    Story: $FlowFixMe,
    { globals }: {| +globals: {| +locale: StorybookSupportedLocales |} |},
  ): Node => (
    <IntlProvider locale={globals.locale}>
      <Story />
    </IntlProvider>
  ),
];
