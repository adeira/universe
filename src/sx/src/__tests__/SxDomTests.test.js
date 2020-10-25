// @flow

import * as React from 'react';
import { render, screen } from '@testing-library/react';

import * as sx from '../../index';
import { normalizeColor } from '../colorNormalizer';
import collector from '../StyleCollector';

afterEach(() => {
  collector.reset();
});

const styles = sx.create({
  red: { color: 'red' },
  blue: { color: 'blue' },
  pseudo: {
    'color': 'green',
    ':hover': {
      color: 'pink',
      textDecoration: 'underline',
    },
    ':focus': {
      color: 'purple',
    },
    '::after': {
      content: '🤓',
    },
  },
});

it('applies correct styles', () => {
  render(
    <>
      {sx.renderPageWithSX(jest.fn()).styles}
      <div className={styles('red')}>red</div>
      <div className={styles('blue')}>blue</div>
      <div className={styles('red', 'blue')}>mix red blue</div>
      <div className={styles('blue', 'red')}>mix blue red</div>
      <div className={styles('pseudo', 'red')}>pseudo red</div>
    </>,
  );

  const red = screen.getByText('red');
  expect(red).toHaveStyle(`color:${normalizeColor('red')}`);

  const blue = screen.getByText('blue');
  expect(blue).toHaveStyle(`color:${normalizeColor('blue')}`);

  const mixRedBlue = screen.getByText('mix red blue');
  expect(mixRedBlue).toHaveStyle(`color:${normalizeColor('blue')}`);

  const mixBlueRed = screen.getByText('mix blue red');
  expect(mixBlueRed).toHaveStyle(`color:${normalizeColor('red')}`);

  const pseudoRed = screen.getByText('pseudo red');
  expect(pseudoRed).toHaveStyle(`color:${normalizeColor('red')}`); // red wins (non-hover)
});

it('includes reset', () => {
  render(
    <div data-test="container">
      {sx.renderPageWithSX(jest.fn(), { includeReset: true }).styles}
    </div>,
  );

  // eslint-disable-next-line no-undef
  expect(document.querySelector('[data-adeira-sx="true"]')).toMatchInlineSnapshot(`
    <style
      data-adeira-sx="true"
    >
      
    body {
      box-sizing: border-box;
    }
    *,
    *::after,
    *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }

      
    </style>
  `);
});
