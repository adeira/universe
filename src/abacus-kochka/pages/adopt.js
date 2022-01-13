// @flow

import { LayoutBlock, Money, Table, Text } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../src/Layout';

export default function RulesPage(): React.Node {
  return (
    <Layout
      title={<fbt desc="adopt a cat - page title">Adopt a cat</fbt>}
      subtitle={<fbt desc="adopt a cat - page description">Help us to find them a loving home</fbt>}
    >
      <LayoutBlock spacing="large">
        <Text as="h3">
          <fbt desc="Article title H3: How do we admit new cats to KOCHKA Café?">
            How do we admit new cats to KOCHKA Café?
          </fbt>
        </Text>
        <Text as="p">
          <fbt desc="article paragraph">
            Each cat goes through a quarantine that lasts a minimum of 14 days. During this period
            we give them necessary medical care, deworming, recommended vaccination, and
            sterilization (in case their age allows that). Only after that, the cats can enter our
            café and can be adopted.
          </fbt>
        </Text>
        <Text as="p">
          <fbt desc="article paragraph">
            Older cats go through the same process except they already have to be sterilized before
            we can accept them. We cannot accept adult cats that are not sterilized.
          </fbt>
        </Text>

        <Text as="h3">
          <fbt desc="Article title H3: How can you adopt a new cat?">
            How can you adopt a new cat?
          </fbt>
        </Text>
        <Text as="p">
          <fbt desc="article paragraph">
            We try to create an environment supporting reasonable adoptions only. Every person who
            wants to adopt a cat has to fill a questionnaire to make sure our cats will find a safe
            and loving home. We also conduct an interview and ask for a financial contribution to
            cover part of the costs connected with the cats&apos; medical treatment.
          </fbt>
        </Text>
        <Text as="p">
          <fbt desc="article paragraph">
            It is also necessary to visit us in person first to get familiar with our cats.
            It&apos;s not possible to adopt a cat from KOCHKA Café without visiting us first.
          </fbt>
        </Text>

        <Text as="h3">
          <fbt desc="Article title H3: Adoption fees">Adoption fees</fbt>
        </Text>
        <Table
          columns={[
            { Header: <fbt desc="table header: cat age">Cat age</fbt>, accessor: 'col1' },
            {
              Header: <fbt desc="table header: adoption fee">Adoption fee</fbt>,
              accessor: 'col2',
            },
          ]}
          data={[
            {
              col1: <fbt desc="table cell: adult cat">Adult cat</fbt>,
              col2: <Money priceUnitAmount={1000} priceUnitAmountCurrency="MXN" />,
            },
            {
              col1: <fbt desc="table cell: kitten under 6 months">Kitten under 6 months</fbt>,
              col2: <Money priceUnitAmount={1500} priceUnitAmountCurrency="MXN" />,
            },
          ]}
        />
        <Text as="p">
          <fbt desc="article paragraph">The adoption fee includes:</fbt>
        </Text>
        <ul>
          <li>
            <fbt desc="adoption fee 1">sterilization surgery (in case the age allows it)</fbt>
          </li>
          <li>
            <fbt desc="adoption fee 2">
              recommended vaccinations (rabies and &quot;triple felina&quot;)
            </fbt>
          </li>
          <li>
            <fbt desc="adoption fee 3">initial worming</fbt>
          </li>
          <li>
            <fbt desc="adoption fee 4">fleas treatment</fbt>
          </li>
        </ul>
        <Text as="p">
          <fbt desc="article paragraph">
            Generally speaking, we do not make any profit from the adoption fees. We usually spend
            more money on the cats to give them a great and healthy life. The adoption fee simply
            helps us to lower the financial impact on our business.
          </fbt>
        </Text>

        <Text as="h3">
          <fbt desc="Article title H3: Adoption requirements">Adoption requirements</fbt>
        </Text>
        <Text as="p">
          <fbt desc="article paragraph">Before considering adoption, please make sure that:</fbt>
        </Text>
        <ul>
          <li>
            <fbt desc="adoption requirements 1">you are older than 18 years</fbt>
          </li>
          <li>
            <fbt desc="adoption requirements 2">
              you filled the adoption form and it was approved
            </fbt>
          </li>
          <li>
            <fbt desc="adoption requirements 3">
              you have valid INE and &quot;comprobante de domicilio&quot;
            </fbt>
          </li>
          <li>
            <fbt desc="adoption requirements 4">you understand the associated adoption fees</fbt>
          </li>
          <li>
            <fbt desc="adoption requirements 5">
              you mean the adoption seriously and are able to give the adopted cat a great life
            </fbt>
          </li>
        </ul>
      </LayoutBlock>
    </Layout>
  );
}
