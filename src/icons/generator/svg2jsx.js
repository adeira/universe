// @flow

import fs from 'fs';
import path from 'path';
import svgr from '@svgr/core';

import prettify from './prettify';

export default function svg2jsx(svgCode: string, iconName: string): Promise<string> {
  return svgr(
    svgCode,
    {
      icon: true, // replace SVG "width" and "height" value by "1em" in order to make SVG size inherits from text size
      svgo: true,
      svgoConfig: {
        multipass: true, // pass over SVGs multiple times to ensure all optimizations are applied
      },
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      template: ({ template }, opts, { componentName, jsx }) => {
        const flowTpl = template.smart(
          fs.readFileSync(path.join(__dirname, 'templates', 'reactComponent.txt'), 'utf8'),
          {
            plugins: ['flow'],
            preserveComments: true,
            syntacticPlaceholders: true,
          },
        );

        return flowTpl({
          COMPONENT_NAME: componentName,
          JSX: jsx,
        });
      },
    },
    {
      componentName: iconName,
    },
  ).then(prettify);
}
