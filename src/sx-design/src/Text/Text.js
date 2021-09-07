// @flow

import React, { type Node, type Element } from 'react';
import sx from '@adeira/sx';

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
export type TextSupportedSize = 10 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48;

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
export type TextSupportedWeight =
  | 100 // Thin (Hairline)
  | 200 // Extra Light (Ultra Light)
  | 300 // Light
  | 400 // Normal (Regular)
  | 500 // Medium
  | 600 // Semi Bold (Demi Bold)
  | 700 // Bold
  | 800 // Extra Bold (Ultra Bold)
  | 900 // Black (Heavy)
  | 950; // Extra Black (Ultra Black)

type TextSupportedTypes =
  | 'p' // default
  | 'small'
  | 'code'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

// In most of the cases, the `Text` children should be a translated string. However, we allow
// somehow restricted React `Node` so that user can for example embed HTML links.
type RestrictedReactNode = Fbt | Element<any> | Iterable<RestrictedReactNode> | number;

type Props = {
  +'children': RestrictedReactNode,
  +'as'?: TextSupportedTypes,
  +'size'?: TextSupportedSize,
  +'transform'?: 'capitalize' | 'lowercase' | 'uppercase',
  +'truncate'?: boolean,
  +'weight'?: TextSupportedWeight,
  +'data-testid'?: string,
};

/**
 * Purpose of this component is to render a text correctly in a given context. Additionally, you can
 * specify these properties to modify the text appearance and behavior:
 *
 *  - `as` to modify the root component for semantic purposes
 *  - `size` to modify the font size (automatically sets appropriate weight)
 *  - `transform` to modify text-transform property
 *  - `truncate` to truncate the text into a single line when too long (TODO: multiline clamp with lineClamp)
 *  - `weight` to modify the font weight
 *
 * Combination of these properties allows you to set some advanced combinations like `<p/>` that
 * looks like `<h1/>` (as=p, size=48) or `<h1/>` that looks like `<p/>` (as=h1, size=16).
 */
export default function Text(props: Props): Node {
  const AsComponent = props.as ?? 'p';

  return (
    <AsComponent
      data-testid={props['data-testid']}
      className={styles({
        base: true,
        truncate: props.truncate === true,

        // Sizes are not defined directly via `fontSize` so we can improve the `fontWeight` automatically:
        s48: props.size === 48 || props.as === 'h1',
        s40: props.size === 40 || props.as === 'h2',
        s32: props.size === 32 || props.as === 'h3',
        s24: props.size === 24 || props.as === 'h4',
        s20: props.size === 20 || props.as === 'h5',
        s16: props.size === 16 || props.as === 'h6',
        s14: props.size === 14,
        s12: props.size === 12,
        s10: props.size === 10,

        // Weights could be set directly in `style` property but we use SX so the styles get collected and deduped:
        w100: props.weight === 100,
        w200: props.weight === 200,
        w300: props.weight === 300,
        w400: props.weight === 400,
        w500: props.weight === 500,
        w600: props.weight === 600 || props.as === 'h6',
        w700: props.weight === 700,
        w800: props.weight === 800,
        w900: props.weight === 900,
        w950: props.weight === 950,
      })}
      style={{
        textTransform: props.transform ?? 'inherit',
      }}
    >
      {props.children}
    </AsComponent>
  );
}

const styles = sx.create({
  base: {
    margin: 0,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  s48: { fontSize: 48, fontWeight: 700 },
  s40: { fontSize: 40, fontWeight: 700 },
  s32: { fontSize: 32, fontWeight: 600 },
  s24: { fontSize: 24, fontWeight: 600 },
  s20: { fontSize: 20, fontWeight: 600 },
  s16: { fontSize: 16, fontWeight: 400 },
  s14: { fontSize: 14, fontWeight: 400 },
  s12: { fontSize: 12, fontWeight: 400 },
  s10: { fontSize: 10, fontWeight: 400 },
  w100: { fontWeight: 100 },
  w200: { fontWeight: 200 },
  w300: { fontWeight: 300 },
  w400: { fontWeight: 400 },
  w500: { fontWeight: 500 },
  w600: { fontWeight: 600 },
  w700: { fontWeight: 700 },
  w800: { fontWeight: 800 },
  w900: { fontWeight: 900 },
  w950: { fontWeight: 950 },
});
