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
            Dumpling filled with shrimps and chipotle sauce, wrapped in oatmeal crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Pizza Félix"
        description={
          <fbt desc="description of pizza félix dumpling">
            Dumpling filled with parmesano cheese, ham and tomato sauce, wrapped in sesame seeds.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Hawaiiana Marie"
        description={
          <fbt desc="description of hawaiiana marie dumpling">
            Dumpling filled with machego cheese, pineapple and ham, wrapped in sesame seeds.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Choriqueso Demóstenes"
        description={
          <fbt desc="description of choriqueso demóstenes dumpling">
            Dumpling filled with Mexican sausage (chorizo) and Oaxaca cheese, wrapped in oatmeal
            crumbs.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Tom y Jerry al pastor"
        description={
          <fbt desc="description of tom y jerry al pastro dumpling">
            Dumpling filled with al pastor meat and machego cheese, wrapped in amaranth.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Bodoque pibil"
        description={
          <fbt desc="description of bodoque pibil dumpling">
            Dumpling filled with cochinita pibil (pulled pork meat), wrapped in pumpkin seeds.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
