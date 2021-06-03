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
        title={<fbt desc="sweet dumpling with lemon pie flavor">Lemon pie</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with oreo flavor">Oreo</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with rice with milk flavor">Rice with milk</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with strawberry/coconut flavor">Strawberry + coconut</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with apple/cinnamon milk flavor">Apple + cinnamon</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
