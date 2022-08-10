// @flow

import sx from '@adeira/sx';
import type { Node } from 'react';

type Props = {
  +errorMessages: $ReadOnlyArray<string>,
};

/**
 * Use this component to display some generic error messages related to the form as a whole.
 */
export default function FormErrorMessages(props: Props): Node {
  return (
    <div className={styles('wrapper')}>
      <ul>
        {props.errorMessages.map((errorMessage, index) => {
          return <li key={index}>{errorMessage}</li>;
        })}
      </ul>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    color: 'rgba(var(--sx-error))',
  },
});
