// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

type Props = {|
  +name: string,
  +value: Fbt,
  +id?: string,
|};

export default function InputSubmit(props: Props): React.Node {
  // eslint-disable-next-line react/forbid-elements
  return <input type="submit" className={styles('inputSubmit')} {...props} />;
}

const styles = sx.create({
  inputSubmit: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    borderRadius: '.25rem',
  },
});
