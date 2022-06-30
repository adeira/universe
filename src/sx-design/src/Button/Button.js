// @flow

import React, { type Element } from 'react';
import {
  Button as ButtonHeadless,
  type Props as PropsButtonHeadless,
} from '@adeira/sx-design-headless';

import sharedButtonStyles from './styles';

type RestrictedReactNode = number | Fbt | Iterable<RestrictedReactNode>;

type Props = $ReadOnly<{
  ...PropsButtonHeadless,
  +size?: 'small' | 'medium' | 'large',
  +tint?:
    | 'default'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    // Transparent tint would typically be used on a darker background where none of the colored
    // tints would look nice.
    | 'transparent',
}>;

export default function Button(props: Props): Element<typeof ButtonHeadless> {
  const { size, tint, ...propsHeadless } = props;

  return (
    <ButtonHeadless
      {...propsHeadless}
      className={sharedButtonStyles({
        buttonBase: true,
        buttonSmall: props.size === 'small',
        buttonMedium: props.size == null || props.size === 'medium',
        buttonLarge: props.size === 'large',
        buttonTintDefault: props.tint == null || props.tint === 'default',
        buttonTintSecondary: props.tint === 'secondary',
        buttonTintError: props.tint === 'error',
        buttonTintSuccess: props.tint === 'success',
        buttonTintWarning: props.tint === 'warning',
        buttonTintTransparent: props.tint === 'transparent',
        buttonDisabled: props.isDisabled === true,
      })}
    />
  );
}
