// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
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

      <div className={styles('milkshakesGrid')}>
        <MenuRow
          title={<fbt desc="strawberry milkshake name">Strawberry milkshake</fbt>}
          description={
            <fbt desc="description of strawbery milkshake">
              Perfect mix of fresh strawberries, vanilla ice-cream and whole milk topped with
              whipped cream.
            </fbt>
          }
          price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
          // TODO: volume
        />

        <MenuRow
          title={<fbt desc="chocolate milkshake name">Chocolate milkshake</fbt>}
          // $FlowFixMe[incompatible-type]: should be FBT (TODO)
          description={'TKTK'}
          price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
          // TODO: volume
        />

        <MenuRow
          title={<fbt desc="vanilla milkshake name">Vanilla milkshake</fbt>}
          // $FlowFixMe[incompatible-type]: should be FBT (TODO)
          description={'TKTK'}
          price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
          // TODO: volume
        />

        <MenuRow
          title={<fbt desc="banana milkshake name">Banana milkshake</fbt>}
          // $FlowFixMe[incompatible-type]: should be FBT (TODO)
          description={'TKTK'}
          price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
          // TODO: volume
        />
      </div>
    </>
  );
}

const styles = sx.create({
  milkshakesGrid: {
    margin: '0 auto',
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(2, [start] minmax(300px, 450px) [end])',
  },
});
