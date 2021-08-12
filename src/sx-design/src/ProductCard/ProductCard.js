// @flow

import React, { useState, type Element } from 'react';
import sx from '@adeira/sx';

import Image from '../Image/Image';
import Money from '../Money/Money';
import Text from '../Text/Text';
import type { SupportedCurrencies } from '../constants';

type Props = {
  +title: Fbt,
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
  +imgBlurhash?: string,
  +imgSrc?: string,
  +imgAlt?: Fbt,
};

/**
 * This component display product card with product title and product price. The recommended usage
 * is as follows:
 *
 * 1. display grid of `Skeleton` components when loading the data
 * 2. display the same grid of `ProductCards` with `imgBlurhash` (https://blurha.sh/) and `imgSrc` set
 *
 * This will result in a nice loading experience where the user sees:
 *
 * 1. grid of grey squares, after that:
 * 2. grid of blurhashes instead of boring grey squares, after that:
 * 3. the actual images
 *
 * You can use `LayoutGrid` component to achieve simple CSS grid.
 */
export default function ProductCard(props: Props): Element<'div'> {
  const [isHovered, setIsHovered] = useState(false);

  // We try to be bold and make the title big. However, when we reach some (empirically tested)
  // limit, we decrease the font size so the product card still looks nice.
  const titleSize = props.title.toString().length >= 15 ? 24 : 32;

  return (
    <div
      className={styles('wrapper', 'aspectRatioBox')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className={styles('aspectRatioBoxInner')}>
        <div className={styles('highlightWrapper')}>
          <Text size={titleSize}>
            <span
              className={styles(
                'highlightBase',
                'highlightBaseRounded', // applies only to this highlight
                isHovered ? 'highlightHover' : 'highlight',
              )}
            >
              {props.title}
            </span>
          </Text>

          <span className={styles('highlightBase', isHovered ? 'highlightHover' : 'highlight')}>
            <Money
              priceUnitAmount={props.priceUnitAmount}
              priceUnitAmountCurrency={props.priceUnitAmountCurrency}
            />
          </span>
        </div>

        <Image src={props.imgSrc} alt={props.imgAlt} blurhash={props.imgBlurhash} />
      </div>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(var(--sx-accent-2))',
    position: 'relative',
    borderRadius: 'var(--sx-radius)',
  },
  aspectRatioBox: {
    position: 'relative',
    width: '100%',
    paddingBlockEnd: '100%', // = width for a 1:1 aspect ratio (https://css-tricks.com/aspect-ratio-boxes/)
  },
  aspectRatioBoxInner: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  highlightWrapper: {
    width: 'calc(100% - (2 * var(--sx-radius)))', // leave a little bit of space on the right side
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  highlightBase: {
    transitionProperty: 'all',
    transitionDuration: '250ms',
    transitionTimingFunction: 'ease-in-out',
    display: 'inline-block',
    marginBlockEnd: 1,
    paddingBlock: '.8rem',
    paddingInline: '1rem',
  },
  highlightBaseRounded: {
    borderStartStartRadius: 'var(--sx-radius)',
  },
  highlight: {
    'color': 'rgba(var(--sx-foreground))',
    'backgroundColor': 'rgba(var(--sx-background))',
    '--sx-money-text-color': 'var(--sx-foreground)',
  },
  highlightHover: {
    'color': 'rgba(var(--sx-background))',
    'backgroundColor': 'rgba(var(--sx-foreground))',
    '--sx-money-text-color': 'var(--sx-background)',
  },
});
