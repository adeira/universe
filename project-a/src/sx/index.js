// @flow

import murmurHash from '@adeira/murmur-hash';
import { paramCase } from 'change-case';

import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

function transformStyleName(styleName: string): string {
  return paramCase(styleName);
}

// Here we are collecting all the styles while doing SSR.
const styleBuffer = new Map<string, string>();

export function renderStatic(renderFunc: () => $FlowFixMe): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    css += `${prefix}.${key}{${value}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSPropertyTypes,
|};

const sx: {|
  +create: <T: SheetDefinitions>(sheetDefinitions: T) => ($Keys<T>) => string,
|} = {
  create: function create(sheetDefinitions) {
    const classNames = {};
    for (const [sheetDefinitionName, sheetDefinition] of Object.entries(sheetDefinitions)) {
      const hashes = new Set();
      // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
      for (const [styleName, styleValue] of Object.entries(sheetDefinition)) {
        const style = JSON.stringify({ [styleName]: styleValue }); // TODO: stable stringify
        const hash = murmurHash(style).replace(/^[0-9]/, (s) => `_${s}`); // CSS class cannot start with number
        const transformedStyleName = transformStyleName(styleName);
        // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
        styleBuffer.set(hash, `${transformedStyleName}:${transformValue(styleName, styleValue)}`);
        hashes.add(hash);
      }
      classNames[sheetDefinitionName] = Array.from(hashes).join(' ');
    }

    return function sx(sheetDefinitionName) {
      return classNames[sheetDefinitionName];
    };
  },
};

export default sx;
