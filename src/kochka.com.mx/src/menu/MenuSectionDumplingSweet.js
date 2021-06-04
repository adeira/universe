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
            Dumpling filled with Oreo, Hershey’s and topped with Oreo crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Manzana Azrael"
        description={
          <fbt desc="description of manzana azrael dumpling">
            Dumpling filled with apples, cinnamon and topped with bread crumbs and cinnamon.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Fresa Hello Kitty"
        description={
          <fbt desc="description of fresa hello kitty dumpling">
            Dumpling filled with strawberries and condensed milk and topped with strawberry cookies
            crumbs.{' '}
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Arroz Snowball"
        description={
          <fbt desc="description of arroz snowball dumpling">
            Dumpling filled with rice pudding and topped with coconut.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Banana Garfield"
        description={
          <fbt desc="description of banana garfield dumpling">
            Dumpling filled with fried bananas and condensed milk and topped with vanilla cookies
            crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Lemon Doraemon"
        description={
          <fbt desc="description of lemon doraemon dumpling">
            Dumpling filled with lemon pudding and topped with lemon cookies crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
