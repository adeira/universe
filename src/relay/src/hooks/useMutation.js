// @flow

import { useState, useRef, useCallback, useEffect } from 'react';
import type { GraphQLTaggedNode, Disposable } from '@adeira/relay-runtime';

import useIsMountedRef from './useIsMountedRef';
import useRelayEnvironment from './useRelayEnvironment';
import { commitMutation, type MutationParameters } from '../mutations';
import type { DeclarativeMutationConfig, Uploadables } from '../types.flow';
import type { RecordSourceSelectorProxy } from '../runtimeTypes.flow';

type HookMutationConfig<T: MutationParameters> = {|
  // This config is essentially `MutationConfig` type except there are some small differences
  // to make the hook interface more friendly. Feel free to expand it as needed.
  +onCompleted: (response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) => void,
  +variables?: $ElementType<T, 'variables'>,
  +onError?: (error: Error) => void,
  +optimisticResponse?: $ElementType<T, 'rawResponse'>,
  +optimisticUpdater?: (store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: $ElementType<T, 'response'>) => void,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
  +uploadables?: Uploadables,
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
  const isMountedRef = useIsMountedRef();
  const environmentRef = useRef(environment);
  const mutationRef = useRef(mutation);
  const inFlightMutationsRef = useRef(new Set());
  const [isMutationInFlight, setMutationInFlight] = useState(false);

  const cleanup = useCallback(
    (disposable) => {
      if (environmentRef.current === environment && mutationRef.current === mutation) {
        inFlightMutationsRef.current.delete(disposable);
        if (isMountedRef.current) {
          setMutationInFlight(inFlightMutationsRef.current.size > 0);
        }
      }
    },
    [environment, isMountedRef, mutation],
  );

  useEffect(() => {
    if (environmentRef.current !== environment || mutationRef.current !== mutation) {
      inFlightMutationsRef.current = new Set();
      if (isMountedRef.current) {
        setMutationInFlight(false);
      }
      environmentRef.current = environment;
      mutationRef.current = mutation;
    }
  }, [environment, isMountedRef, mutation]);

  const commit = useCallback(
    (config) => {
      const disposable = commitMutation<T>(environment, {
        ...config,
        variables: config.variables ?? {},
        onCompleted: (response, errors) => {
          cleanup(disposable);
          if (config.onCompleted != null) {
            config.onCompleted(response, errors);
          }
        },
        onError: (error: Error) => {
          cleanup(disposable);
          if (config.onError != null) {
            config.onError(error);
          }
        },
        mutation,
      });
      inFlightMutationsRef.current.add(disposable);
      if (isMountedRef.current) {
        setMutationInFlight(true);
      }
      return disposable;
    },
    [cleanup, environment, isMountedRef, mutation],
  );

  return [commit, isMutationInFlight];
}
