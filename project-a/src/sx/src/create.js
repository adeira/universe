// @flow

import hashStyle from './hashStyle';
import styleBuffer from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSPropertyTypes,
|};

function hashStylePair(styleName: string, styleValue?: string | number = ''): string {
  return hashStyle(`${styleName}${styleValue}`);
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
    hashedSheetDefinitions[sheetDefinitionName] = {};
    Object.keys(sheetDefinitionValues).forEach((styleName) => {
      const styleValue = sheetDefinitionValues[styleName];
      const hash = hashStylePair(styleName, styleValue);
      styleBuffer.set(hash, {
        styleName: transformStyleName(styleName),
        styleValue: transformValue(styleName, styleValue),
      });
      hashedSheetDefinitions[sheetDefinitionName][styleName] = hash;
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
