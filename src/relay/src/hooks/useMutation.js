// @flow

import { useState, useRef, useCallback } from 'react';

import useIsMountedRef from './useIsMountedRef';
import useRelayEnvironment from './useRelayEnvironment';
import { commitMutation, type MutationParameters } from '../mutations';
import type { DeclarativeMutationConfig, GraphQLTaggedNode, Disposable } from '../types.flow';
import type { RecordSourceSelectorProxy } from '../runtimeTypes.flow';

opaque type SelectorData = $FlowFixMe;

type HookMutationConfig<T: MutationParameters> = {|
  // This config is essentially `MutationConfig` type except there are some small differences
  // to make the hook interface more friendly. Feel free to expand it as needed.
  +onCompleted: (response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) => void,
  +variables?: $ElementType<T, 'variables'>,
  +onError?: (error: Error) => void,
  +optimisticResponse?: $ElementType<T, 'rawResponse'>,
  +optimisticUpdater?: (store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
|};

/**
 * Usage:
 *
 * ```ts
 * const AddCommentMutation = graphql`mutation { ... }`;
 * const [addComment, isCommentPending] = useMutation<MutationType>(AddCommentMutation);
 *
 * const disposable = addComment({ variables: { ... } });
 * ```
 */
export default function useMutation<T: MutationParameters>(
  mutation: GraphQLTaggedNode,
): [(HookMutationConfig<T>) => Disposable, boolean] {
  const environment = useRelayEnvironment();
  const [isPending, setPending] = useState(false);
  const requestRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const commit = useCallback(
    config => {
      if (requestRef.current != null) {
        return {
          dispose: () => {
            return undefined;
          },
        };
      }
      const relayDisposable = commitMutation<T>(environment, {
        ...config,
        variables: config.variables ?? {},
        onCompleted: (response, errors) => {
          if (!isMountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          if (config.onCompleted != null) {
            config.onCompleted(response, errors);
          }
        },
        onError: (error: Error) => {
          if (!isMountedRef.current) {
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
      requestRef.current = relayDisposable;
      return {
        dispose: () => {
          relayDisposable.dispose();
          requestRef.current = null;
          setPending(false);
        },
      };
    },
    [environment, mutation, isMountedRef],
  );
  return [commit, isPending];
}
