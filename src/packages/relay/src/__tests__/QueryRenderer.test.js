// @flow

import * as React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { createMockEnvironment, generateAndCompile, MockPayloadGenerator } from 'relay-test-utils';

import { FetchTimeoutError, FetchResponseError } from '../index';
import QueryRenderer from '../QueryRenderer';

let environment;
let query;
let variables;
let onResponse;

beforeEach(() => {
  environment = createMockEnvironment();
  query = generateAndCompile(`
    query TestQuery @relay_test_operation {
      node(id: "my-id") {
        id
      }
    }
  `).TestQuery;
  variables = {};
  onResponse = function onResponse(props) {
    return <div data-testid="success">Nice one! {props.node.id}</div>;
  };
});

it('renders default components for loading and success', () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  const testInstance = testRenderer.root;

  expect(environment.mock.isLoading(query, variables)).toBe(true);
  const loading = testInstance.findByProps({ 'data-testid': 'loading' });
  expect(loading).toBeDefined();

  environment.mock.resolveMostRecentOperation(operation => {
    return MockPayloadGenerator.generate(operation);
  });
  expect(environment.mock.isLoading(query, variables)).toBe(false);
  expect(testInstance.findAllByProps({ 'data-testid': 'loading' })).toHaveLength(0);
  const success = testInstance.findByProps({ 'data-testid': 'success' });
  expect(success).toBeDefined();
  expect(success.children).toEqual(expect.arrayContaining(['Nice one! ', '<Node-mock-id-1>']));
});

it('renders default components for loading and generic fail', () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  const testInstance = testRenderer.root;

  expect(environment.mock.isLoading(query, variables)).toBe(true);
  const loading = testInstance.findByProps({ 'data-testid': 'loading' });
  expect(loading).toBeDefined();

  environment.mock.rejectMostRecentOperation(new Error('fail'));
  expect(environment.mock.isLoading(query, variables)).toBe(false);
  expect(testInstance.findAllByProps({ 'data-testid': 'loading' })).toHaveLength(0);
  const error = testInstance.findByProps({ 'data-testid': 'error' });
  expect(error).toBeDefined();
  expect(error.children[0]).toBe('Error!');
});

it('renders default component for response error', () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  environment.mock.rejectMostRecentOperation(
    // $FlowExpectedError: incomplete Response object for testing purposes only
    new FetchResponseError({ status: 500, statusText: 'fail' }),
  );
  const error = testRenderer.root.findByProps({ 'data-testid': 'error' });
  expect(error).toBeDefined();
  expect(error.children[0]).toBe('Unsuccessful response! (500 - fail)');
});

it('renders default component for fail with timeout', () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  environment.mock.rejectMostRecentOperation(new FetchTimeoutError('fail'));
  const error = testRenderer.root.findByProps({ 'data-testid': 'error' });
  expect(error).toBeDefined();
  expect(error.children[0]).toBe('Timeout error!');
});

it('renders custom error component', () => {
  function onSystemError() {
    return <div data-testid="custom-error">Custom system error render.</div>;
  }
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
      onSystemError={onSystemError}
    />,
  );
  environment.mock.rejectMostRecentOperation(new Error('fail'));
  const error = testRenderer.root.findByProps({
    'data-testid': 'custom-error',
  });
  expect(error).toBeDefined();
  expect(error.children).toEqual(['Custom system error render.']);
});
