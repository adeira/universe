// @flow

import { invariant, isObjectEmpty } from '@adeira/js';
import levenshtein from 'fast-levenshtein';

import hashStyle from './hashStyle';
import { styleBuffer, mediaStyleBuffer } from './styleBuffer';
import transformStyleName from './transformStyleName';
import transformValue from './transformValue';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

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

type AllCSSProperties = {|
  ...AllCSSPropertyTypes,
  ...AllCSSPseudos,
  +[string]: AllCSSPropertyTypes, // @media, @keyframes, ...
|};

type SheetDefinitions = {|
  +[sheetName: string]: AllCSSProperties,
|};

function hashStylePair(
  styleName: string,
  styleValue?: string | number = '',
  pseudo?: string = '',
): string {
  return hashStyle(`${styleName}${styleValue}${pseudo}`);
}

function suggest(sheetDefinitionName: string, alternativeNames: Array<string>): string {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(sheetDefinitionName, firstEl);
    const secondScore = levenshtein.get(sheetDefinitionName, secondEl);
    return firstScore - secondScore;
  })[0];
}

export default function create<T: SheetDefinitions>(
  sheetDefinitions: T,
): (...$ReadOnlyArray<$Keys<T>>) => string {
  invariant(
    isObjectEmpty(sheetDefinitions) === false,
    `Function 'sx.create' cannot be called with empty stylesheet definition.`,
  );

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
    invariant(
      // TODO: change to warning
      isObjectEmpty(sheetDefinitionValues) === false,
      `Stylesheet '%s' must have at least one CSS property.`,
      sheetDefinitionName,
    );
    Object.keys(sheetDefinitionValues).forEach((key) => {
      // Stylesheet definition value can be one of:
      //  - pseudo class/element (:hover)
      //  - media query (@media print)
      //  - normal style definitions

      if (key.startsWith(':')) {
        // Conditional refinement cannot work here since Flow cannot analyze _content_ of the string.
        // Therefore, we are changing the types here manually, see: https://mrtnzlml.com/docs/flow#force-type-casting
        const values = ((sheetDefinitionValues: any): AllCSSPseudos);
        const pseudo = ((key: any): $Keys<typeof values>); // :hover, ::after

        const pseudoStyles = values[pseudo];
        if (pseudoStyles == null) {
          return; // this should never happen (?)
        }
        Object.keys(pseudoStyles).forEach((pseudoStyleName) => {
          hashAndSaveStyles({
            pseudo,
            styles: pseudoStyles,
            key: pseudoStyleName,
            sheetDefinitionName,
          });
        });
      } else if (key.startsWith('@media')) {
        // Conditional refinement cannot work here since Flow cannot analyze _content_ of the string.
        // Therefore, we are changing the types here manually, see: https://mrtnzlml.com/docs/flow#force-type-casting
        const values = ((sheetDefinitionValues: any): {| +[string]: AllCSSPropertyTypes |});
        const mediaName = ((key: any): $Keys<typeof values>);

        const mediaStyles = values[mediaName];
        Object.keys(mediaStyles).forEach((mediaStyleName) => {
          const mediaStyleValue = mediaStyles[mediaStyleName];
          const hash = hashStylePair(mediaStyleName, mediaStyleValue);
          const media = mediaStyleBuffer.get(mediaName);
          if (media != null) {
            media.set(hash, {
              styleName: transformStyleName(mediaStyleName),
              styleValue: transformValue(mediaStyleName, mediaStyleValue),
            });
          } else {
            mediaStyleBuffer.set(
              mediaName,
              new Map([
                [
                  hash,
                  {
                    styleName: transformStyleName(mediaStyleName),
                    styleValue: transformValue(mediaStyleName, mediaStyleValue),
                  },
                ],
              ]),
            );
          }

          if (hashedSheetDefinitions[sheetDefinitionName] === undefined) {
            hashedSheetDefinitions[sheetDefinitionName] = {};
          }
          hashedSheetDefinitions[sheetDefinitionName][`${mediaStyleName}${mediaName}`] = hash;
        });
      } else {
        // Conditional refinement cannot work here since Flow cannot analyze _content_ of the string.
        // Therefore, we are changing the types here manually, see: https://mrtnzlml.com/docs/flow#force-type-casting
        const values = ((sheetDefinitionValues: any): AllCSSPropertyTypes);
        const styleName = ((key: any): $Keys<typeof values>);

        hashAndSaveStyles({
          styles: values,
          key: styleName,
          sheetDefinitionName,
        });
      }
    });
  });

  return function sx(...sheetDefinitionNames) {
    invariant(
      sheetDefinitionNames.length > 0,
      'SX must be called with at least one stylesheet name.',
    );
    const selectedStyles = {};
    for (const sheetDefinitionName of sheetDefinitionNames) {
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
    const classes = Object.values(selectedStyles);
    const uniqueClasses = [...new Set(classes)];
    return uniqueClasses.join(' ');
  };
}
