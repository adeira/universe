/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';

import ErrorBoundary from '../ErrorBoundary';
import { render, userEvent } from '../../test-utils';

const Throws = () => {
  throw new Error(`yadada`);
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

  const { getByText, getByTestId } = render(
    // eslint-disable-next-line no-console
    <ErrorBoundary onComponentDidCatch={console.error}>
      <Throws />
    </ErrorBoundary>,
  );

  expect(getByText('An unexpected error has occurred.')).toBeInTheDocument();
  expect(getByTestId('errorDev')).toBeInTheDocument();
  expect(getByText('yadada')).toBeInTheDocument();
  expect(getByText('Retry')).toBeInTheDocument();

  expect(spy.mock.calls[0][0].toString()).toMatch(/^Error: Uncaught \[Error: yadada]/);
});

it('supports localization', () => {
  const { getByText } = render(
    <ErrorBoundary onComponentDidCatch={jest.fn()}>
      <Throws />
    </ErrorBoundary>,
    { locale: 'es-MX' },
  );

  expect(getByText('Ha ocurrido un error inesperado.')).toBeInTheDocument();
  expect(getByText('Reintentar')).toBeInTheDocument();
});

it('does not render the error message in production', () => {
  const __PREV_DEV__ = __DEV__;
  __DEV__ = false; // eslint-disable-line no-global-assign
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { getByText, queryByTestId } = render(
    // eslint-disable-next-line no-console
    <ErrorBoundary onComponentDidCatch={console.error}>
      <Throws />
    </ErrorBoundary>,
  );

  expect(getByText('An unexpected error has occurred.')).toBeInTheDocument();
  expect(queryByTestId('errorDev')).not.toBeInTheDocument(); // <<<
  expect(getByText('Retry')).toBeInTheDocument();

  expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
    /^Error: Uncaught \[Error: yadada]/,
    `
    {
      "_suppressLogging": true,
    }
  `,
  );
  __DEV__ = __PREV_DEV__; // eslint-disable-line no-global-assign
});

it('calls default onRetry callback as expected (window.location.reload)', async () => {
  const { getByText } = render(
    <ErrorBoundary onComponentDidCatch={jest.fn()}>
      <Throws />
    </ErrorBoundary>,
  );

  expect(windowLocationReload).not.toHaveBeenCalled();
  await userEvent.click(getByText('Retry'));
  expect(windowLocationReload).toHaveBeenCalledWith();
});

it('calls custom onRetry callback as expected', async () => {
  /* $FlowFixMe[underconstrained-implicit-instantiation] This comment
   * suppresses an error when upgrading Flow to version 0.204.1. To see the
   * error delete this comment and run Flow. */
  const onRetryFn = jest.fn();

  const { getByText } = render(
    <ErrorBoundary onRetry={onRetryFn} onComponentDidCatch={jest.fn()}>
      <Throws />
    </ErrorBoundary>,
  );

  expect(onRetryFn).not.toHaveBeenCalled();
  await userEvent.click(getByText('Retry'));
  expect(onRetryFn).toHaveBeenCalledWith();
});
