// @flow

import { warning } from '@adeira/js';

// Unique entries are identified by the style selector text ("._XYZ"  or "._XYZ:hover").
let rehydratedStyleRules = null;

// Unique entries are a combination of the media condition text ("(prefers-color-scheme: light)")
// and selector text of each rule in the media rule ("._XYZ"  or "._XYZ:hover").
let rehydratedMediaRules = null;

// Unique entries are identified by the keyframe name ("_XYZ").
let rehydratedKeyframeRules = null;

export type RehydratedStyles = {
  rehydratedStyleRules: Set<string>,
  rehydratedMediaRules: Map<string, Set<string>>,
  rehydratedKeyframeRules: Set<string>,
};

/**
 * This function goes through already existing stylesheet inside `<style data-adeira-sx />` and
 * register what CSS rules are already rendered by the server (rehydration). This information is
 * later used by `injectRuntimeStyles` and `injectRuntimeKeyframes` to inject only (runtime) styles
 * that do not exist yet.
 */
export default function rehydrateStyles(styleSheet: CSSStyleSheet): RehydratedStyles {
  if (
    // memoize so we call this only once to populate the values
    rehydratedStyleRules === null ||
    rehydratedMediaRules === null ||
    rehydratedKeyframeRules === null
  ) {
    rehydratedStyleRules = new Set();
    rehydratedMediaRules = new Map();
    rehydratedKeyframeRules = new Set();

    for (const cssRule of styleSheet.cssRules) {
      if (cssRule.type === CSSRule.STYLE_RULE) {
        const cssStyleRule = ((cssRule: any): CSSStyleRule);
        rehydratedStyleRules.add(cssStyleRule.selectorText); // "._XYZ"  or "._XYZ:hover"
      } else if (cssRule.type === CSSRule.MEDIA_RULE) {
        const cssMediaRule = ((cssRule: any): CSSMediaRule);
        const cssMediaRuleText = cssMediaRule.media.mediaText;
        const collectedMediaSelectorTexts = new Set();
        for (const cssMediaNestedRule of cssMediaRule.cssRules) {
          collectedMediaSelectorTexts.add(((cssMediaNestedRule: any): CSSStyleRule).selectorText);
        }
        if (rehydratedMediaRules.has(cssMediaRuleText)) {
          rehydratedMediaRules.set(
            cssMediaRuleText,
            new Set([
              ...(rehydratedMediaRules.get(cssMediaRuleText) ?? new Set()),
              ...collectedMediaSelectorTexts,
            ]),
          );
        } else {
          rehydratedMediaRules.set(cssMediaRuleText, collectedMediaSelectorTexts);
        }
      } else if (cssRule.type === CSSRule.KEYFRAMES_RULE) {
        const cssKeyframesRule = ((cssRule: any): CSSKeyframesRule);
        rehydratedKeyframeRules.add(cssKeyframesRule.name); // "_XYZ"
      } else {
        warning(
          false,
          'Could not rehydrate the following CSS style (type %s): %s',
          cssRule.type,
          cssRule.cssText,
        );
      }
    }
  }

  return Object.freeze({
    rehydratedStyleRules,
    rehydratedMediaRules,
    rehydratedKeyframeRules,
  });
}
