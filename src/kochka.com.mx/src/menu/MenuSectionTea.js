// @flow

import React, { type Node } from 'react';
import { Money, Temperature } from '@adeira/sx-design';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';

export default function MenuSectionTea(): Node {
  return (
    <>
      <MenuHeading>
        <fbt desc="organic tea subtitle in our menu">Organic tea blends</fbt>
      </MenuHeading>

      <MenuRow
        // Tomas.mx Tea code: 211 - https://tomas.mx/pages/tipo-de-te
        title="Menta Amajagh"
        description={
          <fbt desc="description of a green tea with mint flavor">
            Gunpowder green tea with intense mint flavor brewed at{' '}
            <fbt:param name="temperature">
              <Temperature degreesCelsius={80} />
            </fbt:param>{' '}
            for 2&nbsp;minutes. Low on caffeine, hydrating and good for reducing stress.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      <MenuRow
        // Tomas.mx Tea code: 220 - https://tomas.mx/pages/tipo-de-te
        title="Jasmine Mo Li Hua"
        description={
          <fbt desc="description of a green tea with jasmine">
            Green tea from a chinese province Fujian brewed at{' '}
            <fbt:param name="temperature">
              <Temperature degreesCelsius={80} />
            </fbt:param>{' '}
            for 2&nbsp;minutes. Low on caffeine with soothing aroma of jasmine. Good for digestion.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      <MenuRow
        // Tomas.mx Tea code: 680 - https://tomas.mx/pages/tipo-de-te
        title="Bespoke Pu-erh Chai"
        description={
          <fbt desc="description of a bespoke pu-erh chai tea">
            Pu-erh from province Yunnan with cinnamon and orange peel notes brewed at{' '}
            <fbt:param name="temperature">
              <Temperature degreesCelsius={90} />
            </fbt:param>{' '}
            for 5&nbsp;minutes. High in caffeine.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      <MenuRow
        // Tomas.mx Tea code: 810 - https://tomas.mx/pages/tipo-de-te
        title="Jarabe Tapatío"
        description={
          <fbt desc="description of a jarabe tapatío tea">
            Rooibos with notes of lemongrass, apple, cinnamon and black pepper brewed at{' '}
            <fbt:param name="temperature">
              <Temperature degreesCelsius={100} />
            </fbt:param>{' '}
            for 5&nbsp;minutes. Without caffeine, good for memory and physical performance.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      <MenuRow
        // Tomas.mx Tea code: 930 - https://tomas.mx/pages/tipo-de-te
        title="Bésame Mucho"
        description={
          <fbt desc="description of a bésame mucho tea">
            Tisana with a flavor of red fruits and hints of hibiscus flower brewed at{' '}
            <fbt:param name="temperature">
              <Temperature degreesCelsius={100} />
            </fbt:param>{' '}
            for 5&nbsp;minutes. No caffeine, anti-inflammatory, good for memory.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />

      <MenuRow
        // Tomas.mx Tea code: 992 - https://tomas.mx/pages/tipo-de-te
        title="Maison de Cannelle"
        description={
          <fbt desc="description of a maison de cannelle tea">
            Tisana with a baked dessert flavor with almonds and cinnamon notes brewed at{' '}
            <fbt:param name="temperature">
              <Temperature degreesCelsius={100} />
            </fbt:param>{' '}
            for 7&nbsp;minutes. No caffeine, good for your intellect and heart.
          </fbt>
        }
        price={<Money priceUnitAmount={50} priceUnitAmountCurrency={'MXN'} />}
        volume={450}
      />
    </>
  );
}
