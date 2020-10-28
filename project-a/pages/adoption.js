// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Subpage from '../src/Subpage';

function FakeKittenImage() {
  return (
    <img
      className={styles('imageThumbnail')}
      alt={<fbt desc="kitten image placeholder">kitten image placeholder</fbt>}
      src="https://images.unsplash.com/photo-1597626133612-d9977d3eec18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
    />
  );
}

export default function Adoption(): React.Node {
  return (
    <Subpage title={<fbt desc="adoption page title">Adoption</fbt>}>
      {/* TODO */}
      {/* <p> */}
      {/*   <fbt desc="">We are not just a cat café. We want to help.</fbt> */}
      {/* </p> */}
      <div className={styles('root')}>
        <FakeKittenImage />
        <FakeKittenImage />
        <FakeKittenImage />
        <FakeKittenImage />
        <FakeKittenImage />
      </div>
    </Subpage>
  );
}

const styles = sx.create({
  root: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexFlow: 'wrap',
  },
  imageThumbnail: {
    border: '1px solid #dee2e6',
    borderRadius: '.25rem',
    maxWidth: '250px',
    height: 'auto',
    marginRight: '.5rem',
    marginBottom: '.5rem',
  },
});
