// @flow

import * as React from 'react';
import { Heading, Note, Section } from '@adeira/sx-design';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import type { IndexPageQuery } from './__generated__/IndexPageQuery.graphql';

export default function IndexPage(): React.Node {
  const data = useLazyLoadQuery<IndexPageQuery>(
    graphql`
      query IndexPageQuery {
        analytics {
          mostSoldProducts {
            productId
            productName
            productUnits
          }
          leastSoldProducts {
            productId
            productName
            productUnits
          }
        }
      }
    `,
  );

  return (
    <>
      <Heading>
        <fbt desc="quick analytics (stats) on the Abacus homepage">Quick analytics</fbt>
      </Heading>
      <Note tint="warning">work in progress</Note>
      <Section>
        <Heading>
          <fbt desc="most sold products heading">Most sold products</fbt>
        </Heading>
        <Section>
          <ol>
            {data.analytics.mostSoldProducts.map((info) => (
              <li key={info.productId}>
                {info.productName} ({info.productUnits} units)
              </li>
            ))}
          </ol>
        </Section>

        <Heading>
          <fbt desc="least sold products heading">Least sold products</fbt>
        </Heading>
        <Section>
          <ol>
            {data.analytics.leastSoldProducts.map((info) => (
              <li key={info.productId}>
                {info.productName} ({info.productUnits} units)
              </li>
            ))}
          </ol>
        </Section>
      </Section>
    </>
  );
}
