// @flow

import { rangeMap } from '@adeira/js';
import sx from '@adeira/sx';
import { ButtonLink, LayoutGrid, MediaQueryDevice, Skeleton, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { Suspense, type Node } from 'react';
import { useSetRecoilState } from 'recoil';

import filtersAtom, { type State as AtomState } from './recoil/filtersAtom';
import Layout from '../Layout';
import ShopLayoutContent from './ShopLayoutContent';

export default function ShopLayout(): Node {
  const setFilters = useSetRecoilState(filtersAtom);

  // TODO: hide closer to the atom (with tests)
  const handleChangeFilters = (newState: $Partial<AtomState>) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        ...newState,
        categories: {
          ...prevState.categories,
          ...newState.categories,
        },
        relevance: {
          ...prevState.relevance,
          ...newState.relevance,
        },
      };
    });
  };

  return (
    <Layout
      withFullWidth={true}
      title={<fbt desc="shop page title">Online shop</fbt>}
      subtitle={
        <fbt desc="shop page subtitle">Support our cats by buying some of our products</fbt>
      }
    >
      <div className={styles('shopGrid')}>
        <div className={styles('shopGridCategories')}>
          <Text as="h2" size={24}>
            <fbt desc="shop categories selection title">All Categories</fbt>
          </Text>
          <div>
            <ButtonLink
              onClick={() => {
                handleChangeFilters({
                  categories: {
                    all: true,
                  },
                });
              }}
            >
              {/* TODO: fetch categories from GraphQL */}
              <fbt desc="shop all categories link">Shop All</fbt>
            </ButtonLink>
          </div>
        </div>

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

        <div className={styles('shopGridRelevance')}>
          <Text as="h2" size={24}>
            <fbt desc="shop relevance selection title">Relevance</fbt>
          </Text>
          <div>
            <ButtonLink
              onClick={() => {
                handleChangeFilters({
                  relevance: {
                    price: 'LOW_TO_HIGH',
                  },
                });
              }}
            >
              <fbt desc="price relevance low to high">Price: Low to high</fbt>
            </ButtonLink>
          </div>
          <div>
            <ButtonLink
              onClick={() => {
                handleChangeFilters({
                  relevance: {
                    price: 'HIGH_TO_LOW',
                  },
                });
              }}
            >
              <fbt desc="price relevance hight to low">Price: High to low</fbt>
            </ButtonLink>
          </div>
        </div>
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
  shopGridCategories: {
    gridArea: 'shopGridCategories',
    [MediaQueryDevice.DESKTOP]: {
      marginInlineStart: '1rem',
    },
  },
  shopGridContent: {
    gridArea: 'shopGridContent',
  },
  shopGridRelevance: {
    gridArea: 'shopGridRelevance',
    [MediaQueryDevice.DESKTOP]: {
      marginInlineEnd: '1rem',
    },
  },
});
