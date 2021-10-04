/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import Badge from '../Badge';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders numeric Badge component without any problems', () => {
  const { getByText } = render(
    <Badge>
      <fbt desc="numeric badge title text" doNotExtract={true}>
        42
      </fbt>
    </Badge>,
  );
  expect(getByText('42')).toBeInTheDocument();
});

it('renders implicit default Badge component without any problems', () => {
  const { getByText } = render(
    <Badge>
      <fbt desc="implicit default badge title text" doNotExtract={true}>
        implicit default badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('implicit default badge title')).toBeInTheDocument();
});

it('renders explicit default Badge component without any problems', () => {
  const { getByText } = render(
    <Badge tint="default">
      <fbt desc="explicit default badge title text" doNotExtract={true}>
        explicit default badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('explicit default badge title')).toBeInTheDocument();
});

it('renders error Badge component without any problems', () => {
  const { getByText } = render(
    <Badge tint="error">
      <fbt desc="error badge title text" doNotExtract={true}>
        error badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('error badge title')).toBeInTheDocument();
});

it('renders success Badge component without any problems', () => {
  const { getByText } = render(
    <Badge tint="success">
      <fbt desc="success badge title text" doNotExtract={true}>
        success badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('success badge title')).toBeInTheDocument();
});

it('renders warning Badge component without any problems', () => {
  const { getByText } = render(
    <Badge tint="warning">
      <fbt desc="warning badge title text" doNotExtract={true}>
        warning badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('warning badge title')).toBeInTheDocument();
});
