// @flow

import React, { type Node } from 'react';
import { Money } from '@adeira/sx-design';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';

export default function MenuSectionMilkshake(): Node {
  return (
    <>
      <MenuHeading>
        <fbt desc="milkshakes subtitle in our menu">Milkshakes</fbt>
      </MenuHeading>

      <MenuRow
        title={<fbt desc="banana milkshake name">Banana milkshake</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      {/* TODO: other milkshakes */}
    </>
  );
}
