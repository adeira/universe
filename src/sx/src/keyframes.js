// @flow

import { isBrowser, nullthrows } from '@adeira/js';
import stringify from 'json-stable-stringify';

import hash from './hashStyle';
import type { AllCSSPropertyTypes } from './css-properties/__generated__/AllCSSPropertyTypes';
import styleCollector from './StyleCollector';
import transformStyleName from './transformStyleName';
import transformStyleValue from './transformValue';
import { injectRuntimeKeyframes } from './injectRuntimeStyles';

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

export default function keyframes(styleDefinitions: KeyFrames): string {
  let cssDefinition = '';
  // `from{maxHeight:0,opacity:0}` should be the same as `from{opacity:0,maxHeight:0}`
  const parsedDefinitions: KeyFrames = JSON.parse(stringify(styleDefinitions));

  for (const key of Object.keys(parsedDefinitions)) {
    const styleValue = nullthrows(parsedDefinitions[key]);
    cssDefinition += `${transformKey(key)} {${extractStyles(styleValue)}}`;
  }

  const name = hash(cssDefinition);
  const frame = `@keyframes ${name} {${cssDefinition}}`;
  const exists = styleCollector.addKeyframe(name, frame);

  if (isBrowser() && !exists) {
    // It is possible that the keyframe was added on the server
    // The StyleCollector will return false, but the injectRuntimeKeyframes checks
    // If the rule is already added, so it won't be duplicated
    injectRuntimeKeyframes(frame, name);
  }

  return name;
}
