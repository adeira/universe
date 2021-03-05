// @flow

import { graphql, useMutation } from '@adeira/relay';
import type { Node } from 'react';

import type { CheckoutMutation } from './__generated__/CheckoutMutation.graphql';

export default function Checkout(): Node {
  const [checkout, isCheckoutPending] = useMutation<CheckoutMutation>(graphql`
    mutation CheckoutMutation {
      pos {
        checkout {
          __typename
          ... on PosCheckoutPayload {
            id
          }
          ... on PosCheckoutError {
            message
          }
        }
      }
    }
  `);

  const handleCheckoutClick = () => {
    checkout({
      onCompleted: ({ pos: { checkout } }) => {
        if (checkout.__typename === 'PosCheckoutPayload') {
          // eslint-disable-next-line no-console
          console.warn(checkout); // TODO
        } else if (checkout.__typename === 'PosCheckoutError') {
          // eslint-disable-next-line no-console
          console.error(checkout); // TODO
        }
      },
    });
  };

  // TODO:
  //  - send selected products and their prices to the server
  return (
    <button type="button" onClick={handleCheckoutClick} disabled={isCheckoutPending}>
      Checkout (TODO)
    </button>
  );
}
