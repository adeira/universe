// @flow

import { LayoutBlock, LayoutInline, LinkButton, Money, Text } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import Layout from '../Layout';
import StripeRedirectExplanation from './StripeRedirectExplanation';

export default function Donations(): React.Node {
  // MXN => stripe.com
  const oneTimeDonations = new Map([
    [
      50, // 50 MXN donation (one-time)
      __DEV__
        ? 'https://buy.stripe.com/test_14k3eF0s63PAgGk4gg'
        : 'https://buy.stripe.com/3cs8zV4P56tk2hGaEE',
    ],
    [100, 'https://buy.stripe.com/00g2bxa9p9Fw7C07su'], // 100 MXN donation (one-time)
    [200, 'https://buy.stripe.com/9AQcQbftJaJA1dCdQU'], // 200 MXN donation (one-time)
    [500, 'https://buy.stripe.com/28o6rNgxN9Fw4pO28e'], // 500 MXN donation (one-time)
    [1000, 'https://buy.stripe.com/4gw3fB2GX2d41dCbIQ'], // 1000 MXN donation (one-time)
  ]);

  // MXN => stripe.com
  const recurringDonations = new Map([
    [
      50, // 50 MXN donation (recurrent)
      __DEV__
        ? 'https://buy.stripe.com/test_8wM02t3Ei3PAgGk4gh'
        : 'https://buy.stripe.com/8wMcQb4P53h8f4saEF',
    ],
    [100, 'https://buy.stripe.com/00g3fBbdtg3U3lK8wz'], // 100 MXN donation (recurrent)
    [200, 'https://buy.stripe.com/5kAeYjchx4lc8G46ot'], // 200 MXN donation (recurrent)
    [500, 'https://buy.stripe.com/7sI9DZ81h1906xWdQX'], // 500 MXN donation (recurrent)
    [1000, 'https://buy.stripe.com/aEU03p5T9eZQ09ybIR'], // 1000 MXN donation (recurrent)
  ]);

  return (
    <Layout
      title={<fbt desc="donate page title">♥️ Donate ♥️</fbt>}
      subtitle={<fbt desc="donate page subtitle">Help us create a better life for our cats</fbt>}
    >
      <LayoutBlock>
        <Text>
          <fbt desc="paragraph">
            The ultimate goal of <strong>KOCHKA Café</strong> is to help cats who really need it.
            Having a coffee shop definitely helps. However, we would like to give an extraordinary
            life to our cats. Why? Because all of our cats went through some bad times in their
            life. Either they were abandoned, thrown away, or born into some bad conditions. And we
            believe that all of them deserve to have the best - the ultimate second chance.
          </fbt>
        </Text>
        <Text>
          <fbt desc="paragraph">
            We would like to ask you to consider donating to KOCHKA Café so we can achieve this
            goal. Help us to buy them better food. Help us to buy them more toys. Help us to make
            their life awesome.
          </fbt>
        </Text>

        {/* One-time donations: */}

        <Text as="h3">
          <fbt desc="one-time donation subtitle">One-time donation ♥️</fbt>
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
                >
                  <Money priceUnitAmount={donationValue} priceUnitAmountCurrency="MXN" />
                </LinkButton>
              </span>
            );
          })}
        </LayoutInline>

        <StripeRedirectExplanation />

        {/* Recurring donations: */}

        <Text as="h3">
          <fbt desc="recurring donation subtitle">Recurring donation (monthly) ♥♥️️</fbt>
        </Text>
        <Text>
          <fbt desc="recurring donation description">
            A recurring donation is for people who want to support KOCHKA Café and ultimately our
            cats on a monthly basis. We cannot express enough how grateful we are.
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
                >
                  <fbt desc="recurring monetary value per month">
                    <fbt:param name="price">
                      <Money priceUnitAmount={donationValue} priceUnitAmountCurrency="MXN" />
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
    </Layout>
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
  // $FlowExpectedError[prop-missing]: the CSS variable is not defined as a CSS property
  buttonWithMoneyRecurring: {
    '--sx-money-text-color': 'var(--sx-background)',
    ':hover': {
      '--sx-money-text-color': 'var(--sx-warning)',
    },
  },
});
