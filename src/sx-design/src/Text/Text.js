// @flow

import React, { type Node } from 'react';

import useAccessibleColors from './useAccessibleColors';

type Props = {
  +children: Fbt,
  +backgroundRef: { current: null | HTMLElement },
};

/**
 * Purpose of this component is to render accessible text in a given context. Specifically, it takes
 * into account background color of the parent component and renders the text with a proper color
 * contrast.
 *
 * To specify the background color, you have to specify `backgroundRef` which is a reference to the
 * parent element.
 */
export default function Text(props: Props): Node {
  const textColor = useAccessibleColors(props.backgroundRef);

  return <span style={{ color: textColor }}>{props.children}</span>;
}
