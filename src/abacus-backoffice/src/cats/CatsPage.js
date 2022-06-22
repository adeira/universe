// @flow

import { LayoutBlock } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

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
      <CatsTableCurrent data={data.cats} />
      <CatsTableAdopted data={data.cats} />
    </LayoutBlock>
  );
}
