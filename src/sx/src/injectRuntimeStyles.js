// @flow

/* global document */

import { invariant, warning } from '@adeira/js';

import StyleCollectorAtNode from './StyleCollectorAtNode';
import StyleCollectorNode from './StyleCollectorNode';
import StyleCollectorPseudoNode from './StyleCollectorPseudoNode';
import type { StyleBufferType } from './StyleCollector';

// <style data-adeira-sx />
opaque type StyleElementType = HTMLStyleElement | null;
let styleAdeiraSXTag: StyleElementType = null;

// https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model
export default function injectRuntimeStyles(styleBuffer: StyleBufferType) {
  if (styleAdeiraSXTag === null) {
    styleAdeiraSXTag = ((document.querySelector('style[data-adeira-sx]'): any): StyleElementType);
    if (styleAdeiraSXTag === null) {
      // Still `null` so let's create the style element:
      const htmlHead = document.head;
      styleAdeiraSXTag = document.createElement('style');
      styleAdeiraSXTag.type = 'text/css';
      styleAdeiraSXTag.setAttribute('data-adeira-sx', '');
      htmlHead?.appendChild(styleAdeiraSXTag);
    }

    invariant(
      styleAdeiraSXTag != null,
      'SX cannot render any styles because <style data-adeira-sx /> was not found and could not be created in the HTML document.',
    );
  }

  const styleSheet = styleAdeiraSXTag.sheet;
  invariant(
    styleSheet != null,
    'SX cannot apply runtime styles because HTMLStyleElement.sheet does not exist.',
  );

  function findStyleRule(selectorText) {
    for (const cssRule of styleSheet.cssRules) {
      // eslint-disable-next-line no-undef
      if (cssRule.type === CSSRule.STYLE_RULE) {
        const styleRule = ((cssRule: any): CSSStyleRule);
        if (styleRule.selectorText === `.${selectorText}`) {
          return true;
        }
      }
    }
    return false;
  }

  const insertIndex = styleSheet.cssRules.length;
  styleBuffer.forEach((node) => {
    if (node instanceof StyleCollectorNode) {
      if (findStyleRule(node.getHash()) === false) {
        // apply missing styles
        styleSheet.insertRule(node.printNodes().join(''), insertIndex);
      }
    } else if (node instanceof StyleCollectorAtNode) {
      // TODO: make sure we are not adding already added styles (?)
      styleSheet.insertRule(node.printNodes().join(''), insertIndex);
    } else if (node instanceof StyleCollectorPseudoNode) {
      const nodes = node.printNodes();
      for (const nodeElement of nodes) {
        // TODO: make sure we are not adding already added styles (?)
        styleSheet.insertRule(nodeElement, insertIndex);
      }
    } else {
      warning(false, 'Node not supported in runtime styles: %j', node);
    }
  });
}
