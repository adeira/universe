// @flow

import hashStyle from './hashStyle';
import styleBuffer from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
type AllCSSPseudos = {
  +'::after'?: AllCSSPropertyTypes,
  +'::before'?: AllCSSPropertyTypes,
  +':active'?: AllCSSPropertyTypes,
  +':focus'?: AllCSSPropertyTypes,
  +':focus-within'?: AllCSSPropertyTypes,
  +':hover'?: AllCSSPropertyTypes,
  +':visited'?: AllCSSPropertyTypes,
  ...
};

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSPropertyTypes | AllCSSPseudos,
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
  Object.keys(sheetDefinitions).forEach((sheetDefinitionName) => {
    const sheetDefinitionValues = sheetDefinitions[sheetDefinitionName];
    Object.keys(sheetDefinitionValues).forEach((key) => {
      if (key.startsWith(':')) {
        const values = ((sheetDefinitionValues: any): AllCSSPseudos);
        const pseudo = ((key: any): $Keys<typeof values>); // :hover, ::after

        const pseudoStyles = values[pseudo];
        if (pseudoStyles == null) {
          return; // this should never happen (?)
        }
        Object.keys(pseudoStyles).forEach((pseudoStyleName) => {
          const pseudoStyleValue = pseudoStyles[pseudoStyleName];
          const hash = hashStylePair(pseudoStyleName, pseudoStyleValue, pseudo);
          styleBuffer.set(hash, {
            styleName: transformStyleName(pseudoStyleName),
            styleValue: transformValue(pseudoStyleName, pseudoStyleValue),
            pseudo: pseudo,
          });
          if (hashedSheetDefinitions[sheetDefinitionName] === undefined) {
            hashedSheetDefinitions[sheetDefinitionName] = {};
          }
          hashedSheetDefinitions[sheetDefinitionName][pseudoStyleName + pseudo] = hash;
        });
      } else {
        const values = ((sheetDefinitionValues: any): AllCSSPropertyTypes);
        const styleName = ((key: any): $Keys<typeof values>);

        const styleValue = values[styleName];
        const hash = hashStylePair(styleName, styleValue);
        styleBuffer.set(hash, {
          styleName: transformStyleName(styleName),
          styleValue: transformValue(styleName, styleValue),
        });
        if (hashedSheetDefinitions[sheetDefinitionName] === undefined) {
          hashedSheetDefinitions[sheetDefinitionName] = {};
        }
        hashedSheetDefinitions[sheetDefinitionName][styleName] = hash;
      }
    });
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
