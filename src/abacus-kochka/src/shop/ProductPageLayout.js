// @flow

import { graphql, QueryRenderer } from '@adeira/relay';
import sx from '@adeira/sx';
import { Note, ProductCard } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';
import RenderSlateNodes from './RenderSlateNodes';
import useViewerContext from '../hooks/useViewerContext';

export default function ProductPageLayout(): Node {
  const router = useRouter();
  const viewerContext = useViewerContext();
  const productKey = router.query.product_key;

  return (
    <QueryRenderer
      query={graphql`
        query ProductPageLayoutQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
          commerce {
            product: getPublishedProductByKey(
              clientLocale: $clientLocale
              productKey: $productKey
            ) {
              name
              descriptionSlate
              price {
                unitAmount
                unitAmountCurrency
              }
              imageCover {
                blurhash
                url
              }
            }
          }
        }
      `}
      variables={{
        clientLocale: viewerContext.languageTag.graphql,
        productKey,
      }}
      onResponse={({ commerce: { product } }) => {
        return (
          <Layout withFullWidth={true} withHiddenTitle={true}>
            <div className={styles('layout')}>
              <div className={styles('image')}>
                <ProductCard
                  title={product.name}
                  priceUnitAmount={
                    product.price.unitAmount / 100 // adjusted for centavo
                  }
                  priceUnitAmountCurrency={product.price.unitAmountCurrency}
                  imgBlurhash={product.imageCover.blurhash}
                  imgSrc={product.imageCover.url}
                  imgAlt={product.name}
                />
              </div>
              <div>
                <RenderSlateNodes nodes={JSON.parse(product.descriptionSlate)} />
                <Note tint="warning">
                  <fbt desc="not about all our products being available only in person">
                    All our products are currently available only in person in our café. We are
                    working on making them available online as well.
                  </fbt>
                </Note>
              </div>
            </div>
          </Layout>
        );
      }}
    />
  );
}

const styles = sx.create({
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  image: {
    // width: '50vw',
    // height: '50vw',
    backgroundColor: '#ddd',
  },
});
