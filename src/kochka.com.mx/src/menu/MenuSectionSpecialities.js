// @flow

import React, { type Node } from 'react';
import { Money } from '@adeira/sx-design';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';

export default function MenuSectionSpecialities(): Node {
  return (
    <>
      <MenuHeading>
        <fbt desc="specialities subtitle in our menu">Specialities</fbt>
      </MenuHeading>

      <MenuRow
        // Tomas.mx Tea code: 205 - https://tomas.mx/pages/tipo-de-te
        title="Matcha Latte"
        description={
          <fbt desc="description of matcha latte">
            Finely grounded matcha green tea powder infused in a hot water topped with a lot of
            foamed milk similar to traditional Latte. It has less caffeine than coffee but more than
            green tea.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      <MenuRow
        title={<fbt desc="artisanal chocolate name">Artisanal Chocolate</fbt>}
        description={
          <fbt desc="description of artisanal chocolate">
            Sweat drink prepared from crushed cocoa beans from Tabasco topped with slightly foamed
            hot milk or hot water.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        // TODO: volume
      />
    </>
  );
}
