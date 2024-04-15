// @flow

import './global.css';
import { SxDesignProvider } from '../index';

const DARK_MODE_BACKGROUND = '#333333'; // TODO: do not rely on Storybook default

const preview = {
  decorators: [
    (Story /*: $FlowFixMe */, { globals } /*: $FlowFixMe */) /*: $FlowFixMe */ => {
      return (
        <SxDesignProvider
          locale={globals.locale}
          theme={globals.backgrounds?.value === DARK_MODE_BACKGROUND ? 'dark' : 'light'}
          // eslint-disable-next-line no-console
          onErrorBoundaryCatch={console.error}
        >
          <Story />
        </SxDesignProvider>
      );
    },
  ],
  globalTypes: {
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
  },
};

export default preview;
