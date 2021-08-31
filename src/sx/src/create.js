// @flow

import { invariant, isBrowser, isObjectEmpty, isObject } from '@adeira/js';
import levenshtein from 'fast-levenshtein';

import injectRuntimeStyles from './injectRuntimeStyles';
import styleCollector from './StyleCollector';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';
import type { AllCSSPseudoTypes } from './css-properties/__generated__/AllCSSPseudoTypes';

type CSSVariableValue = string;

// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
type MediaQueries = {
  ...AllCSSPropertyTypes,
  ...AllCSSPseudoTypes,
  +[string]: MediaQueries | CSSVariableValue, // media queries can be recursively nested or have extra CSS variables
};

export type AllCSSProperties = {
  ...AllCSSPropertyTypes,
  ...AllCSSPseudoTypes,
  // we are unable to statically typecheck the key because it can be almost anything (@media, CSS variable, …)
  +[string]: MediaQueries | CSSVariableValue,
};

export type SheetDefinitions = {
  +[sheetName: string]: AllCSSProperties,
};

function suggest(sheetDefinitionName: string, alternativeNames: Array<string>): string {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(sheetDefinitionName, firstEl);
    const secondScore = levenshtein.get(sheetDefinitionName, secondEl);
    return firstScore - secondScore;
  })[0];
}

type CreateReturnType<T> = {
  (...$ReadOnlyArray<?$Keys<T> | false>): string, // conditional strings `styles(isRed && 'red')`
  ({ +[$Keys<T>]: boolean }): string | void, // conditional object `styles({ red: isRed })`
  +[$Keys<T>]: AllCSSProperties, // for external styles merging
};

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
      invariant(
        styleSheetsSelectors.length === 0,
        'SX accepts only one argument when using conditional objects. Either remove the second argument or switch to traditional syntax without conditional objects.',
      );
      sheetDefinitionNames = Object.keys(maybeObject).filter((key) => maybeObject[key] === true);
      invariant(
        isObjectEmpty(maybeObject) === false,
        'SX must be called with at least one stylesheet selector (empty object given).',
      );
    } else {
      sheetDefinitionNames = [maybeObject, ...styleSheetsSelectors].filter((el) => el != null);
      invariant(
        sheetDefinitionNames.length > 0,
        'SX must be called with at least one stylesheet name.',
      );
    }

    const selectedStyles = {};
    for (const sheetDefinitionName of sheetDefinitionNames) {
      if (sheetDefinitionName != null && sheetDefinitionName !== false) {
        invariant(
          Object.keys(sheetDefinitions).includes(sheetDefinitionName),
          `SX was called with '%s' stylesheet name but it doesn't exist. Did you mean '%s' instead?`,
          sheetDefinitionName,
          suggest(sheetDefinitionName, [...hashRegistry.keys()]),
        );

        // stylesheet definition name can be nullable when selecting conditionally
        const hashedValues = hashRegistry.get(sheetDefinitionName) ?? new Map();
        [...hashedValues.keys()].forEach((styleKey) => {
          selectedStyles[styleKey] = hashedValues.get(styleKey);
        });
      }
    }
    const classes = Object.values(selectedStyles);

    if (classes.length === 0 && isObject(maybeObject)) {
      // This happens when user is using conditional selectors. It would be incorrect to return an
      // empty string because React would render `class=""`. Instead, we want to skip the class
      // attribute completely. Example of such situation:
      //
      // ```
      // <div className={styles({ conditionalStyle: false })} />
      // ```
      return undefined;
    }

    const uniqueClasses = [...new Set(classes)];
    return uniqueClasses.join(' ');
  }

  // expose the hash registry for external styles merging
  for (const sheetDefinitionKey of Object.keys(sheetDefinitions)) {
    sxFunction[sheetDefinitionKey] = sheetDefinitions[sheetDefinitionKey];
  }

  // $FlowFixMe[incompatible-return] not sure how to explain that conditional object can return `void`
  return sxFunction;
}
