/**
 * @flow
 * @jest-environment jsdom
 */

/* global document */

import { invariant } from '@adeira/js';

import rehydrateStyles from '../rehydrateStyles';

it('correctly rehydrates styles from a style element', () => {
  // First, we need to create a `CSSStyleSheet` by actually creating a style element:
  const styleElement = document.createElement('style');
  document.head?.appendChild(styleElement);
  const styleSheet = styleElement.sheet;

  invariant(styleSheet != null, 'Unable to create test StyleSheet.');

  // Insert some simple CSS rules:
  styleSheet.insertRule('._2tPCgL { font-size: 10px; }', 0);
  styleSheet.insertRule('._1Kmfck:hover { color: rgba(var(--sx-foreground), 0.5); }', 1);

  // Insert some @at rules:
  styleSheet.insertRule(
    `@media (prefers-reduced-motion: reduce) { .VdrO3.VdrO3 { animation-duration: 1s; } }`,
    2,
  );
  styleSheet.insertRule(
    `@media (prefers-reduced-motion: reduce) { ._2tPCgL._2tPCgL { font-size: 10px; } }`,
    3,
  );
  styleSheet.insertRule(
    `@keyframes oxCh9 { 33% { transform: translateY(-10px); } 66% { transform: translateY(10px); } }
  `,
    4,
  );

  // We should be able to decide whether the style needs to be injected later based on the
  // following information:
  expect(rehydrateStyles(styleSheet)).toMatchInlineSnapshot(`
    Object {
      "rehydratedKeyframeRules": Set {
        "oxCh9",
      },
      "rehydratedMediaRules": Map {
        "(prefers-reduced-motion: reduce)" => Set {
          ".VdrO3.VdrO3",
          "._2tPCgL._2tPCgL",
        },
      },
      "rehydratedStyleRules": Set {
        "._2tPCgL",
        "._1Kmfck:hover",
      },
    }
  `);
});
