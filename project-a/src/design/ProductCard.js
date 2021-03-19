// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Heading from './Heading';

export default function ProductCard(): React.Node {
  // TODO: use Blurhash when loading the images
  return (
    <div className={styles('wrapper')}>
      <Heading xstyle={styles.productTitle}>
        <span>Product Name</span>
      </Heading>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    height: 250,
    width: 250,
    display: 'flex',
  },
  // eslint-disable-next-line sx/no-unused-stylesheet
  productTitle: {
    display: 'flex',
    padding: 20,
    color: 'var(--font-color-dark)',
    transitionProperty: 'background-color',
    transitionDuration: '500ms',
    transitionTimingFunction: 'ease-in-out',
  },
});
