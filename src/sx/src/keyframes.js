// @flow

import { isBrowser, nullthrows } from '@adeira/js';
import stringifyStable from 'json-stable-stringify';

import getStyleSheetFromStyleTag from './getStyleSheetFromStyleTag';
import hash from './hashStyle';
import rehydrateStyles from './rehydrateStyles';
import styleCollector from './StyleCollector';
import transformStyleName from './transformStyleName';
import transformStyleValue from './transformValue';
import { injectRuntimeKeyframes } from './injectRuntimeStyles';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';

type KeyFrames = {
  +from?: AllCSSPropertyTypes,
  +to?: AllCSSPropertyTypes,
  +[string]: AllCSSPropertyTypes,
};

const extractStyles = (styles: AllCSSPropertyTypes) => {
  let cssDefinition = '';
  for (const styleName of Object.keys(styles)) {
    const styleValue = styles[styleName];
    cssDefinition += `${transformStyleName(styleName)}:${transformStyleValue(
      styleName,
      styleValue,
    )};`;
  }
  return cssDefinition;
};

const transformKey = (key: string) => key.replace(/\s/g, '');

/**
 * Helper function generating animation name. Usage:
 *
 * ```js
 * const bounce = sx.keyframes({
 *    '33%': { transform: `translateY(-1.4em)` },
 *    '66%': { transform: `translateY(1.4em)` },
 * });
 *
 * const styles = sx.create({
 *    svgCircle: {
 *      animationName: bounce,
 *    }
 *    // …
 * });
 * ```
 */
export default function keyframes(styleDefinitions: KeyFrames): string {
  let cssDefinition = '';
  // `from{maxHeight:0,opacity:0}` should be the same as `from{opacity:0,maxHeight:0}`
  const parsedDefinitions: KeyFrames = JSON.parse(stringifyStable(styleDefinitions));

  for (const key of Object.keys(parsedDefinitions)) {
    const styleValue = nullthrows(parsedDefinitions[key]);
    cssDefinition += `${transformKey(key)} {${extractStyles(styleValue)}}`;
  }

  const name = hash(cssDefinition);
  const frame = `@keyframes ${name} {${cssDefinition}}`;
  styleCollector.collectKeyframe(name, frame);

  if (isBrowser()) {
    const styleSheet = getStyleSheetFromStyleTag();
    const rehydratedRules = rehydrateStyles(styleSheet);
    injectRuntimeKeyframes(styleSheet, rehydratedRules, frame, name);
  }

  return name;
}
