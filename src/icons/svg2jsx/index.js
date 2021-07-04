// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import svgr from '@svgr/core';

export default function transform(svgCode: string, iconName: string): Promise<string> {
  return svgr(
    svgCode,
    {
      icon: true, // Replace SVG "width" and "height" value by "1em" in order to make SVG size inherits from text size.
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      template: ({ template }, opts, { componentName, jsx }) => {
        const code = `
          // @flow strict
          /* eslint-disable import/newline-after-import */

          import React, { type Node } from 'react';

          export default function %%COMPONENT_NAME%%(props: {}): Node {
            return %%JSX%%;
          };
        `;

        const flowTpl = template.smart(code, {
          plugins: ['flow'],
          preserveComments: true,
          syntacticPlaceholders: true,
        });

        return flowTpl({
          COMPONENT_NAME: componentName,
          JSX: jsx,
        });
      },
    },
    {
      componentName: iconName,
    },
  );
}
