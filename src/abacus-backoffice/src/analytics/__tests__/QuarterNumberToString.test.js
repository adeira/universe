/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import QuarterNumberToString from '../QuarterNumberToString';
import { customRender, customRenderWithoutErrorBoundary } from '../../forms/private/testUtils';

it('works as expected for Q1', () => {
  const { getByText } = customRender(<QuarterNumberToString quarterNumber={1} />);
  expect(getByText('January, February and March')).toBeInTheDocument();
});

it('works as expected for Q2', () => {
  const { getByText } = customRender(<QuarterNumberToString quarterNumber={2} />);
  expect(getByText('April, May and June')).toBeInTheDocument();
});

it('works as expected for Q3', () => {
  const { getByText } = customRender(<QuarterNumberToString quarterNumber={3} />);
  expect(getByText('July, August and September')).toBeInTheDocument();
});

it('works as expected for Q4', () => {
  const { getByText } = customRender(<QuarterNumberToString quarterNumber={4} />);
  expect(getByText('October, November and December')).toBeInTheDocument();
});

it('throws as expected for Q>4', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() =>
    customRenderWithoutErrorBoundary(<QuarterNumberToString quarterNumber={5} />),
  ).toThrowErrorMatchingInlineSnapshot(`"Unexpected quarter number: 5"`);
  consoleSpy.mockRestore();
});

it('throws as expected for Q<1', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() =>
    customRenderWithoutErrorBoundary(<QuarterNumberToString quarterNumber={0} />),
  ).toThrowErrorMatchingInlineSnapshot(`"Unexpected quarter number: 0"`);
  consoleSpy.mockRestore();
});
