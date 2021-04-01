// @flow

import { LayoutBlock, Text } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import CatsTableAdopted from './CatsTableAdopted';
import CatsTableCurrent from './CatsTableCurrent';

export default function CatsPage(): React.Node {
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(graphql`
    query CatsPageQuery {
      cats {
        ...CatsTableCurrentFragment
        ...CatsTableAdoptedFragment
      }
    }
  `);

  return (
    <LayoutBlock spacing="large">
      <LayoutBlock spacing="none">
        <Text as="h2">
          <fbt desc="title of a section of currently available cats">Currently available cats</fbt>
        </Text>
        <p>
          <fbt desc="description of a section of currently available cats">
            List of cats currently living in KOCHKA Café.
          </fbt>
        </p>
        <CatsTableCurrent data={data.cats} />
      </LayoutBlock>

      <LayoutBlock spacing="none">
        <Text as="h2">
          <fbt desc="title of a section of already adopted cats">Adopted cats</fbt>
        </Text>
        <p>
          <fbt desc="description of a section of already adopted cats">
            List of cats that are no longer in KOCHKA Café because they were adopted.
          </fbt>
        </p>
        <CatsTableAdopted data={data.cats} />
      </LayoutBlock>
    </LayoutBlock>
  );
}
