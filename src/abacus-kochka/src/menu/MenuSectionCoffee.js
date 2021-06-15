// @flow

import React, { type Node } from 'react';
import { Money } from '@adeira/sx-design';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';

export default function MenuSectionCoffee(): Node {
  return (
    <>
      <MenuHeading>
        <fbt desc="coffee subtitle in our menu">Coffee drinks</fbt>
      </MenuHeading>

      <MenuRow
        // We call this "espresso" but technically, it's basically a double espresso pulled from
        // double portafilter. It's adjusted to the modern expectations and american market.
        title="Espresso"
        description={
          <fbt desc="description of a single espresso coffee">
            <fbt:param name="ground coffee grams">{'16'}</fbt:param>&nbsp;grams of ground,
            single-origin, arabica coffee from Coatepec (Veracruz) yielding approximately{' '}
            <fbt:param name="liquid coffee grams">{'35'}</fbt:param>&nbsp;grams of liquid espresso.
            Small, very intense, slightly acid drink - stir before drinking.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Americano"
        description={
          <fbt desc="description of americano coffee">
            Espresso topped with hot water resulting in approximately 250&nbsp;ml of hot beverage.
            Milder flavor than Espresso thanks to the water but with the same coffee content.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={250}
      />

      <MenuRow
        title="Long Black"
        description={
          <fbt desc="description of long black coffee">
            Espresso poured over hot water resulting in approximately 250&nbsp;ml of hot beverage.
            Very similar to Americano except it preserves more Espresso crema on top of the cup.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={250}
      />

      <MenuRow
        title="Cappuccino"
        description={
          <fbt desc="description of cappuccino coffee">
            Espresso with a foamed milk. The same amount of coffee as in Latte but with a little bit
            less milk resulting in a stronger coffee taste.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={350}
      />

      <MenuRow
        title="Latte"
        description={
          <fbt desc="description of latte coffee">
            Espresso with a lot of foamed milk. It contains the same amount of coffee as Cappucino
            but is topped with more milk resulting in a milder taste.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      {/*
      <MenuRow
        title="Iced Cappuccino"
        // $FlowFixMe[incompatible-type]: should be FBT (TODO)
        description={'TKTK'}
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={350}
      />
      */}

      <MenuRow
        title="Iced Latte"
        description={
          <fbt desc="description of iced latte">
            A cold beverage prepared with ice cubes, slightly foamed milk, homemade sweat syrup, and
            finished with an espresso on top.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        // TODO: volume
      />
    </>
  );
}
