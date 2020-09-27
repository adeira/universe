// @flow

import * as React from 'react';

import styleCollector, { StyleNode, StyleCollector } from './StyleCollector';
import renderAtomicClass from './css-renderers/renderAtomicClass';

type RenderPageResult = {|
  +html: string,
  +head: $ReadOnlyArray<React.Node>,
  +styles: $ReadOnlyArray<any>,
|};

function renderAtomic(styleCollector, prefix = '') {
  let sxStyle = '';
  styleCollector.forEach((value, key) => {
    if (value instanceof StyleNode) {
      sxStyle += `${prefix}${renderAtomicClass({
        className: key,
        styleName: value.propertyName,
        styleValue: value.styleValue,
        pseudo: value.pseudo,
      })}`;
    } else {
      sxStyle += `${key} {${renderAtomic(value.styles)}}`;
    }
  });

  return sxStyle;
}

function getStyles(): Map<string, StyleNode | StyleCollector>[] {
  const styles = new Map();
  const mediaQueries = new Map();

  styleCollector.styles.forEach((value, key) => {
    if (value instanceof StyleCollector && key.startsWith('@media ')) {
      mediaQueries.set(key, value);
    } else {
      styles.set(key, value);
    }
  });

  return [styles, mediaQueries];
}

// Note: this is currently a bit Next.js centric, we can make it more abstract later
export default function renderPageWithSX(renderPage: () => any): RenderPageResult {
  const html = renderPage();

  const sxStyle = getStyles()
    .map((styles) => renderAtomic(styles))
    .join('');

  return {
    ...html,
    styles: [
      <style key="adeira-sx" data-adeira-sx={true}>
        {sxStyle}
      </style>,
    ],
  };
}
