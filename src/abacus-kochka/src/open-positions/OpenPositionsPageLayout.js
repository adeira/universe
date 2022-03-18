// @flow

import { LayoutBlock, Link } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../Layout';
import OpenPosition from './OpenPosition';

export default function OpenPositionsPageLayout(): React.Node {
  return (
    <Layout
      title={<fbt desc="open positions page title">Open positions</fbt>}
      subtitle={<fbt desc="open positions page subtitle">Would you like to work with us?</fbt>}
    >
      <LayoutBlock>
        <OpenPosition
          title={<fbt desc="assistant position title">Cafeteria Assistant</fbt>}
          descriptionComponent={
            <p>
              <fbt desc="assistant position description">
                Cafeteria Assistant is responsible for customer service, keeping facilities clean,
                and assisting in food preparation. This is a full-time position only.
              </fbt>
            </p>
          }
        />

        <OpenPosition
          title={<fbt desc="barista position title">Barista</fbt>}
          descriptionComponent={
            <p>
              <fbt desc="barista position description">
                Barista is responsible for preparation of coffee based drinks, teas, milkshakes and
                other specialities as well as attending our clients and keeping the workplace clean.
                This is a full-time position only.
              </fbt>
            </p>
          }
        />

        <OpenPosition
          title={<fbt desc="mystery shopper position title">Mystery Shopper</fbt>}
          descriptionComponent={
            <p>
              <fbt desc="mystery shopper position description">
                Mystery Shopper is responsible for making sure that we always provide the best
                services and products to our customers. It does so by visiting our café (secretly)
                while pretending to be a normal customer and later reporting any observations.
              </fbt>
            </p>
          }
        />

        <OpenPosition
          title={<fbt desc="mystery shopper position title">Open-source Developer</fbt>}
          descriptionComponent={
            <>
              <p>
                <fbt desc="mystery shopper position description">
                  Open-source Developer is responsible for developing software running behind the
                  scenes of KOCHKA Café. Knowledge of Git, JavaScript and Rust are very important.
                </fbt>
              </p>
              <p>
                <fbt desc="open-source code explainer">
                  Did you know? All your software is publically available{' '}
                  <fbt:param name="github link">
                    <Link href="https://github.com/adeira/universe" target="_blank">
                      on GitHub
                    </Link>
                  </fbt:param>.
                </fbt>
              </p>
            </>
          }
        />
      </LayoutBlock>
    </Layout>
  );
}
