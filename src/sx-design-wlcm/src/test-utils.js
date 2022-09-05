// @flow

import { init as FbtInit, IntlVariations as FbtIntlVariations } from 'fbt';
import { render as renderWithoutProviders } from '@testing-library/react';

const initFbt = () => {
  FbtInit({
    translations: {}, // TODO
    hooks: {
      getViewerContext: () => ({
        GENDER: FbtIntlVariations.GENDER_UNKNOWN,
        regionalLocale: 'en_US',
        locale: 'en_US',
      }),
    },
  });
};

// export custom render method(s) and other helpers:
export { initFbt, renderWithoutProviders as render };
