// @flow

import React, { type Node } from 'react';
import { Money } from '@adeira/sx-design';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';

export default function MenuSectionDumplingSavory(): Node {
  return (
    <>
      <MenuHeading>
        <fbt desc="savory dumplings subtitle in our menu">Savory Dumplings</fbt>
      </MenuHeading>

      <MenuRow
        title="Camarón Silvestre"
        description={
          <fbt desc="description of camarón silvestre dumpling">
            Dumpling filled with shrimps, chipotle sauce and topped with oatmeal crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Pizza Félix"
        description={
          <fbt desc="description of pizza félix dumpling">
            Dumpling filled with parmesano cheese, ham and tomato sauce. It’s topped with sesame
            seeds.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Hawaiiana Marie"
        description={
          <fbt desc="description of hawaiiana marie dumpling">
            Dumpling filled with machego cheese, pineapple and ham. It’s topped with sesame seeds.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Choriqueso Demóstenes"
        description={
          <fbt desc="description of choriqueso demóstenes dumpling">
            Dumpling filled with Mexican sausage and Oaxaca cheese. It’s topped with oatmeal crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Tom y Jerry al pastor"
        description={
          <fbt desc="description of tom y jerry al pastro dumpling">
            Dumpling filled with al pastor meat and machego cheese. It’s topped with amaranth.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="El gato con botas"
        description={
          <fbt desc="description of el gato con botas dumpling">
            Dumpling filled with cochinita pibil (pork pulled meat) and topped with pumpkin seeds.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
