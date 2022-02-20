// @flow

import { Text } from '@adeira/sx-design';
import fbt from 'fbt';
import * as React from 'react';

export default function StripeRedirectExplanation(): React.Node {
  return (
    <Text as="small">
      <em>
        <fbt desc="stripe redirect explanation">
          You will be redirected to an external Stripe page (<code>buy.stripe.com</code>) after
          clicking on the button above where you can complete the donation.
        </fbt>
      </em>
    </Text>
  );
}
