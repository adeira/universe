// @flow

import { warning } from '@adeira/js';
import React, { useState, type Element } from 'react';
import sx from '@adeira/sx';
import { Blurhash } from 'react-blurhash';
import { isBlurhashValid } from 'blurhash';

import useSxDesignContext from '../useSxDesignContext';

type Props = {
  +'width': number,
  +'height': number,
  +'src'?: string, // optional because BE might fail to return the URL
  +'alt'?: Fbt,
  +'blurhash'?: string,
  +'onLoad'?: () => void,
  +'onError'?: () => void,
  +'data-testid'?: string,
};

export default function Image(props: Props): Element<'div'> {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const { theme } = useSxDesignContext();

  if (props.src != null) {
    warning(
      props.alt != null,
      'You should specify alternative image text via `alt` property. This is an important ' +
        'part of accessibility for screen reader users in order for them to understand the ' +
        "content's purpose on the page.",
    );
  }

  return (
    <div
      className={styles({
        background: true,
        backgroundLight: theme === 'light',
        backgroundDark: theme !== 'light',
      })}
      style={{ width: props.width, height: props.height }}
    >
      {isImageLoaded === false && isBlurhashValid(props.blurhash).result === true ? (
        <Blurhash hash={props.blurhash} width={props.width} height={props.height} />
      ) : null}

      <img
        src={props.src}
        alt={props.alt}
        height={props.height}
        width={props.width}
        className={styles({
          imgSrc: true,
          imgSrcLoading: isImageLoaded === false,
        })}
        onLoad={() => {
          setImageLoaded(true);
          if (props.onLoad != null) {
            props.onLoad();
          }
        }}
        onError={() => {
          // `onError` does nothing special (we keep the Blurhash)
          if (props.onError != null) {
            props.onError();
          }
        }}
        data-testid={props['data-testid']}
      />
    </div>
  );
}

const styles = sx.create({
  background: {
    display: 'flex',
    flexDirection: 'column',
  },
  backgroundLight: {
    backgroundColor: 'lightgrey',
  },
  backgroundDark: {
    backgroundColor: 'grey',
  },
  imgSrcLoading: {
    display: 'none',
  },
  imgSrc: {
    objectFit: 'cover',
    objectPosition: 'center center',
  },
});
