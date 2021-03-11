// @flow

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ErrorBoundary from '../ErrorBoundary';
import SxDesignProvider from '../../SxDesignProvider';

const Throws = () => {
  throw new Error(`yadada`);
};

const sxContextRender = (ui, locale = 'en-US') => {
  return render(<SxDesignProvider locale={locale}>{ui}</SxDesignProvider>);
};

let windowLocationReload;
jest.mock('../windowLocationReload');
beforeEach(() => {
  windowLocationReload = require('../windowLocationReload').default;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('renders all the important parts as expected', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByText, queryByTestId } = sxContextRender(
    <ErrorBoundary>
      <Throws />
    </ErrorBoundary>,
  );

  expect(getByText('An unexpected error has occurred.')).toBeDefined();
  expect(queryByTestId('errorDev')).toBeDefined();
  expect(getByText('yadada')).toBeDefined();
  expect(getByText('Retry')).toBeDefined();

  expect(spy.mock.calls[0][0]).toMatch(/^Error: Uncaught \[Error: yadada]/);
  expect(spy.mock.calls[1][0]).toMatch(/^The above error occurred in the <Throws> component:/);
});

it('supports localization', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByText } = sxContextRender(
    <ErrorBoundary>
      <Throws />
    </ErrorBoundary>,
    'es-MX',
  );

  expect(getByText('Ha ocurrido un error inesperado.')).toBeDefined();
  expect(getByText('Reintentar')).toBeDefined();
});

it('does not render the error message in production', () => {
  const __PREV_DEV__ = __DEV__;
  __DEV__ = false; // eslint-disable-line no-global-assign
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByText, queryByTestId } = sxContextRender(
    <ErrorBoundary>
      <Throws />
    </ErrorBoundary>,
  );

  expect(getByText('An unexpected error has occurred.')).toBeDefined();
  expect(queryByTestId('errorDev')).toBeNull(); // <<<
  expect(getByText('Retry')).toBeDefined();

  expect(spy.mock.calls[0][0]).toMatch(/^Error: Uncaught \[Error: yadada]/);
  expect(spy.mock.calls[1][0]).toMatch(/^The above error occurred in the <Throws> component:/);
  __DEV__ = __PREV_DEV__; // eslint-disable-line no-global-assign
});

it('calls default onRetry callback as expected (window.location.reload)', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByText } = sxContextRender(
    <ErrorBoundary>
      <Throws />
    </ErrorBoundary>,
  );

  expect(windowLocationReload).not.toHaveBeenCalled();
  fireEvent.click(getByText('Retry'));
  expect(windowLocationReload).toHaveBeenCalledWith();
});

it('calls custom onRetry callback as expected', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const onRetryFn = jest.fn();

  const { getByText } = sxContextRender(
    <ErrorBoundary onRetry={onRetryFn}>
      <Throws />
    </ErrorBoundary>,
  );

  expect(onRetryFn).not.toHaveBeenCalled();
  fireEvent.click(getByText('Retry'));
  expect(onRetryFn).toHaveBeenCalledWith();
});
