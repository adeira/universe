// @flow

import hashStyle from './hashStyle';
import styleBuffer from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSPropertyTypes,
|};

function hashStylePair(styleName: string, styleValue: string): string {
  // We need to hash the pseudo-classes as well otherwise it could happen that we generate such CSS, for example:
  //
  //  ._2Iiue4{color:red}
  //  ._2Iiue4:focus{color:red}
  //
  // That's an issue because we cannot express that it should be red ONLY when focused in HTML (it would be red always):
  //
  //  <a href="/rules" class="_2Iiue4">Our rules</a>
  return hashStyle(`${styleName}#${styleValue}`);
}

function renderStylePair(styleName, styleValue) {
  const transformedStyleName = transformStyleName(styleName);
  // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
  return `${transformedStyleName}:${transformValue(styleName, styleValue)}`;
}

export default function create<T: SheetDefinitions>(
  sheetDefinitions: T,
): (...$ReadOnlyArray<$Keys<T>>) => string {
  const classNames = {};

  for (const [sheetDefinitionName, sheetDefinition] of Object.entries(sheetDefinitions)) {
    // $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/5838
    const hashes = new Set();
    // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
    for (const [styleName, styleValue] of Object.entries(sheetDefinition)) {
      // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
      const hash = hashStylePair(styleName, styleValue);
      styleBuffer.set(hash, renderStylePair(styleName, styleValue));
      hashes.add(hash);
    }
    classNames[sheetDefinitionName] = hashes;
  }

  return function sx(...sheetDefinitionNames) {
    let classes = new Set();
    for (const sheetDefinitionName of sheetDefinitionNames) {
      classes = new Set([...classes, ...classNames[sheetDefinitionName]]);
    }
    return Array.from(classes).join(' ');
  };
}
