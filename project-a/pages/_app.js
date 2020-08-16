// @flow

import React from 'react';
import { IntlVariations, init } from 'fbt';

import './_app.css';

const viewerContext = {
  GENDER: IntlVariations.GENDER_UNKNOWN,
  locale: 'es_LA', // "en_US",
};

init({
  translations: require('../translatedFbts.json'),
  fbtEnumManifest: require('../.enum_manifest.json'),
  hooks: {
    getViewerContext: () => viewerContext,
  },
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
