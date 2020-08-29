// @flow

import { invariant, isObjectEmpty, warning } from '@adeira/js';
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
  +[string]: {|
    ...AllCSSPropertyTypes,
    ...AllCSSPseudos,
  |}, // @media, @keyframes, ...
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

  function getMediaBuffer(mediaName) {
    let media = mediaStyleBuffer.get(mediaName);
    if (media == null) {
      mediaStyleBuffer.set(mediaName, new Map([]));
      media = mediaStyleBuffer.get(mediaName);
    }
    invariant(media != null, 'Media is undefined, but that should not be possible');
    return media;
  }

  function iterateEntries(entries, className, buffer, objectType = '') {
    if (entries.length === 0) {
      return;
    }

    const [property, value] = entries.shift();
    const pseudo = objectType.startsWith(':') ? objectType : '';

    if (typeof property === 'string' && typeof value !== 'object') {
      const styleValue = ((value: any): string | number);
      const hash = hashStylePair(
        property,
        styleValue,
        objectType.startsWith(':') ? objectType : '',
      );

      buffer.set(hash, {
        styleName: transformStyleName(property),
        styleValue: transformValue(property, styleValue),
        pseudo,
      });

      if (hashedSheetDefinitions[className] === undefined) {
        hashedSheetDefinitions[className] = {};
      }
      hashedSheetDefinitions[className][`${property}${objectType}`] = hash;
    } else if (typeof value === 'object' && value != null) {
      const nextBuffer = property.startsWith('@media') ? getMediaBuffer(property) : buffer;

      iterateEntries(Object.entries(value), className, nextBuffer, property);
    }
    iterateEntries(entries, className, buffer, objectType);
  }

  for (const key of Object.keys(sheetDefinitions)) {
    warning(
      isObjectEmpty(sheetDefinitions[key]) === false,
      `Stylesheet '%s' must have at least one CSS property.`,
      key,
    );
    const entries = Object.entries(sheetDefinitions[key]);
    iterateEntries(entries, key, styleBuffer);
  }

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
