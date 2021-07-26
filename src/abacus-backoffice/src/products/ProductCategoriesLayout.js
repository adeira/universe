// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { Heading, Note } from '@adeira/sx-design';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';

export default function ProductCategoriesLayout(): Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading xstyle={styles.heading}>
            <fbt desc="products categories title">Products categories</fbt>
          </Heading>
        }
      />

      <Note tint="warning">work in progress (print all categories, create, edit)</Note>
    </Layout>
  );
}

const styles = sx.create({
  heading: {
    marginBlockEnd: 0,
  },
});
