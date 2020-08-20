// @flow

import hashStyle from './hashStyle';
import styleBuffer from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

type SheetDefinitions = {|
  +[sheetName: string]:
    | AllCSSPropertyTypes
    | {| +__pseudoClasses: {| +[string]: AllCSSPropertyTypes |} |},
|};

function hashStylePair(styleName, styleValue) {
  // TODO: stable stringify
  const style = JSON.stringify({ [styleName]: styleValue });
  return hashStyle(style);
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

  function persistPseudoVersion(sheetDefinitionName, sheetDefinition) {
    const hashes = new Set();
    for (const [pseudoClass, pseudoClassStyles] of Object.entries(
      // $FlowIssue[incompatible-use] https://github.com/facebook/flow/issues/5838
      sheetDefinition.__pseudoClasses,
    )) {
      // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
      for (const [styleName, styleValue] of Object.entries(pseudoClassStyles)) {
        const hash = hashStylePair(styleName, styleValue);
        styleBuffer.set(hash + pseudoClass, renderStylePair(styleName, styleValue));
        hashes.add(hash);
      }
    }
    classNames[sheetDefinitionName] = hashes;
  }

  function persistSheetdefinition(sheetDefinitionName, sheetDefinition) {
    const hashes = new Set();
    // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
    for (const [styleName, styleValue] of Object.entries(sheetDefinition)) {
      const hash = hashStylePair(styleName, styleValue);
      styleBuffer.set(hash, renderStylePair(styleName, styleValue));
      hashes.add(hash);
    }
    classNames[sheetDefinitionName] = hashes;
  }

  for (const [sheetDefinitionName, sheetDefinition] of Object.entries(sheetDefinitions)) {
    // $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/5838
    if (sheetDefinition.__pseudoClasses != null) {
      persistPseudoVersion(sheetDefinitionName, sheetDefinition);
    } else {
      persistSheetdefinition(sheetDefinitionName, sheetDefinition);
    }
  }

  return function sx(...sheetDefinitionNames) {
    let classes = new Set();
    for (const sheetDefinitionName of sheetDefinitionNames) {
      classes = new Set([...classes, ...classNames[sheetDefinitionName]]);
    }
    return Array.from(classes).join(' ');
  };
}
