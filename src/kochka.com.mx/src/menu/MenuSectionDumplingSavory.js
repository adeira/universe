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
        title={<fbt desc="sweet dumpling with pizza flavor">Pizza</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with chorizo/cheese flavor">Chorizo + cheese</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with hawaiano flavor">Hawaiano</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={<fbt desc="sweet dumpling with cochinita pibil flavor">Cochinita pibil</fbt>}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title={'TKTK'}
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
