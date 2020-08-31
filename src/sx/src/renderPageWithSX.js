// @flow

import * as React from 'react';

import { styleBuffer, mediaStyleBuffer } from './styleBuffer';
import renderAtomicClasses from './css-renderers/renderAtomicClasses';
import renderMediaQuery from './css-renderers/renderMediaQuery';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

// Not: this is currently a bit Next.js centric, we can make it more abstract later
export default function renderPageWithSX(renderPage: () => any): RenderPageResult {
  const html = renderPage();

  let prefix = '';
  let sxStyle = renderAtomicClasses(Array.from(styleBuffer.values()));
  for (const [key, value] of mediaStyleBuffer) {
    sxStyle += `${prefix}${renderMediaQuery(key, Array.from(value.values()))}}`;
    prefix = ' ';
  }

  return {
    ...html,
    styles: [
      <style key="adeira-sx" data-adeira-sx={true}>
        {sxStyle}
      </style>,
    ],
  };
}
