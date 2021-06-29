// @flow

import React, { type Node } from 'react';
import { Money } from '@adeira/sx-design';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';

export default function MenuSectionSweetDumpling(): Node {
  return (
    <>
      <MenuHeading>
        <fbt desc="sweet dumplings subtitle in our menu">Sweet Dumplings</fbt>
      </MenuHeading>

      <MenuRow
        title="Choco Salem"
        description={
          <fbt desc="description of choco salem dumpling">
            Dumpling filled with Oreo and Hershey&apos;s, wrapped in Oreo crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Manzana Azrael"
        description={
          <fbt desc="description of manzana azrael dumpling">
            Dumpling filled with apples and cinnamon, wrapped in bread crumbs and cinnamon.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Fresa Kitty"
        description={
          <fbt desc="description of fresa kitty dumpling">
            Dumpling filled with strawberries and condensed milk, wrapped in strawberry cookie
            crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Arroz Snowball"
        description={
          <fbt desc="description of arroz snowball dumpling">
            Dumpling filled with rice pudding, wrapped in coconut flakes.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Banana Garfield"
        description={
          <fbt desc="description of banana garfield dumpling">
            Dumpling filled with fried bananas and condensed milk, wrapped in vanilla cookie crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Lemon Figaro"
        description={
          <fbt desc="description of lemon figaro dumpling">
            Dumpling filled with lemon pudding, wrapped in lemon cookie crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
