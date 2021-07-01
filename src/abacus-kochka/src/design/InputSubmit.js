// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +name: string,
  +value: Fbt,
  +id?: string,
};

export default function InputSubmit(props: Props): React.Node {
  // eslint-disable-next-line react/forbid-elements
  return <input type="submit" className={styles('inputSubmit')} {...props} />;
}

const styles = sx.create({
  inputSubmit: {
    paddingInline: '1rem',
    paddingBlock: '.5rem',
    borderRadius: '.25rem',
  },
});
