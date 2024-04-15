// @flow

import React, { type ElementConfig, type Node } from 'react';
import fbt from 'fbt';

import ErrorBoundary from './ErrorBoundary';
import { initFbt } from '../test-utils';

export default {
  component: ErrorBoundary,
  title: 'Components/ErrorBoundary',
  tags: ['autodocs'],
};

const Throws = ({ short }: { +short: boolean }) => {
  if (short === true) {
    throw new Error('short error message');
  }

  throw new Error(`This message is visible only during development.

Component suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
};

const Template = (args: Partial<ElementConfig<typeof ErrorBoundary>>) => (
  <ErrorBoundary onComponentDidCatch={() => {}} {...args}>
    <Throws short={false} />
  </ErrorBoundary>
);

const ShortTemplate = (args: Partial<ElementConfig<typeof ErrorBoundary>>) => (
  <ErrorBoundary onComponentDidCatch={() => {}} {...args}>
    <Throws short={true} />
  </ErrorBoundary>
);

initFbt();

export const DefaultDEV = {
  render: (): Node => (
    <Template
      onRetry={() => window.location.reload()}
      showErrorMessage={true} // in reality, we use `__DEV__` by default
    />
  ),
};

export const DefaultPROD = {
  render: (): Node => (
    <Template
      onRetry={() => window.location.reload()}
      showErrorMessage={false} // in reality, we use `__DEV__` by default
    />
  ),
};

export const CustomTitle = {
  render: (): Node => (
    <Template
      title={
        <fbt desc="error boundary title" doNotExtract={true}>
          My awesome custom title.
        </fbt>
      }
    />
  ),
};

export const CustomCode = {
  render: (): Node => <Template code="🙈" />,
};

export const ShortErrorMessage = {
  render: (): Node => <ShortTemplate />,
};
