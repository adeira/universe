// @flow

/* global document */

import React, { useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { graphql } from 'relay-runtime';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { nullthrows } from '@adeira/js';

import useMutation from '../useMutation';
import RelayEnvironmentProvider from '../../RelayEnvironmentProvider';

let container: null | HTMLDivElement = null;
beforeEach(() => {
  container = document.createElement('div');
  nullthrows(document.body).appendChild(container);
});

afterEach(() => {
  if (container !== null) {
    unmountComponentAtNode(container);
    container.remove();
  }
  container = null;
});

type Props = {|
  +onCompleted: () => void,
  +onError: () => void,
|};

const TestComponent = (props: Props) => {
  const [addComment, isCommentPending] = useMutation(
    graphql`
      mutation useMutationTestMutation @relay_test_operation {
        __typename
      }
    `,
  );
  useEffect(() => {
    addComment(props);
  });
  return <div>{JSON.stringify(isCommentPending)}</div>;
};

it('calls the mutation as expected', () => {
  const onCompleted = jest.fn();
  const onError = jest.fn();

  const EnvironmentMock = createMockEnvironment();
  EnvironmentMock.mock.queueOperationResolver(operation => {
    return MockPayloadGenerator.generate(operation);
  });

  act(() => {
    render(
      <RelayEnvironmentProvider environment={EnvironmentMock}>
        <TestComponent onCompleted={onCompleted} onError={onError} />
      </RelayEnvironmentProvider>,
      nullthrows(container),
    );
  });

  expect(onError).not.toBeCalled();
  expect(onCompleted).toBeCalledWith({ __typename: 'Mutation' }, null);
});

it('handles partial errors gracefully', () => {
  const onCompleted = jest.fn();
  const onError = jest.fn();

  const EnvironmentMock = createMockEnvironment();
  EnvironmentMock.mock.queueOperationResolver(operation => {
    const response = MockPayloadGenerator.generate(operation);
    response.errors = [{ message: 'aaa' }, { message: 'bbb' }];
    return response;
  });

  act(() => {
    render(
      <RelayEnvironmentProvider environment={EnvironmentMock}>
        <TestComponent onCompleted={onCompleted} onError={onError} />
      </RelayEnvironmentProvider>,
      nullthrows(container),
    );
  });

  expect(onError).not.toBeCalled();
  expect(onCompleted).toBeCalledWith({ __typename: 'Mutation' }, [
    { message: 'aaa' },
    { message: 'bbb' },
  ]);
});

it('handles error states gracefully', () => {
  const onCompleted = jest.fn();
  const onError = jest.fn();

  const EnvironmentMock = createMockEnvironment();
  EnvironmentMock.mock.queueOperationResolver(() => {
    return new Error('ups');
  });

  act(() => {
    render(
      <RelayEnvironmentProvider environment={EnvironmentMock}>
        <TestComponent onCompleted={onCompleted} onError={onError} />
      </RelayEnvironmentProvider>,
      nullthrows(container),
    );
  });

  expect(onCompleted).not.toBeCalled();
  expect(onError).toBeCalledWith(new Error('ups'));
});
