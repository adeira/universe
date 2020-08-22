// @flow

import hashStyle from './hashStyle';
import { styleBuffer } from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
export type AllCSSPseudos = {|
  +'::after'?: AllCSSPropertyTypes,
  +'::before'?: AllCSSPropertyTypes,
  +':active'?: AllCSSPropertyTypes,
  +':focus'?: AllCSSPropertyTypes,
  +':focus-within'?: AllCSSPropertyTypes,
  +':hover'?: AllCSSPropertyTypes,
  +':visited'?: AllCSSPropertyTypes,
|};

type SheetDefinitions = {|
  +[sheetName: string]:
    | AllCSSPropertyTypes
    | {| +__pseudoClasses: AllCSSPseudos |}
    | {| +__mediaQueries: AllCSSPseudos |}, // TODO (not implemented yet)
|};

function hashStylePair(
  styleName: string,
  styleValue?: string | number = '',
  pseudo?: string = '',
): string {
  return hashStyle(`${styleName}${styleValue}${pseudo}`);
}

export default function create<T: SheetDefinitions>(
  sheetDefinitions: T,
): (...$ReadOnlyArray<$Keys<T>>) => string {
  // 1) stylesheet definitions:
  //
  // {
  //   blue: { color: 'blue' },
  //   default: { color: 'red', fontSize: 32 },
  // };

  // 2) generate atomic CSS:
  //
  // .c0 { color: blue }
  // .c1 { color: red }
  // .c2 { font-size: 2rem }

  // 3) transform the stylesheet:
  //
  // {
  //   blue: { color: 'c0' },
  //   default: { color: 'c1', fontSize: 'c2' },
  // };

  // 4) pass this object to SX so it can resolve it properly:
  //  a) styles('default', 'blue')
  //   { color: 'c0', 'fontSize: 'c2' }
  //  b) styles(blue, 'default')
  //   { color: 'c1', 'fontSize: 'c2' }

  // 5) collect the values of the final object and print them as `className`

  const hashedSheetDefinitions = {};

  function hashAndSaveStyles({ pseudo = '', styles, key, sheetDefinitionName }) {
    // $FlowFixMe[incompatible-use]
    const styleValue = styles[key];
    const hash = hashStylePair(key, styleValue, pseudo);
    styleBuffer.set(hash, {
      styleName: transformStyleName(key),
      styleValue: transformValue(key, styleValue),
      pseudo,
    });

    if (hashedSheetDefinitions[sheetDefinitionName] === undefined) {
      hashedSheetDefinitions[sheetDefinitionName] = {};
    }
    hashedSheetDefinitions[sheetDefinitionName][`${key}${pseudo}`] = hash;
  }

  Object.keys(sheetDefinitions).forEach((sheetDefinitionName) => {
    const sheetDefinitionValues = sheetDefinitions[sheetDefinitionName];
    if (sheetDefinitionValues.__pseudoClasses) {
      const pseudoClasses = sheetDefinitionValues.__pseudoClasses;
      Object.keys(pseudoClasses).forEach((pseudoName) => {
        // we could leverage a bit of recursion here
        // $FlowFixMe[not-an-object]
        Object.keys(pseudoClasses[pseudoName]).forEach((pseudoStyleName) => {
          hashAndSaveStyles({
            pseudo: pseudoName,
            styles: pseudoClasses[pseudoName],
            key: pseudoStyleName,
            sheetDefinitionName,
          });
        });
      });
    } else if (sheetDefinitionValues.__mediaQueries) {
      // TODO (not implemented yet)
    } else {
      // normal style definitions
      Object.keys(sheetDefinitionValues).forEach((key) => {
        hashAndSaveStyles({
          styles: sheetDefinitionValues,
          key,
          sheetDefinitionName,
        });
      });
    }
  });

  return function sx(...sheetDefinitionNames) {
    const selectedStyles = {};
    for (const sheetDefinitionName of sheetDefinitionNames) {
      const hashedValues = hashedSheetDefinitions[sheetDefinitionName];
      Object.keys(hashedValues).forEach((styleKey) => {
        selectedStyles[styleKey] = hashedValues[styleKey];
      });
    }
    return Object.values(selectedStyles).join(' ');
  };
}
