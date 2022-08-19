// @flow

import sx from '@adeira/sx';
import React, { type Element, type ElementConfig } from 'react';
import { Button as ButtonHeadless } from '@adeira/sx-design-headless';

type RestrictedReactNode = number | Fbt | Iterable<RestrictedReactNode>;

type Props = $ReadOnly<{
  ...ElementConfig<typeof ButtonHeadless>,
  +variant: 'primary' | 'secondary',
}>;

export default function Button(props: Props): Element<typeof ButtonHeadless> {
  const { variant, ...propsHeadless } = props;

  return (
    <ButtonHeadless
      {...propsHeadless}
      className={styles({
        buttonBase: true,
        buttonPrimary: variant === 'primary',
        buttonSecondary: variant === 'secondary',
      })}
    />
  );
}

const styles = sx.create({
  buttonBase: {
    borderRadius: '100px', // TODO: extract to CSS var(..)
    paddingBlock: '10px',
    width: '100%',
    textTransform: 'uppercase',
    cursor: 'pointer',
    display: 'inline-block',
    font: 'inherit',
    transitionDuration: '150ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    userSelect: 'none',
  },
  buttonPrimary: {
    backgroundColor: 'var(--wlcm-primary)',
    color: 'white', // TODO: extract to CSS var(..)
    border: 0,
  },
  buttonSecondary: {
    backgroundColor: 'white', // TODO: extract to CSS var(..)
    color: '#333333', // TODO: extract to CSS var(..)
    border: '1px solid #333333', // TODO: extract to CSS var(..)
  },
});
