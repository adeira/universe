// @flow

import { LayoutBlock, Text } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../Layout';
import DonationsOneTime from './DonationsOneTime';
import DonationsRecurring from './DonationsRecurring';

export default function Donations(): React.Node {
  return (
    <Layout
      title={<fbt desc="donation page title">Donate</fbt>}
      subtitle={<fbt desc="donation page subtitle">Help us create a better life for our cats</fbt>}
    >
      <LayoutBlock spacing="large">
        <LayoutBlock>
          <Text>
            <fbt desc="paragraph">
              The ultimate goal of <strong>KOCHKA Café</strong> is to help cats who really need it.
              Having a coffee shop definitely helps. However, we would like to give an extraordinary
              life to our cats. Why? Because all of our cats went through some bad times in their
              life. Either they were abandoned, thrown away, or born into some bad conditions. And
              we believe that all of them deserve to have the best - the ultimate second chance.
            </fbt>
          </Text>
          <Text>
            <fbt desc="paragraph">
              We would like to ask you to consider donating to KOCHKA Café so we can achieve this
              goal. Help us to buy them better food. Help us to buy them more toys. Help us to make
              their life awesome.
            </fbt>
          </Text>
        </LayoutBlock>
        <DonationsOneTime />
        <DonationsRecurring />
      </LayoutBlock>
    </Layout>
  );
}
