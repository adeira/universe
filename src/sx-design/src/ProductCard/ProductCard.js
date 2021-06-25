// @flow

import React, { useState, type Element } from 'react';
import sx from '@adeira/sx';

import Heading from '../Heading/Heading';
import Image from '../Image/Image';
import Money from '../Money/Money';
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
 * Simple CSS grid example:
 *
 * ```js
 * const styles = sx.create({
 *   productsGrid: {
 *     display: 'grid',
 *     gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
 *     gap: '1rem',
 *   },
 * });
 * ```
 */
export default function ProductCard(props: Props): Element<'div'> {
  const [isHovered, setIsHovered] = useState(false);

  const DEFAULT_HEIGHT = 250;
  const DEFAULT_WIDTH = 250;

  return (
    <div
      style={{ height: DEFAULT_HEIGHT, width: DEFAULT_WIDTH }}
      className={styles('wrapper')}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles('highlightWrapper')}>
        <Heading xstyle={styles.heading}>
          <span className={styles(isHovered ? 'highlightHover' : 'highlight', 'highlightBase')}>
            {props.title}
          </span>
        </Heading>

        <span className={styles(isHovered ? 'highlightHover' : 'highlight', 'highlightBase')}>
          <Money
            priceUnitAmount={props.priceUnitAmount}
            priceUnitAmountCurrency={props.priceUnitAmountCurrency}
          />
        </span>
      </div>

      {props.imgSrc != null ? (
        <Image
          src={props.imgSrc}
          alt={props.imgAlt}
          blurhash={props.imgBlurhash}
          height={DEFAULT_HEIGHT}
          width={DEFAULT_WIDTH}
        />
      ) : null}
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    position: 'relative',
  },
  highlightWrapper: {
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
    marginBottom: 1,
    padding: '1rem',
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
  heading: {
    margin: 0,
  },
});
