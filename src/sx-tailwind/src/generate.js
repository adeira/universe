// @flow

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import SignedSource from '@adeira/signed-source';

import generateSX from './sxGenerator';

// wget https://unpkg.com/tailwindcss@1.8.3/dist/tailwind.css
const css = fs.readFileSync(path.join(__dirname, 'tailwind.css'));
const styles = generateSX(css);

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

import { type TailwindClassNames } from './types';

export const tailwindStyles: {| +[TailwindClassNames]: any |} = Object.freeze(${JSON.stringify(
  styles,
)});
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

const codeSxt = SignedSource.signFile(`
/**
 * ${SignedSource.getSigningToken()}
 * @flow
 */

import * as sx from '@adeira/sx';

import { tailwindStyles } from './tailwindStyles';
import { type TailwindClassNames } from './types';

export function sxt(...names: $ReadOnlyArray<TailwindClassNames>): string {
  const styles = Object.fromEntries(
    names.filter((name) => name in tailwindStyles).map((name) => [name, tailwindStyles[name]]),
  );

  return sx.create(styles)(...names);
}
`);

const filesConfig = [
  { code: codeStyles, filename: 'tailwindStyles.js' },
  { code: codeSxt, filename: 'sxt.js' },
  { code: codeTypes, filename: 'types.js' },
];

prettier.resolveConfig(__filename).then((options) => {
  filesConfig.forEach(({ code, filename }) => {
    const formatted = prettier.format(code, { filepath: 'mock.js', ...options });
    fs.writeFileSync(path.join(__dirname, '__generated__', filename), formatted, 'utf8');
  });
});
