// @flow

import * as React from 'react';

import StyleCollector from './StyleCollector';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

// Note: this is currently a bit Next.js centric, we can make it more abstract later
export default function renderPageWithSX(renderPage: () => any): RenderPageResult {
  const html = renderPage();

  return {
    ...html,
    styles: [
      <style key="adeira-sx" data-adeira-sx={true}>
        {StyleCollector.print()}
      </style>,
    ],
  };
}
