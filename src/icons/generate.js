// @flow

/* eslint-disable import/no-extraneous-dependencies */
import { warning } from '@adeira/js';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import * as changeCase from 'change-case';
/* eslint-enable import/no-extraneous-dependencies */

import transform from './svg2jsx';

// yarn monorepo-babel-node src/sx-icons/generate.js

const SOURCE_PATH = path.join(__dirname, 'original');
const DESTINATION_PATH = path.join(__dirname, '__generated__');

async function prettify(uglyCode: string): Promise<string> {
  const config = await prettier.resolveConfig(__filename);
  return prettier.format(uglyCode, {
    parser: 'flow',
    ...config,
  });
}

(async () => {
  const collectedComponents = [];

  const metaFile = path.join(DESTINATION_PATH, `__meta.js`);

  for (const originalFilename of fs.readdirSync(SOURCE_PATH)) {
    const componentName = originalFilename.replace(/\.svg$/, '');
    const componentNamePascalCase = changeCase.pascalCase(componentName);

    collectedComponents.push({
      svgName: componentName,
      reactName: componentNamePascalCase,
    });

    const sourceFile = path.join(SOURCE_PATH, originalFilename);
    const destinationFile = path.join(DESTINATION_PATH, `${componentNamePascalCase}.js`);

    transform(fs.readFileSync(sourceFile, 'utf8'), componentNamePascalCase).then(
      (transformedIcon) => {
        warning(false, destinationFile);
        // eslint-disable-next-line promise/no-nesting
        prettify(transformedIcon).then((prettyCode) => {
          fs.writeFileSync(destinationFile, prettyCode);
        });
      },
    );
  }

  fs.writeFileSync(
    metaFile,
    await prettify(
      `// @flow strict

import React, { type AbstractComponent } from 'react';

export type IconNames = ${collectedComponents.map(({ svgName }) => `'${svgName}'`).join(' | ')};

export const ComponentsMap = {
  ${collectedComponents
    .map(
      ({ svgName, reactName }) =>
        `${svgName}: (React.lazy(() => import('./${reactName}')): AbstractComponent<{}>)`,
    )
    .join(',\n')}
};
`,
    ),
  );
})();
