// @flow

import { LayoutBlock, Link } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import FullTimeBadge from './badges/FullTimeBadge';
import Layout from '../Layout';
import OpenPosition from './OpenPosition';
// import PositionAvailableBadge from './badges/PositionAvailableBadge';
import PositionUnavailableBadge from './badges/PositionUnavailableBadge';
import SalaryBadge from './badges/SalaryBadge';

export default function OpenPositionsPageLayout(): React.Node {
  return (
    <Layout
      title={<fbt desc="open positions page title">Open positions</fbt>}
      subtitle={<fbt desc="open positions page subtitle">Would you like to work with us?</fbt>}
    >
      <LayoutBlock spacing="large">
        {/* TODO: Why working for KOCHKA Café?
             - a company with European co-founder requiring higher standards
             - bullshit free (admit we cannot offer great benefits now)
             - transparent/open company
             - we have cats
             - min requirements: 18+, horario
         */}
        <OpenPosition
          title={
            <fbt desc="assistant position title">
              Person responsible for our premises and customers (Ayudante General)
            </fbt>
          }
          badges={[
            <PositionUnavailableBadge key={1} />,
            <FullTimeBadge key={2} />,
            <SalaryBadge key={3} />,
          ]}
          description={
            <fbt desc="assistant position description">
              Person in this position is responsible for customer service, keeping the facilities
              clean, and assisting in the food preparation sector. This is a full-time position
              only.
            </fbt>
          }
        />

        <OpenPosition
          title={
            <fbt desc="barista position title">
              Person responsible for beverage preparation (Barista)
            </fbt>
          }
          badges={[
            <PositionUnavailableBadge key={1} />,
            <FullTimeBadge key={2} />,
            <SalaryBadge key={3} />,
          ]}
          description={
            <fbt desc="barista position description">
              Barista is responsible for preparation of coffee based drinks, teas, milkshakes and
              other specialities as well as attending our clients and keeping the workplace clean.
              This is a full-time position only.
            </fbt>
          }
        />

        <OpenPosition
          title={<fbt desc="chef position title">Person responsible for food preparation</fbt>}
          badges={[
            <PositionUnavailableBadge key={1} />,
            <FullTimeBadge key={2} />,
            <SalaryBadge key={3} />,
          ]}
          description={
            <fbt desc="chef position description">
              Person in charge of food preparation is responsible for preparing and improving our
              food options as well as attending our clients and keeping the workplace clean. This is
              a full-time position only.
            </fbt>
          }
        />

        <OpenPosition
          title={<fbt desc="mystery shopper position title">Mystery Shopper</fbt>}
          badges={[<PositionUnavailableBadge key={1} />]}
          description={
            <fbt desc="mystery shopper position description">
              Mystery Shopper is responsible for making sure that we always provide the best
              services and products to our customers. It does so by visiting our café (secretly)
              while pretending to be a normal customer and later reporting any observations.
            </fbt>
          }
        />

        <OpenPosition
          title={<fbt desc="mystery shopper position title">Open-source Developer</fbt>}
          badges={[<PositionUnavailableBadge key={1} />]}
          description={
            <fbt desc="mystery shopper position description">
              Open-source Developer is responsible for developing software running behind the scenes
              of KOCHKA Café. We use Git, JavaScript, and Rust and all our code us publicly
              available{' '}
              <fbt:param name="github link">
                <Link href="https://github.com/adeira/universe" target="_blank">
                  on GitHub
                </Link>
              </fbt:param>.
            </fbt>
          }
        />
      </LayoutBlock>
    </Layout>
  );
}
