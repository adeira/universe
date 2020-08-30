// @flow

import { invariant, isObjectEmpty } from '@adeira/js';
import levenshtein from 'fast-levenshtein';

import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';
import styleCollector from './StyleCollector';

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
type AllCSSPseudos = {|
  +'::after'?: AllCSSPropertyTypes,
  +'::before'?: AllCSSPropertyTypes,
  +':active'?: AllCSSPropertyTypes,
  +':focus'?: AllCSSPropertyTypes,
  +':focus-within'?: AllCSSPropertyTypes,
  +':hover'?: AllCSSPropertyTypes,
  +':visited'?: AllCSSPropertyTypes,
|};

// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
type MediaQueries = {|
  ...AllCSSPropertyTypes,
  ...AllCSSPseudos,
|};

// https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
type KeyFrames = {|
  +from: AllCSSPropertyTypes,
  +to: AllCSSPropertyTypes,
  +[number]: AllCSSPropertyTypes, // percentages
|};

// https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
type AtRules = MediaQueries | KeyFrames;

type AllCSSProperties = {|
  ...AllCSSPropertyTypes,
  ...AllCSSPseudos,
  +[string]: AtRules,
|};

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSProperties,
|};

function suggest(sheetDefinitionName: string, alternativeNames: Array<string>): string {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(sheetDefinitionName, firstEl);
    const secondScore = levenshtein.get(sheetDefinitionName, secondEl);
    return firstScore - secondScore;
  })[0];
}

export default function create<T: SheetDefinitions>(
  sheetDefinitions: T,
): (...$ReadOnlyArray<?$Keys<T> | false>) => string {
  invariant(
    isObjectEmpty(sheetDefinitions) === false,
    `Function 'sx.create' cannot be called with empty stylesheet definition.`,
  );

  const hashedSheetDefinitions = {};

  styleCollector.addStyles(sheetDefinitions, hashedSheetDefinitions);

  return function sx(...sheetDefinitionNames) {
    invariant(
      sheetDefinitionNames.length > 0,
      'SX must be called with at least one stylesheet name.',
    );
    const selectedStyles = {};
    for (const sheetDefinitionName of sheetDefinitionNames) {
      if (sheetDefinitionName != null && sheetDefinitionName !== false) {
        // stylesheet definition name can be nullable when selecting conditionally
        const hashedValues = hashedSheetDefinitions[sheetDefinitionName];
        invariant(
          hashedValues != null,
          `SX was called with '%s' stylesheet name but it doesn't exist. Did you mean '%s' instead?`,
          sheetDefinitionName,
          suggest(sheetDefinitionName, Object.keys(hashedSheetDefinitions)),
        );
        Object.keys(hashedValues).forEach((styleKey) => {
          selectedStyles[styleKey] = hashedValues[styleKey];
        });
      }
    }
    const classes = Object.values(selectedStyles);
    const uniqueClasses = [...new Set(classes)];
    return uniqueClasses.join(' ');
  };
}
