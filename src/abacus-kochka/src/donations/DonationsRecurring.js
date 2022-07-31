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

export default function DonationsRecurring(): React.Node {
  // MXN => stripe.com
  const recurringDonations = new Map([
    [100, 'https://buy.stripe.com/00g3fBbdtg3U3lK8wz'], // 100 pesos contribution (recurrent)
    [200, 'https://buy.stripe.com/5kAeYjchx4lc8G46ot'], // 200 pesos contribution (recurrent)
    [500, 'https://buy.stripe.com/7sI9DZ81h1906xWdQX'], // 500 pesos contribution (recurrent)
    [1000, 'https://buy.stripe.com/aEU03p5T9eZQ09ybIR'], // 1000 pesos contribution (recurrent)
  ]);

  return (
    <LayoutBlock>
      <Text as="h3">
        <fbt desc="recurring donation subtitle">Recurring donation (monthly)️️</fbt>{' '}
        <Icon name="heart" />
        <Icon name="heart" />
      </Text>
      <Text>
        <fbt desc="recurring donation description">
          A recurring donation is for people who want to support KOCHKA Café and ultimately our cats
          on a monthly basis. We cannot express enough how grateful we are.
        </fbt>
      </Text>

      <LayoutInline>
        {Array.from(recurringDonations).map(([donationValue, stripeLink]) => {
          return (
            <span className={styles('buttonWithMoneyRecurring')} key={stripeLink}>
              <LinkButton
                // TODO: send it through Abacus? (not stripe.com directly)
                href={stripeLink}
                tint="warning"
                target="_blank"
                nextLinkComponent={NextLink}
              >
                <fbt desc="recurring monetary value per month">
                  <fbt:param name="price">
                    <Money
                      priceUnitAmount={donationValue}
                      priceUnitAmountCurrency={SupportedCurrencies.MXN}
                    />
                  </fbt:param>{' '}
                  / month
                </fbt>
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
  buttonWithMoneyRecurring: {
    '--sx-money-text-color': 'var(--sx-background)',
    ':hover': {
      '--sx-money-text-color': 'var(--sx-warning)',
    },
  },
});
