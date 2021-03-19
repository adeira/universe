// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import { Heading } from '@adeira/sx-design';

import Layout from '../../src/Layout';

export default function ShopProductPage(): React.Node {
  return (
    <Layout withFullWidth={true} title={<fbt desc="TODO">TODO</fbt>} withHiddenTitle={true}>
      <div className={styles('layout')}>
        <div className={styles('image')}>
          <Heading>Product Title TODO</Heading>
        </div>
        <div>
          <p>Product description TODO.</p>
          <button type="submit">Add to Cart</button>
        </div>
      </div>
    </Layout>
  );
}

const styles = sx.create({
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  image: {
    width: '50vw',
    height: '50vw',
    backgroundColor: '#ddd',
  },
});
