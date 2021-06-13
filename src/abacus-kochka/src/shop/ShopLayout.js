// @flow

import sx from '@adeira/sx';
import { Heading, Section, LinkButton } from '@adeira/sx-design';
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
      <Section xstyle={styles.shopGrid}>
        <div className={styles('shopGridCategories')}>
          <Heading>
            <fbt desc="shop categories selection title">All Categories</fbt>
          </Heading>
          <div>
            <LinkButton
              onClick={() => {
                handleChangeFilters({
                  categories: {
                    all: true,
                  },
                });
              }}
            >
              <fbt desc="shop all categories link">Shop All</fbt>
            </LinkButton>
          </div>
        </div>
        <div>
          <ShopLayoutContent />
        </div>
        <div className={styles('shopGridRelevance')}>
          <Heading>
            <fbt desc="shop relevance selection title">Relevance</fbt>
          </Heading>
          <div>
            <LinkButton
              onClick={() => {
                handleChangeFilters({
                  relevance: {
                    price: 'LOW_TO_HIGH',
                  },
                });
              }}
            >
              <fbt desc="price relevance low to high">Price: Low to high</fbt>
            </LinkButton>
          </div>
          <div>
            <LinkButton
              onClick={() => {
                handleChangeFilters({
                  relevance: {
                    price: 'HIGH_TO_LOW',
                  },
                });
              }}
            >
              <fbt desc="price relevance hight to low">Price: High to low</fbt>
            </LinkButton>
          </div>
        </div>
      </Section>
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
    marginLeft: '1rem',
  },
  shopGridRelevance: {
    marginRight: '1rem',
  },
});
