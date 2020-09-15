// @flow

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import SignedSource from '@adeira/signed-source';

import generateSX from './sxGenerator';

// wget https://unpkg.com/tailwindcss@1.8.3/dist/tailwind.css
const css = fs.readFileSync(path.join(__dirname, 'tailwind.css'));
const styles = generateSX(css);

const code = SignedSource.signFile(`
/**
 * ${SignedSource.getSigningToken()}
 * @flow
 *
 * Tailwind CSS file converted into SX stylesheets
 *
 * @see https://tailwindcss.com/
 * @see https://github.com/adeira/sx
 */

import * as sx from '@adeira/sx';

const sxTailwind: { +[key: string]: any, ... } = sx.create(${JSON.stringify(styles)});

export default sxTailwind;
`);

prettier.resolveConfig(__filename).then((options) => {
  const formatted = prettier.format(code, { filepath: 'mock.js', ...options });
  fs.writeFileSync(path.join(__dirname, '__generated__', 'sxTailwind.js'), formatted, 'utf8');
});
