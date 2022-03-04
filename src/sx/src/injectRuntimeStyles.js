// @flow

import { warning } from '@adeira/js';

import StyleCollectorAtNode from './StyleCollectorAtNode';
import StyleCollectorNode from './StyleCollectorNode';
import StyleCollectorPseudoNode from './StyleCollectorPseudoNode';
import {
  printStyleCollectorAtNode,
  printStyleCollectorNode,
  printStyleCollectorPseudoNode,
} from './printNodes';
import type { RehydratedStyles } from './rehydrateStyles';
import type { StyleBufferType } from './StyleCollector';

export function injectRuntimeKeyframes(
  styleSheet: CSSStyleSheet,
  rehydratedRules: RehydratedStyles,
  css: string,
  name: string,
) {
  const hasStyleRule = (match: (CSSRule) => boolean) => {
    for (const cssRule of styleSheet.cssRules) {
      if (match(cssRule)) {
        return true;
      }
    }
    return false;
  };

  const matchFunction = (cssRule) => {
    if (cssRule.type === CSSRule.KEYFRAMES_RULE) {
      const rule: CSSKeyframesRule = (cssRule: any);
      return rule.name === name;
    }
    return false;
  };

  if (hasStyleRule(matchFunction) === false) {
    // TODO: leverage rehydrated rules
    styleSheet.insertRule(css, styleSheet.cssRules.length);
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model
export default function injectRuntimeStyles(
  styleSheet: CSSStyleSheet, // TODO: note: we are mutating this
  { rehydratedStyleRules, rehydratedMediaRules, rehydratedKeyframeRules }: RehydratedStyles,
  styleBuffer: StyleBufferType,
) {
  styleBuffer.forEach((node) => {
    const insertIndex = styleSheet.cssRules.length;

    if (node instanceof StyleCollectorNode) {
      const rehydrationIdentifier = node.rehydrationIdentifier();
      if (rehydratedStyleRules.has(rehydrationIdentifier) === false) {
        // Apply the missing styles:
        styleSheet.insertRule(printStyleCollectorNode(node), insertIndex);

        // Register the rule into rehydrated styles, so we don't attempt to process it again:
        rehydratedStyleRules.add(rehydrationIdentifier);
      }
    } else if (node instanceof StyleCollectorAtNode) {
      // TODO: leverage rehydrated rules (to add only new rules)
      // TODO: media queries & keyframe rules
      const rehydrationIdentifier = node.getAtRuleName().replace(/.*(\(.+\)).*/, '$1');

      // TODO: we probably has to dig a bit deeper and check whether the @at rule has every inner rule applied
      if (rehydratedMediaRules.has(rehydrationIdentifier) === false) {
        const rule = printStyleCollectorAtNode(node);
        styleSheet.insertRule(rule, insertIndex);

        // TODO: Register the rule into rehydrated styles, so we don't attempt to process it again:
        rehydratedMediaRules.set(
          rehydrationIdentifier,
          node.getNodes(), // TODO: ???
        );
      }
    } else if (node instanceof StyleCollectorPseudoNode) {
      for (const [, testNode] of node.getNodes()) {
        // TODO: better
        const rehydrationIdentifier = `${testNode.rehydrationIdentifier()}:${node.getPseudo()}`;
        if (rehydratedStyleRules.has(rehydrationIdentifier) === false) {
          styleSheet.insertRule(
            printStyleCollectorNode(testNode, {
              pseudo: node.getPseudo(),
            }),
            insertIndex,
          );
        }

        // TODO: Register the rule into rehydrated styles, so we don't attempt to process it again:
        rehydratedStyleRules.add(rehydrationIdentifier);
      }
    } else {
      warning(false, 'Node not supported in runtime styles: %j', node);
    }
  });
}
