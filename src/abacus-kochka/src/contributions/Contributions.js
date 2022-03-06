// @flow

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

import Layout from '../Layout';
import StripeRedirectExplanation from './StripeRedirectExplanation';

/**
 * Note: we call it "contribution" and not "donations" because of some legal bullshit with SAT (MX).
 */
export default function Contributions(): React.Node {
  // MXN => stripe.com
  const oneTimeContributions = new Map([
    [
      50, // 50 pesos contribution (one-time)
      __DEV__
        ? 'https://buy.stripe.com/test_14k3eF0s63PAgGk4gg'
        : 'https://buy.stripe.com/3cs8zV4P56tk2hGaEE',
    ],
    [100, 'https://buy.stripe.com/00g2bxa9p9Fw7C07su'], // 100 pesos contribution (one-time)
    [200, 'https://buy.stripe.com/9AQcQbftJaJA1dCdQU'], // 200 pesos contribution (one-time)
    [500, 'https://buy.stripe.com/28o6rNgxN9Fw4pO28e'], // 500 pesos contribution (one-time)
    [1000, 'https://buy.stripe.com/4gw3fB2GX2d41dCbIQ'], // 1000 pesos contribution (one-time)
  ]);

  // MXN => stripe.com
  const recurringContributions = new Map([
    [
      50, // 50 pesos contribution (recurrent)
      __DEV__
        ? 'https://buy.stripe.com/test_8wM02t3Ei3PAgGk4gh'
        : 'https://buy.stripe.com/8wMcQb4P53h8f4saEF',
    ],
    [100, 'https://buy.stripe.com/00g3fBbdtg3U3lK8wz'], // 100 pesos contribution (recurrent)
    [200, 'https://buy.stripe.com/5kAeYjchx4lc8G46ot'], // 200 pesos contribution (recurrent)
    [500, 'https://buy.stripe.com/7sI9DZ81h1906xWdQX'], // 500 pesos contribution (recurrent)
    [1000, 'https://buy.stripe.com/aEU03p5T9eZQ09ybIR'], // 1000 pesos contribution (recurrent)
  ]);

  return (
    <Layout
      title={<fbt desc="contribute page title">♥️ Voluntary contribution ♥️</fbt>}
      subtitle={
        <fbt desc="contribute page subtitle">Help us create a better life for our cats</fbt>
      }
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
            We would like to ask you to consider contributing to KOCHKA Café so we can achieve this
            goal. Help us to buy them better food. Help us to buy them more toys. Help us to make
            their life awesome.
          </fbt>
        </Text>

        {/* One-time contributions: */}

        <Text as="h3">
          <fbt desc="one-time contribution subtitle">One-time contribution ♥️</fbt>
        </Text>
        <Text>
          <fbt desc="one-time contribution description">
            Show us your support by sending a one-time contribution. You will be charged only once.
          </fbt>
        </Text>

        <LayoutInline>
          {Array.from(oneTimeContributions).map(([contributionValue, stripeLink]) => {
            return (
              <span className={styles('buttonWithMoneyOneTime')} key={stripeLink}>
                <LinkButton
                  // TODO: send it through Abacus? (not stripe.com directly)
                  href={stripeLink}
                  tint="success"
                  target="_blank"
                >
                  <Money
                    priceUnitAmount={contributionValue}
                    priceUnitAmountCurrency={SupportedCurrencies.MXN}
                  />
                </LinkButton>
              </span>
            );
          })}
        </LayoutInline>

        <StripeRedirectExplanation />

        {/* Recurring contributions: */}

        <Text as="h3">
          <fbt desc="recurring contribution subtitle">Recurring contribution (monthly) ♥♥️️</fbt>
        </Text>
        <Text>
          <fbt desc="recurring contribution description">
            A recurring contribution is for people who want to support KOCHKA Café and ultimately
            our cats on a monthly basis. We cannot express enough how grateful we are.
          </fbt>
        </Text>

        <LayoutInline>
          {Array.from(recurringContributions).map(([contributionValue, stripeLink]) => {
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
                      <Money
                        priceUnitAmount={contributionValue}
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
