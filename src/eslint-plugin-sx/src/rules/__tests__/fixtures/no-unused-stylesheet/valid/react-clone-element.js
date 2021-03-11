// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: React.Element<'strong'>,
};

export default function IconButton({ children, ...props }: Props): React.Node {
  return (
    <button {...props} type="button" className={styles('button')}>
      {React.cloneElement(children, {
        className: styles('icon'),
      })}
    </button>
  );
}

const styles = sx.create({
  button: {
    backgroundColor: 'blue',
  },
  icon: {
    color: 'white',
  },
});
