// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

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
    marginTop: 50,
    padding: 50,
    backgroundColor: '#e9e9e9',
  },
});
