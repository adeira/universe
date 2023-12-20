/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import Breadcrumb from '../Breadcrumb';
import { render, initFbt } from '../../test-utils';

// TODO: How to deal with this? (Internally using Icon which uses Suspense)
//  See: https://github.com/reactwg/react-18/discussions/102
let prevIsReactActEnvironment;
beforeAll(() => {
  prevIsReactActEnvironment = global.IS_REACT_ACT_ENVIRONMENT;
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

beforeEach(() => {
  initFbt();
});

afterAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = prevIsReactActEnvironment;
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

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Environment')).toBeInTheDocument();
  expect(getByText('Rural and countryside')).toBeInTheDocument();
  expect(getByText('Rural development and land management')).toBeInTheDocument();
  expect(getByText('Economic growth in rural areas')).toBeInTheDocument();
});
