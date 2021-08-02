// @flow

import sx from '@adeira/sx';
import { ButtonLink, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';
import { useSetRecoilState } from 'recoil';

import filtersAtom, { type State as AtomState } from './recoil/filtersAtom';
import Layout from '../Layout';
import ShopLayoutContent from './ShopLayoutContent';

export default function ShopLayout(): Node {
  const setFilters = useSetRecoilState(filtersAtom);

  // TODO: hide closer to the atom (with tests)
  const handleChangeFilters = (newState: $Shape<AtomState>) => {
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
          <Text as="h2">
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

        <div>
          <ShopLayoutContent />
        </div>

        <div className={styles('shopGridRelevance')}>
          <Text as="h2">
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
    gridTemplateColumns: '250px minmax(250px, 1fr) 250px',
    gap: '1rem',
  },
  shopGridCategories: {
    marginInlineStart: '1rem',
  },
  shopGridRelevance: {
    marginInlineEnd: '1rem',
  },
});
