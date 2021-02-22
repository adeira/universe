// @flow

import { warning } from '@adeira/js';
import * as React from 'react';
import sx from '@adeira/sx';
import { Blurhash } from 'react-blurhash';
import { useState } from 'react';

import Heading from './Heading';
import Money from './Money';
import type { SupportedCurrencies, SupportedLocales } from './constants';

type Props = {|
  +title: string,
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
  +locale: SupportedLocales,
  +imgBlurhash?: string,
  +imgSrc?: string,
  +imgAlt?: string,
|};

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
export default function ProductCard(props: Props): React.Node {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);

  if (props.imgSrc != null) {
    warning(
      props.imgAlt != null,
      'You should specify alternative image text via `imgAlt` property. This is a critical component ' +
        "of accessibility for screen reader users in order for them to understand the content's " +
        'purpose on the page.',
    );
  }

  const DEFAULT_HEIGHT = 250;

  return (
    <div
      style={{ height: DEFAULT_HEIGHT }}
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
            locale={props.locale}
          />
        </span>
      </div>

      {isImageLoaded === false && props.imgBlurhash != null ? (
        <Blurhash hash={props.imgBlurhash} width="100%" height={DEFAULT_HEIGHT} />
      ) : null}

      {props.imgSrc != null ? (
        <img
          src={props.imgSrc}
          alt={props.imgAlt}
          height={DEFAULT_HEIGHT}
          className={styles(isImageLoaded === false && 'imgSrcLoading', 'imgSrc')}
          onLoad={() => setImageLoaded(true)}
          // onError does nothing (we keep the blurhash)
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
  imgSrcLoading: {
    display: 'none',
  },
  imgSrc: {
    objectFit: 'cover',
    objectPosition: 'center center',
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
    color: 'var(--sx-color-dark, #1c1e21)',
    backgroundColor: 'var(--sx-color-light, white)',
  },
  highlightHover: {
    color: 'var(--sx-color-light, white)',
    backgroundColor: 'var(--sx-color-dark, #1c1e21)',
  },
  heading: {
    margin: 0,
  },
});
