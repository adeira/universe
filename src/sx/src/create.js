// @flow

import { invariant, isBrowser, isObjectEmpty, isObject } from '@adeira/js';
import levenshtein from 'fast-levenshtein';

import injectRuntimeStyles from './injectRuntimeStyles';
import styleCollector from './StyleCollector';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';
import type { AllCSSPseudoTypes } from './css-properties/__generated__/AllCSSPseudoTypes';

type CSSVariableValue = string;

// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
type MediaQueries = {|
  ...AllCSSPropertyTypes,
  ...AllCSSPseudoTypes,
  +[string]: MediaQueries | CSSVariableValue, // media queries can be recursively nested or have extra CSS variables
|};

export type AllCSSProperties = {|
  ...AllCSSPropertyTypes,
  ...AllCSSPseudoTypes,
  // we are unable to statically typecheck the key because it can be almost anything (@media, CSS variable, …)
  +[string]: MediaQueries | CSSVariableValue,
|};

export type SheetDefinitions = {|
  +[sheetName: string]: AllCSSProperties,
|};

function suggest(sheetDefinitionName: string, alternativeNames: Array<string>): string {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(sheetDefinitionName, firstEl);
    const secondScore = levenshtein.get(sheetDefinitionName, secondEl);
    return firstScore - secondScore;
  })[0];
}

type CreateReturnType<T> = {|
  (...$ReadOnlyArray<?$Keys<T> | false>): string, // conditional strings `styles(isRed && 'red')`
  ({| +[$Keys<T>]: boolean |}): string, // conditional object `styles({ red: isRed })`
  +[$Keys<T>]: AllCSSProperties, // for external styles merging
|};

export default function create<T: SheetDefinitions>(sheetDefinitions: T): CreateReturnType<T> {
  invariant(
    isObjectEmpty(sheetDefinitions) === false,
    `Function 'sx.create' cannot be called with empty stylesheet definition.`,
  );

  const { hashRegistry, styleBuffer } = styleCollector.collect(sheetDefinitions);

  if (isBrowser()) {
    injectRuntimeStyles(styleBuffer);
  }

  function sxFunction(maybeObject, ...styleSheetsSelectors) {
    let sheetDefinitionNames;
    if (isObject(maybeObject)) {
      sheetDefinitionNames = Object.keys(maybeObject).filter((key) => maybeObject[key] === true);
    } else {
      sheetDefinitionNames = [maybeObject, ...styleSheetsSelectors].filter((el) => el != null);
    }

    invariant(
      sheetDefinitionNames.length > 0,
      'SX must be called with at least one stylesheet name.',
    );
    const selectedStyles = {};
    for (const sheetDefinitionName of sheetDefinitionNames) {
      if (sheetDefinitionName != null && sheetDefinitionName !== false) {
        // stylesheet definition name can be nullable when selecting conditionally
        const hashedValues = hashRegistry.get(sheetDefinitionName);
        invariant(
          hashedValues != null,
          `SX was called with '%s' stylesheet name but it doesn't exist. Did you mean '%s' instead?`,
          sheetDefinitionName,
          suggest(sheetDefinitionName, [...hashRegistry.keys()]),
        );
        [...hashedValues.keys()].forEach((styleKey) => {
          selectedStyles[styleKey] = hashedValues.get(styleKey);
        });
      }
    }
    const classes = Object.values(selectedStyles);
    const uniqueClasses = [...new Set(classes)];
    return uniqueClasses.join(' ');
  }

  // expose the hash registry for external styles merging
  for (const sheetDefinitionKey of Object.keys(sheetDefinitions)) {
    sxFunction[sheetDefinitionKey] = sheetDefinitions[sheetDefinitionKey];
  }

  return sxFunction;
}
