// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Footer from './Footer';

export default function SubpageFooter(): React.Node {
  return (
    <div className={styles('wrapper')}>
      <Footer />
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    marginTop: '5vw',
    padding: '5vw',
    backgroundColor: '#e9e9e9',
  },
});
