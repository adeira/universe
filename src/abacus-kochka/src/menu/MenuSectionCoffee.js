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
        title="Espresso"
        description={
          <fbt desc="description of a single espresso coffee">
            <fbt:param name="ground coffee grams">{'16'}</fbt:param>&nbsp;grams of ground,
            single-origin, arabica coffee from Coatepec (Veracruz) yielding approximately{' '}
            <fbt:param name="liquid coffee grams">{'35'}</fbt:param>&nbsp;grams of liquid espresso.
            Small, very intense, slightly acid drink - stir before drinking.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Americano"
        description={
          <fbt desc="description of americano coffee">
            Espresso topped with hot water resulting in approximately 250&nbsp;ml of beverage.
            Milder flavor than espresso thanks to the water but with the same coffee content.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Long Black"
        description={
          <fbt desc="description of long black coffee">
            Espresso poured over hot water resulting in approximately 250&nbsp;ml of beverage. Very
            similar to americano except it preserves more espresso crema on top of the cup.
          </fbt>
        }
        price={<Money priceUnitAmount={40} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Cappuccino"
        description={
          <fbt desc="description of cappuccino coffee">
            Espresso with a foamed milk. The same amount of coffee as in latte but with a little bit
            less milk resulting in a stronger coffee taste.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Latte"
        description={
          <fbt desc="description of latte coffee">
            Espresso with a lot of foamed milk. It contains the same amount of coffee as cappuccino
            but is topped with more milk resulting in a milder taste.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Mocha"
        description={
          <fbt desc="description of mocha coffee">
            Mocha is a variant of latte but with addition of our artisanal chocolate. This creates a
            sweeter chocolatey taste.
          </fbt>
        }
        price={<Money priceUnitAmount={55} priceUnitAmountCurrency={'MXN'} />}
      />

      <MenuRow
        title="Iced Latte"
        description={
          <fbt desc="description of iced latte">
            A cold beverage prepared with ice cubes, slightly foamed milk, homemade sweet syrup, and
            finished with an espresso on top.
          </fbt>
        }
        price={<Money priceUnitAmount={55} priceUnitAmountCurrency={'MXN'} />}
      />
    </>
  );
}
