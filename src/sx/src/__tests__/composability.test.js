// @flow

/* global document */

import prettier from 'prettier';
import { render } from '@testing-library/react';

import sx from '../../index';
import collector from '../StyleCollector';

afterEach(() => {
  collector.reset();
});

it('allows styles to be composed with external styles', () => {
  const styles = sx.create({ default: { fontSize: 16 } });
  const externalStyles = sx.create({ custom: { fontSize: 20 } });

  expect(sx(styles.default, externalStyles.custom)).toBe(externalStyles('custom'));
  expect(sx(externalStyles.custom, styles.default)).toBe(styles('default'));
});

it('correctly resolves multiple styles', () => {
  const styles = sx.create({ default: { fontSize: 16 } });
  const externalStyles = sx.create({ custom: { color: 'red', fontSize: 20 } });

  render(<div>{sx.renderPageWithSX(jest.fn()).styles}</div>);
  expect(
    prettier.format(document.querySelector('[data-adeira-sx="true"]')?.innerHTML, {
      filepath: 'test.css',
    }),
  ).toMatchInlineSnapshot(`
    "._39Fbhf {
      font-size: 16px;
    }
    ._324Crd {
      color: #f00;
    }
    ._4xrWBp {
      font-size: 20px;
    }
    "
  `);

  expect(sx(styles.default, externalStyles.custom)).toMatchInlineSnapshot(`"_4xrWBp _324Crd"`);
  expect(sx(externalStyles.custom, styles.default)).toMatchInlineSnapshot(`"_324Crd _39Fbhf"`);
});

it('merges more complex styles correctly', () => {
  const styles = sx.create({
    default: {
      'fontSize': 16,
      '@media print': {
        fontSize: 12,
      },
    },
  });
  const externalStyles = sx.create({
    custom: {
      'fontSize': 20,
      '@media print': {
        fontSize: 15,
      },
    },
  });

  render(<div>{sx.renderPageWithSX(jest.fn()).styles}</div>);
  expect(
    prettier.format(document.querySelector('[data-adeira-sx="true"]')?.innerHTML, {
      filepath: 'test.css',
    }),
  ).toMatchInlineSnapshot(`
    "._39Fbhf {
      font-size: 16px;
    }
    @media print {
      .vovX4.vovX4 {
        font-size: 12px;
      }
      ._4j9tl4._4j9tl4 {
        font-size: 15px;
      }
    }
    ._4xrWBp {
      font-size: 20px;
    }
    "
  `);

  expect(sx(styles.default, externalStyles.custom)).toMatchInlineSnapshot(`"_4xrWBp _4j9tl4"`);
  expect(sx(externalStyles.custom, styles.default)).toMatchInlineSnapshot(`"_39Fbhf vovX4"`);
});

it('handles nullable second argument gracefully', () => {
  // This is convenient when the overwriting styles are optional.
  const styles = sx.create({ default: { fontSize: 16 } });
  expect(sx(styles.default, null)).toBe(styles('default'));
  expect(sx(styles.default, undefined)).toBe(styles('default'));
});
