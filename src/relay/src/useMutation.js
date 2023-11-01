// @flow

import { useMutation as _useMutation } from 'react-relay';
import type {
  DeclarativeMutationConfig,
  Disposable,
  Mutation,
  PayloadError,
  UploadableMap,
  Variables,
} from 'relay-runtime';

type HookMutationConfig<TVariables, TData, TRawResponse> = {
  // This config is essentially `MutationConfig` type except there are some small differences
  // to make the hook interface more friendly. Feel free to expand it as needed.
  +onCompleted: (response: TData, errors: ?$ReadOnlyArray<PayloadError>) => void,
  +variables?: TVariables,
  +onError?: (error: Error) => void,
  +onUnsubscribe?: ?() => void,
  +optimisticResponse?: TRawResponse,
  // +optimisticUpdater?: (store: RecordSourceSelectorProxy) => void,
  // +updater?: ?(store: RecordSourceSelectorProxy, data: ?T['response']) => void,
  +configs?: Array<DeclarativeMutationConfig>,
  +uploadables?: UploadableMap,
};

/**
 * Usage:
 *
 * ```js
 * const AddCommentMutation = graphql`mutation { ... }`;
 * const [addComment, isCommentPending] = useMutation<MutationType>(AddCommentMutation);
 *
 * const disposable = addComment({ variables: { ... } });
 * ```
 */
export default function useMutation<TVariables: Variables, TData, TRawResponse = { ... }>(
  mutation: Mutation<TVariables, TData, TRawResponse>,
): [(HookMutationConfig<TVariables, TData, TRawResponse>) => Disposable, boolean] {
  const [commit, isMutationInFlight] = _useMutation(mutation);

  // this makes the commit more friendly in terms of DX
  const modifiedCommit = (config: HookMutationConfig<TVariables, TData, TRawResponse>) => {
    const emptyVariables = (({}: any): TVariables); // TODO: how to do this properly?
    return commit({
      ...config,
      variables: config.variables ?? emptyVariables,
    });
  };

  return [modifiedCommit, isMutationInFlight];
}
