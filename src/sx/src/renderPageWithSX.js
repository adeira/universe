// @flow

import * as React from 'react';

import styleCollector, { StyleNode } from './StyleCollector';
import renderAtomicClass from './css-renderers/renderAtomicClass';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

function renderAtomic(styleCollector, bumpSpecificity = false) {
  let sxStyle = '';
  styleCollector.forEach((value, key) => {
    if (value instanceof StyleNode) {
      sxStyle += `${renderAtomicClass({
        className: key,
        styleName: value.propertyName,
        styleValue: value.styleValue,
        pseudo: value.pseudo,
        bumpSpecificity,
      })}`;
    } else {
      const bumpSpecificity = key.startsWith('@media ');
      sxStyle += `${key} {${renderAtomic(value.styles, bumpSpecificity)}}`;
    }
  });

  return sxStyle;
}

// Note: this is currently a bit Next.js centric, we can make it more abstract later
export default function renderPageWithSX(renderPage: () => any): RenderPageResult {
  const html = renderPage();

  const sxStyle = renderAtomic(styleCollector.styles);

  return {
    ...html,
    styles: [
      <style key="adeira-sx" data-adeira-sx={true}>
        {sxStyle}
      </style>,
    ],
  };
}
