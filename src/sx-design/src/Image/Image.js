// @flow

import { warning } from '@adeira/js';
import React, { useState, type Node } from 'react';
import sx from '@adeira/sx';
import { Blurhash as ReactBlurhash } from 'react-blurhash';
import { isBlurhashValid as _isBlurhashValid } from 'blurhash';

type Props = {
  +'src'?: string, // optional because BE might fail to return the URL
  +'alt'?: Fbt,
  +'blurhash'?: string,
  +'onLoad'?: () => void,
  +'onError'?: () => void,
  +'data-testid'?: string,
};

/**
 * `Image` components renders an image with aspect ratio 1:1. Optionally, you can specify Blurhash
 * (https://blurha.sh/) to be rendered while the image is loading. Grey square is rendered as a
 * placeholder if the image cannot be loaded and there is no valid Blurhash.
 */
export default function Image(props: Props): Node {
  const [isImageLoaded, setImageLoaded] = useState(false);

  if (props.src != null) {
    warning(
      props.alt != null,
      'You should specify alternative image text via `alt` property. This is an important ' +
        'part of accessibility for screen reader users in order for them to understand the ' +
        "content's purpose on the page.",
    );
  }

  const isBlurhashValid = _isBlurhashValid(props.blurhash).result === true;
  if (props.blurhash != null) {
    warning(isBlurhashValid, 'The specified blurhash value is not valid: "%s"', props.blurhash);
  }

  const Blurhash = isBlurhashValid ? (
    <ReactBlurhash
      hash={props.blurhash}
      style={{
        // `ReactBlurhash` renders `<div><canvas/></div>` and this style object is being applied to
        // the wrapping div. Here we make sure that the canvas is rendered into responsive rectangle
        // with ratio 1:1 and it has rounded corners.
        height: 'auto',
        width: '100%',
        paddingBlockEnd: '100%', // = width for a 1:1 aspect ratio (https://css-tricks.com/aspect-ratio-boxes/)
        borderRadius: 'var(--sx-radius)',
        overflow: 'hidden',
      }}
    />
  ) : (
    <div className={styles('backgroundPlaceholder')} />
  );

  return (
    <>
      {isImageLoaded === true ? null : Blurhash}

      {/* eslint-disable-next-line react/forbid-elements */}
      <img
        loading="lazy"
        src={props.src}
        alt={props.alt}
        className={styles('imgSrc')}
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
    </>
  );
}

const styles = sx.create({
  backgroundPlaceholder: {
    backgroundColor: 'rgba(var(--sx-accent-2))',
    borderRadius: 'var(--sx-radius)',
    width: '100%',
    paddingBlockEnd: '100%', // = width for a 1:1 aspect ratio (https://css-tricks.com/aspect-ratio-boxes/)
  },
  imgSrc: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    borderRadius: 'var(--sx-radius)',
  },
});
