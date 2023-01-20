// @flow

import { rangeMap } from '@adeira/js';
import sx from '@adeira/sx';
import { LayoutGrid, MediaQueryDevice, Skeleton } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { Suspense, type Node } from 'react';

import Layout from '../Layout';
import ShopLayoutContent from './ShopLayoutContent';

export default function ShopLayout(): Node {
  return (
    <Layout
      withFullWidth={true}
      title={<fbt desc="shop page title">Online shop</fbt>}
      subtitle={
        <fbt desc="shop page subtitle">Support our cats by buying some of our products</fbt>
      }
    >
      <div className={styles('shopGrid')}>
        {/* TODO: shopGridCategories */}

        <div className={styles('shopGridContent')}>
          <Suspense
            fallback={
              <LayoutGrid minColumnWidth="200px">
                {rangeMap(12, (i) => (
                  <Skeleton key={i} />
                ))}
              </LayoutGrid>
            }
          >
            <ShopLayoutContent />
          </Suspense>
        </div>

        {/* TODO: shopGridRelevance */}
      </div>
    </Layout>
  );
}

const styles = sx.create({
  shopGrid: {
    width: '100%',
    display: 'grid',
    gap: '1rem',
    gridTemplateAreas: `
      "shopGridCategories"
      "shopGridRelevance"
      "shopGridContent"
    `,
    [MediaQueryDevice.DESKTOP]: {
      gridTemplateColumns: '150px minmax(200px, 1fr) 150px',
      gridTemplateAreas: `
        "shopGridCategories shopGridContent shopGridRelevance"
      `,
    },
  },
  shopGridContent: {
    gridArea: 'shopGridContent',
  },
});
