// @flow

import { useMutation as _useMutation } from 'react-relay';
import type {
  GraphQLTaggedNode,
  Disposable,
  PayloadError,
  UploadableMap,
  RecordSourceSelectorProxy,
  DeclarativeMutationConfig,
} from 'relay-runtime';

import type { Variables } from './types.flow';

export type MutationParameters = {
  +response: { +[key: string]: any, ... },
  +variables: Variables,
  +rawResponse?: { ... },
};

type HookMutationConfig<T: MutationParameters> = {
  // This config is essentially `MutationConfig` type except there are some small differences
  // to make the hook interface more friendly. Feel free to expand it as needed.
  +onCompleted: (
    response: $ElementType<T, 'response'>,
    errors: ?$ReadOnlyArray<PayloadError>,
  ) => void,
  +variables?: $ElementType<T, 'variables'>,
  +onError?: (error: Error) => void,
  +onUnsubscribe?: ?() => void,
  +optimisticResponse?: $ElementType<T, 'rawResponse'>,
  +optimisticUpdater?: (store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: $ElementType<T, 'response'>) => void,
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
export default function useMutation<T: MutationParameters>(
  mutation: GraphQLTaggedNode,
): [(HookMutationConfig<T>) => Disposable, boolean] {
  const [commit, isMutationInFlight] = _useMutation(mutation);

  // this makes the commit more friendly in terms of DX
  const modifiedCommit = (config) => {
    return commit({
      ...config,
      variables: config.variables ?? {},
    });
  };

  return [modifiedCommit, isMutationInFlight];
}
