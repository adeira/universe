// @flow

import { renderHook } from '@testing-library/react-hooks';

import useRelayEnvironment from '../useRelayEnvironment';

it('throws the correct message', () => {
  const { result } = renderHook(useRelayEnvironment);
  expect(() => result.current).toThrowErrorMatchingSnapshot();
});
