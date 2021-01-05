// @flow

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {|
  +name: string,
  +onChange: (event: SyntheticInputEvent<>) => void,
  +type: 'email' | 'text',
  +value: Fbt,
  +id?: string,
  +placeholder?: FbtWithoutString,
  +tabIndex?: number,
  +xstyle?: $FlowFixMe, // TODO: https://github.com/adeira/universe/issues/1584
|};

export default function Input(props: Props): React.Node {
  const stylesheetA = styles.inputDefault;
  const stylesheetB = props.xstyle ?? new Map(); // TODO: https://github.com/adeira/universe/pull/1583

  // eslint-disable-next-line react/forbid-elements
  return <input className={sx(stylesheetA, stylesheetB)} {...props} />;
}

const styles = sx.create({
  inputDefault: {
    paddingLeft: '.75rem',
    paddingRight: '.75rem',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    borderRadius: '.25rem',
  },
});
