// @flow

import type { PreloadedQuery } from '@adeira/relay';
import { Loader, Modal } from '@adeira/sx-design';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import ProductsGridModalBody from './ProductsGridModalBody';
import type { ProductsGridModalBodyQuery } from './__generated__/ProductsGridModalBodyQuery.graphql';

type Props = {
  +isOpen: boolean,
  +onClose: () => void,
  +productKey: string,
  +preloadedQueryRef: PreloadedQuery<ProductsGridModalBodyQuery>,
};

export default function ProductsGridModal(props: Props): Node {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={<fbt desc="product addons modal title">Product addons</fbt>}
    >
      <React.Suspense fallback={<Loader />}>
        <ProductsGridModalBody
          isOpen={props.isOpen}
          onClose={props.onClose}
          preloadedQueryRef={props.preloadedQueryRef}
          productKey={props.productKey}
        />
      </React.Suspense>
    </Modal>
  );
}
