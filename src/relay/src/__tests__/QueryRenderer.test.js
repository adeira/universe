// @flow

import ReactTestRenderer from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

import QueryRenderer from '../QueryRenderer';
import { FetchTimeoutError, FetchResponseError, graphql } from '../index';
import type { QueryRendererTestQuery$data } from './__generated__/QueryRendererTestQuery.graphql';

let environment;
let query;
let variables;
let onResponse;

beforeEach(() => {
  environment = createMockEnvironment();
  query = graphql`
    query QueryRendererTestQuery @relay_test_operation {
      node(id: "my-id") {
        id
      }
    }
  `;
  variables = {};
  onResponse = function onResponse(props: QueryRendererTestQuery$data) {
    return <div data-testid="success">Nice one! {props.node?.id}</div>;
  };
});

it('renders default components for loading and success', async () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  const testInstance = testRenderer.root;
  const environmentMock = environment.mock;

  const generatedQuery = environmentMock.getMostRecentOperation();
  expect(environmentMock.isLoading(generatedQuery, variables)).toBe(true);
  const loading = await testInstance.findByProps({ 'data-testid': 'loading' });
  expect(loading).toBeDefined();

  environmentMock.resolveMostRecentOperation((operation) => {
    return MockPayloadGenerator.generate(operation);
  });
  expect(environmentMock.isLoading(generatedQuery, variables)).toBe(false);
  expect(testInstance.findAllByProps({ 'data-testid': 'loading' })).toHaveLength(0);
  const success = await testInstance.findByProps({ 'data-testid': 'success' });
  expect(success).toBeDefined();
  expect(success.children).toEqual(expect.arrayContaining(['Nice one! ', '<Node-mock-id-1>']));
});

it('renders default components for loading and generic fail', async () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  const testInstance = testRenderer.root;
  const environmentMock = environment.mock;

  const generatedQuery = environmentMock.getMostRecentOperation();
  expect(environmentMock.isLoading(generatedQuery, variables)).toBe(true);
  const loading = await testInstance.findByProps({ 'data-testid': 'loading' });
  expect(loading).toBeDefined();

  environmentMock.rejectMostRecentOperation(new Error('fail'));
  expect(environmentMock.isLoading(generatedQuery, variables)).toBe(false);
  expect(testInstance.findAllByProps({ 'data-testid': 'loading' })).toHaveLength(0);
  const error = await testInstance.findByProps({ 'data-testid': 'error' });
  expect(error).toBeDefined();
  expect(error.children[0]).toBe('Error!');
});

it('renders default component for response error', async () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  environment.mock.rejectMostRecentOperation(
    /* $FlowFixMe[invalid-constructor] This comment suppresses an error when
     * upgrading Flow to version 0.176.0. To see the error delete this comment
     * and run Flow. */
    new FetchResponseError({ status: 500, statusText: 'fail' }),
  );
  const error = await testRenderer.root.findByProps({ 'data-testid': 'error' });
  expect(error).toBeDefined();
  expect(error.children[0]).toBe('Unsuccessful response! (500 - fail)');
});

it('renders default component for fail with timeout', async () => {
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
    />,
  );
  /* $FlowFixMe[invalid-constructor] This comment suppresses an error when
   * upgrading Flow to version 0.176.0. To see the error delete this comment
   * and run Flow. */
  environment.mock.rejectMostRecentOperation(new FetchTimeoutError('fail'));
  const error = await testRenderer.root.findByProps({ 'data-testid': 'error' });
  expect(error).toBeDefined();
  expect(error.children[0]).toBe('Timeout error!');
});

it('renders custom error component', async () => {
  function onSystemError() {
    return <div data-testid="custom-error">Custom system error render.</div>;
  }
  const testRenderer = ReactTestRenderer.create(
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      onResponse={onResponse}
      onSystemError={onSystemError} // eslint-disable-line react/jsx-no-bind
    />,
  );
  environment.mock.rejectMostRecentOperation(new Error('fail'));
  const error = await testRenderer.root.findByProps({
    'data-testid': 'custom-error',
  });
  expect(error).toBeDefined();
  expect(error.children).toEqual(['Custom system error render.']);
});
