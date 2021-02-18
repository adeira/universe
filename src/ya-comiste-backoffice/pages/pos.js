// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { graphql, QueryRenderer } from '@adeira/relay';
import { ProductCard, Skeleton } from '@adeira/sx-design';
import { rangeMap } from '@adeira/js';

import Link from '../src/Link';
import useSelectedItemsApi from '../src/pos/recoil/selectedItemsState';

export default function POSSessionPage(): React.Node {
  const { select, selectedItems, stats } = useSelectedItemsApi();

  const handleDemoItemClick = (itemID) => {
    select({
      itemID,
      itemUnitAmount: 100_00, // TODO
    });
  };

  return (
    <div className={styles('mainGrid')}>
      <div className={styles('left')}>
        <div>
          TODO (selected products, +- buttons, payment)
          <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
        </div>
        <div>
          <pre>{JSON.stringify(stats, null, 2)}</pre>
        </div>
        <Link href="/pos/checkout">Checkout</Link>
      </div>
      <main className={styles('right')}>
        <div>TODO (POS screen with all products)</div>

        <button type="button" onClick={() => handleDemoItemClick(1)}>
          Demo item 1
        </button>
        <button type="button" onClick={() => handleDemoItemClick(2)}>
          Demo item 2
        </button>
        <button type="button" onClick={() => handleDemoItemClick(3)}>
          Demo item 3
        </button>

        <QueryRenderer
          query={graphql`
            query posQuery {
              pos {
                listPublishedProducts {
                  id
                  name
                  price {
                    unitAmount
                    unitAmountCurrency
                  }
                }
              }
            }
          `}
          onLoading={() => rangeMap(12, (i) => <Skeleton key={i} />)}
          onResponse={({ pos: { listPublishedProducts: products } }) =>
            products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                priceUnitAmount={product.price.unitAmount}
                priceUnitAmountCurrency={product.price.unitAmountCurrency}
                imgBlurhash="LEHV6nWB2yk8pyoJadR*.7kCMdnj" // TODO
              />
            ))
          }
        />
        <Link href="/">Close POS view</Link>
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1rem',
  },
  left: {
    backgroundColor: 'white',
    height: '100vh',
    padding: 5,
  },
  right: {
    backgroundColor: '#efefef',
    padding: 5,
  },
});
