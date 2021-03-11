/**
 * This is an example of an edge-case which we are currently unable to catch. It's because
 * the code is quite complex in terms of the static analysis and we are bailing out early
 * since we are not sure. Could be improved though.
 *
 * @flow
 */

import * as React from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: React.Element<'strong'>,
};

export default function IconButton({ children, ...props }: Props): React.Node {
  return (
    // $FlowExpectedError[incompatible-call]: the style doesn't exist
    <button {...props} type="button" className={styles('unable-to-analyze-this-1')}>
      {React.cloneElement(children, {
        // TODO: improve the analysis (we are bailing out early unable to catch this)
        // $FlowExpectedError[incompatible-call]: the style doesn't exist
        className: styles('unable-to-analyze-this-2'),
      })}
    </button>
  );
}

const styles = sx.create({
  // ⚠️
  unused: {
    backgroundColor: 'blue',
  },
});
