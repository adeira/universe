/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';

import Meter from '../Meter';
import { render } from '../../test-utils';

it('renders without any issues (no props)', () => {
  expect(render(<Meter />)).toBeTruthy();
});

it('renders without any issues (ALL props)', () => {
  expect(render(<Meter min={1} max={2} value={3} low={4} high={5} optimum={6} />)).toBeTruthy();
});

describe('validations', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('allows "min" smaller than "max"', () => {
    expect(render(<Meter min={1} max={2} />)).toBeTruthy();
  });

  it('disallows "min" to equal "max"', () => {
    expect(() => render(<Meter min={1} max={1} />)).toThrowErrorMatchingInlineSnapshot(
      `"Minimum value must be less than maximum value."`,
    );
  });

  it('disallows "min" higher than "max"', () => {
    expect(() => render(<Meter min={2} max={1} />)).toThrowErrorMatchingInlineSnapshot(
      `"Minimum value must be less than maximum value."`,
    );
  });
});
