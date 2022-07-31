// @flow

import Icon from '@adeira/icons';
import NextLink from 'next/link';
import {
  LayoutBlock,
  LayoutInline,
  LinkButton,
  Money,
  Text,
  SupportedCurrencies,
} from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import StripeRedirectExplanation from './StripeRedirectExplanation';

export default function DonationsOneTime(): React.Node {
  // MXN => stripe.com
  const oneTimeDonations = new Map([
    [100, 'https://buy.stripe.com/00g2bxa9p9Fw7C07su'], // 100 pesos contribution (one-time)
    [200, 'https://buy.stripe.com/9AQcQbftJaJA1dCdQU'], // 200 pesos contribution (one-time)
    [500, 'https://buy.stripe.com/28o6rNgxN9Fw4pO28e'], // 500 pesos contribution (one-time)
    [1000, 'https://buy.stripe.com/4gw3fB2GX2d41dCbIQ'], // 1000 pesos contribution (one-time)
  ]);

  return (
    <LayoutBlock>
      <Text as="h3">
        <fbt desc="one-time donation subtitle">One-time donation</fbt> <Icon name="heart" />
      </Text>
      <Text>
        <fbt desc="one-time donation description">
          Show us your support by sending a one-time donation. You will be charged only once.
        </fbt>
      </Text>

      <LayoutInline>
        {Array.from(oneTimeDonations).map(([donationValue, stripeLink]) => {
          return (
            <span className={styles('buttonWithMoneyOneTime')} key={stripeLink}>
              <LinkButton
                // TODO: send it through Abacus? (not stripe.com directly)
                href={stripeLink}
                tint="success"
                target="_blank"
                nextLinkComponent={NextLink}
              >
                <Money
                  priceUnitAmount={donationValue}
                  priceUnitAmountCurrency={SupportedCurrencies.MXN}
                />
              </LinkButton>
            </span>
          );
        })}
      </LayoutInline>

      <StripeRedirectExplanation />
    </LayoutBlock>
  );
}

const styles = sx.create({
  // $FlowExpectedError[prop-missing]: the CSS variable is not defined as a CSS property
  buttonWithMoneyOneTime: {
    '--sx-money-text-color': 'var(--sx-background)',
    ':hover': {
      '--sx-money-text-color': 'var(--sx-success)',
    },
  },
});
