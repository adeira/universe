// @flow

import sx from '@adeira/sx';
import { Note } from '@adeira/sx-design';
import React, { type Node, type Element } from 'react';
import { fbt } from 'fbt';

import LayoutApp from '../src/LayoutApp';

export default function IndexPage(): Node {
  return (
    <div className={styles('wrapper')}>
      <Note tint="warning">
        <fbt desc="welcome index message">WIP</fbt>
      </Note>
    </div>
  );
}

IndexPage.getLayout = (page: Element<typeof IndexPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);

const styles = sx.create({
  wrapper: {
    color: 'rgba(var(--sx-foreground))',
  },
});
