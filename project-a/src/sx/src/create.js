// @flow

import hashStyle from './hashStyle';
import styleBuffer from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSPropertyTypes,
|};

export default function create<T: SheetDefinitions>(sheetDefinitions: T): ($Keys<T>) => string {
  const classNames = {};
  for (const [sheetDefinitionName, sheetDefinition] of Object.entries(sheetDefinitions)) {
    const hashes = new Set();
    // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
    for (const [styleName, styleValue] of Object.entries(sheetDefinition)) {
      const style = JSON.stringify({ [styleName]: styleValue }); // TODO: stable stringify
      const hash = hashStyle(style);
      const transformedStyleName = transformStyleName(styleName);
      // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
      styleBuffer.set(hash, `${transformedStyleName}:${transformValue(styleName, styleValue)}`);
      hashes.add(hash);
    }
    classNames[sheetDefinitionName] = Array.from(hashes).join(' ');
  }

  return function sx(sheetDefinitionName: $Keys<T>): string {
    return classNames[sheetDefinitionName];
  };
}
