/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import Breadcrumb from '../Breadcrumb';
import { render, initFbt } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders the breadcrumb without any issues', () => {
  const { getByText } = render(
    <Breadcrumb>
      <Breadcrumb.Item href="#">
        <fbt desc="home" doNotExtract={true}>
          Home
        </fbt>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">
        <fbt desc="environment" doNotExtract={true}>
          Environment
        </fbt>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Rural and countryside</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Rural development and land management</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Economic growth in rural areas</Breadcrumb.Item>
    </Breadcrumb>,
  );

  expect(getByText('Home')).toBeDefined();
  expect(getByText('Environment')).toBeDefined();
  expect(getByText('Rural and countryside')).toBeDefined();
  expect(getByText('Rural development and land management')).toBeDefined();
  expect(getByText('Economic growth in rural areas')).toBeDefined();
});
