// @flow

import fs from 'fs';
import path from 'path';
import { transform as svgrTransform } from '@svgr/core';

import prettify from './prettify';

export default function svg2jsx(svgCode: string, iconName: string): Promise<string> {
  return svgrTransform(
    svgCode,
    {
      icon: true, // replace SVG "width" and "height" value by "1em" in order to make SVG size inherits from text size
      svgo: true,
      svgoConfig: {
        multipass: true, // pass over SVGs multiple times to ensure all optimizations are applied
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      // The latest SVGR templating is kinda dumb, and we really just want to get an optimized SVG.
      // So, instead of trying to create a custom template, we return a partial SVG and do the rest
      // later with our proper template (see below).
      template: (variables, { tpl }) => tpl`${variables.jsx}`,
    },
    {
      componentName: iconName,
    },
  )
    .then((partialJSX) => {
      return fs
        .readFileSync(path.join(__dirname, 'templates', 'reactComponent.txt'), 'utf8')
        .replace('%%JSX%%', partialJSX)
        .replace('%%COMPONENT_NAME%%', iconName);
    })
    .then(prettify);
}
