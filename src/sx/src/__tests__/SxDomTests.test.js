/**
 * @flow
 * @jest-environment jsdom
 */

/* global document */

import { normalizeColor } from '@adeira/css-colors';
import { render, screen } from '@testing-library/react';
import prettier from 'prettier';

import sx from '../../index';
import collector from '../StyleCollector';

afterEach(() => {
  collector.reset();
});

it('applies correct styles', () => {
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
        content: '"🤓"',
      },
    },
  });

  render(
    <>
      {sx.getStyleTag()}
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

it('correctly handles shorthand properties specificity', () => {
  const styles = sx.create({
    primary: { marginTop: '10px' },
    button: { margin: 0 },
  });

  expect(styles('primary')).toMatchInlineSnapshot(`"_3sgLnu"`);
  expect(styles('button')).toMatchInlineSnapshot(`"_4pgUgJ _37wPvZ _32zari _3DMcik"`);
  expect(styles('primary', 'button')).toBe(styles('button'));
  expect(styles('button', 'primary')).toMatchInlineSnapshot(`"_3sgLnu _37wPvZ _32zari _3DMcik"`);

  render(
    <>
      {sx.getStyleTag()}
      <div className={styles('button', 'primary')}>test 1</div>
      <div className={styles('primary', 'button')}>test 2</div>
    </>,
  );

  expect(
    prettier.format(document.querySelector('[data-adeira-sx="true"]')?.innerHTML, {
      filepath: 'test.css',
    }),
  ).toMatchInlineSnapshot(`
    "._3sgLnu {
      margin-top: 10px;
    }
    ._4pgUgJ {
      margin-top: 0px;
    }
    ._37wPvZ {
      margin-right: 0px;
    }
    ._32zari {
      margin-bottom: 0px;
    }
    ._3DMcik {
      margin-left: 0px;
    }
    "
  `);

  const test1 = screen.getByText('test 1');
  expect(test1).not.toHaveStyle(`margin:0`);
  expect(test1).toHaveStyle(`margin-top:10px`);

  const test2 = screen.getByText('test 2');
  expect(test2).not.toHaveStyle(`margin-top:10px`);
  expect(test2).toHaveStyle(`margin-top:0`);
});

it('handles background:none specificity correctly', () => {
  const styles = sx.create({
    bgBlue: {
      background: 'blue',
    },
    bgNone: {
      background: 'none',
    },
  });

  render(
    <>
      {sx.getStyleTag()}
      <div className={styles('bgBlue', 'bgNone')}>test_1</div>
      <div className={styles('bgNone', 'bgBlue')}>test_2</div>
    </>,
  );

  expect(
    prettier.format(document.querySelector('[data-adeira-sx="true"]')?.innerHTML, {
      filepath: 'test.css',
    }),
  ).toMatchInlineSnapshot(`
    "._2rGYXd {
      background-image: none;
    }
    .vSqk6 {
      background-position: 0% 0%;
    }
    ._1m2K58 {
      background-size: auto auto;
    }
    ._2RyIOg {
      background-repeat: repeat;
    }
    ._87W4L {
      background-origin: padding-box;
    }
    ._3IDiTj {
      background-clip: border-box;
    }
    ._376SiR {
      background-attachment: scroll;
    }
    ._30SC3G {
      background-color: #00f;
    }
    ._15yiKT {
      background-color: transparent;
    }
    "
  `);

  const test1 = screen.getByText('test_1');
  expect(test1).toHaveStyle(`background-color:${normalizeColor('transparent')}`);

  const test2 = screen.getByText('test_2');
  expect(test2).toHaveStyle(`background-color:${normalizeColor('blue')}`);
});

it('works with keyframes', () => {
  const animation = sx.keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const styles = sx.create({
    myClass: {
      animationName: animation,
      animationDuration: '2s',
    },
  });

  const { container } = render(
    <>
      {sx.getStyleTag()}
      <div className={styles('myClass')}>test_1</div>
    </>,
  );
  expect(container.querySelector('[data-adeira-sx]')).toMatchInlineSnapshot(`
    <style
      data-adeira-sx="true"
    >
      .P4y5l{animation-name:_2rMlJa}.HDQox{animation-duration:2s}@keyframes _2rMlJa {from {opacity:0;}to {opacity:1;}}
    </style>
  `);
});
