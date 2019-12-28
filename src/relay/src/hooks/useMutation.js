// @flow

import { useState, useRef, useCallback, useEffect } from 'react';

import useRelayEnvironment from './useRelayEnvironment';
import { commitMutation, type MutationParameters } from '../mutations';
import type { DeclarativeMutationConfig, GraphQLTaggedNode } from '../types.flow';
import type { RecordSourceSelectorProxy } from '../runtimeTypes.flow';

opaque type SelectorData = $FlowFixMe;

type HookMutationConfig<T: MutationParameters> = {|
  // This config is essentially `MutationConfig` type except there are some small differences
  // to make the hook interface more friendly. Feel free to expand it as needed.
  +onCompleted: (response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) => void,
  +variables?: $ElementType<T, 'variables'>,
  +onError?: (error: Error) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
|};

/**
 * Usage:
 *
 * ```js
 * const AddCommentMutation = graphql`mutation { ... }`;
 * const [isCommentPending, addComment] = useMutation(AddCommentMutation);
 *
 * addComment({ variables: { ... } });
 * ```
 */
export default function useMutation<T: MutationParameters>(
  mutation: GraphQLTaggedNode,
): [boolean, (HookMutationConfig<T>) => void] {
  const environment = useRelayEnvironment();
  const [isPending, setPending] = useState(false);
  const requestRef = useRef(null);
  const mountedRef = useRef(false);
  const execute = useCallback(
    config => {
      if (requestRef.current != null) {
        return;
      }
      requestRef.current = commitMutation<T>(environment, {
        ...config,
        variables: config.variables ?? {},
        onCompleted: (response, errors) => {
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          if (config.onCompleted != null) {
            config.onCompleted(response, errors);
          }
        },
        onError: (error: Error) => {
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          if (config.onError != null) {
            config.onError(error);
          }
        },
        mutation,
      });
      setPending(true);
    },
    [mutation, environment],
  );
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return [isPending, execute];
}
