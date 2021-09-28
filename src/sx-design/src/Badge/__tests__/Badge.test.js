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

it('renders default Badge component without any problems', () => {
  const { getByText } = render(
    <Badge>
      <fbt desc="default badge title text" doNotExtract={true}>
        default badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('default badge title')).toBeDefined();
});

it('renders error Badge component without any problems', () => {
  const { getByText } = render(
    <Badge>
      <fbt desc="error badge title text" doNotExtract={true}>
        error badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('error badge title')).toBeDefined();
});

it('renders success Badge component without any problems', () => {
  const { getByText } = render(
    <Badge>
      <fbt desc="success badge title text" doNotExtract={true}>
        success badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('success badge title')).toBeDefined();
});

it('renders warning Badge component without any problems', () => {
  const { getByText } = render(
    <Badge>
      <fbt desc="warning badge title text" doNotExtract={true}>
        warning badge title
      </fbt>
    </Badge>,
  );
  expect(getByText('warning badge title')).toBeDefined();
});
