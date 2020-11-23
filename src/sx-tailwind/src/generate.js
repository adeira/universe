// @flow

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import SignedSource from '@adeira/signed-source';
import resolveConfig from 'tailwindcss/resolveConfig';

import { generateTailwind } from './tailwindToSx';

const tailwindConfig = resolveConfig({});

(async function run() {
  const { styles, keyframes } = await generateTailwind(tailwindConfig);

  const codeStyles = SignedSource.signFile(`
  /**
   * ${SignedSource.getSigningToken()}
   * @flow
   *
   * Tailwind CSS file converted into stylesheets for SX
   *
   * @see https://tailwindcss.com/
   * @see https://github.com/adeira/sx
   */

  export const tailwindKeyframes: {| +[string]: any |} = Object.freeze(${JSON.stringify(
    keyframes,
  )});

  export const tailwindStyles: {| +[string]: any |} = Object.freeze(${JSON.stringify(styles)});
  `);

  const codeTypes = SignedSource.signFile(`
  /**
   * ${SignedSource.getSigningToken()}
   * @flow
   *
   * Union type of all Tailwind CSS classes
   *
   * @see https://tailwindcss.com/
   */

  export type TailwindClassNames = "${Object.keys(styles).join('"|"')}";
  `);

  const filesConfig = [
    { code: codeStyles, filename: 'tailwindStyles.js' },
    { code: codeTypes, filename: 'types.js' },
  ];

  const options = await prettier.resolveConfig(__filename);
  filesConfig.forEach(({ code, filename }) => {
    const formatted = prettier.format(code, { filepath: 'mock.js', ...options });
    fs.writeFileSync(path.join(__dirname, '__generated__', filename), formatted, 'utf8');
  });
})();
