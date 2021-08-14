# Unreleased

# 3.3.0

- Added support for GraphQL errors with `CRICITAL` severity: you can mark any error to be critical by adding this value to `errors[*].extensions.severity`. Such errors will be propagated to any available `ErrorBoundary` when using `useLazyLoadQuery` or to `onError` callback when calling a mutation.
- Removed forgotten dependency `relay-compiler-experimental` (followup after 3.2.4)
- Bump commander from from 7.2.0 to 8.0.0
- Export type `PreloadedQuery` that is handy when using [`usePreloadedQuery`](https://relay.dev/docs/api-reference/use-preloaded-query/) hook for example.

# 3.2.4

- Removed experimental bin `adeira-relay-compiler-experimental` because it was causing issues when installing `@adeira/relay` via NPM (see https://github.com/adeira/universe/issues/2328). If you want to use the new Relay Rust Compiler please install it directly via `relay-compiler-experimental` (https://www.npmjs.com/package/relay-compiler-experimental).

# 3.2.3

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

- Relay dependencies upgraded to version 11.0.2, see: https://github.com/facebook/relay/releases/tag/v11.0.2
- experimental Relay Rust compiler upgraded to the latest `master` version

# 3.2.2

- Added experimental bin `adeira-relay-compiler-experimental` which directly calls official `relay-compiler-experimental` bin. This new Relay compiler written in Rust is unstable (as the name suggests) but eventually will be the default. For now, you can start experimenting with it and report any issues to [`facebook/relay`](https://github.com/facebook/relay) repo.

# 3.2.1

- Relay dependencies upgraded to version 11.0.1, see: https://github.com/facebook/relay/releases/tag/v11.0.1

# 3.2.0

This minor release is focused on cleaning old internal code and removing some legacy parts of the library. The goal is to have a clean and stable version before eventually removing the container API (and keeping only hooks API). But don't worry yet - we follow [upcoming Relay releases](https://github.com/facebook/relay/issues/3371).

- removed required `X-Client` HTTP header from `createNetworkFetcher` (you can still use it but it's no longer mandatory)
- relax signature verification when using `adeira-relay-compiler` - it no longer requires the signature but still verifies it if it exists
- script `adeira-fetch-schema` now reads schema path from `relay.config.js` file (it still supports `--filename` for backward compatibility but that will be eventually removed)
- removed dependency on `@adeira/logger`

# 3.1.1

- fixes a Flow issue when using `@refetchable` (`useRefetchableFragment` hook), see: https://github.com/adeira/universe/issues/1975

# 3.1.0

This release introduces Relay Hooks in a backward compatible fashion. Next major version of `@adeira/relay` will focus on phasing out legacy parts of Relay Modern (containers API), so it's highly encouraged to upgrade as soon as possible, see: [https://github.com/facebook/relay/issues/3371](https://github.com/facebook/relay/issues/3371)

- Relay dependencies upgraded to version `11.0.0`, see: https://github.com/facebook/relay/releases/tag/v11.0.0
- Additional Relay hooks were exposed: `useEntryPointLoader`, `useFragment`, `useLazyLoadQuery`, `usePaginationFragment`, `usePreloadedQuery`, `useQueryLoader`, `useRefetchableFragment`, `useSubscribeToInvalidationState` and `useSubscription` (+ some other hooks specific functions)
- Packages `@adeira/relay-runtime` and `@adeira/relay-utils` merged to this package. Everything should work without any extra changes (except for updating the exports). Please, let us know in case we missed something.

For more information about Relay Hooks evolution please visit the following links:

- https://github.com/facebook/relay/releases/tag/v11.0.0
- https://relay.dev/blog/2021/03/09/introducing-relay-hooks/
- https://relay.dev/docs/ _(new)_
- https://github.com/facebook/relay/issues/3371

# 3.0.1

- `adeira-fetch-schema` script fixed

# 3.0.0

- Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588
- Use `RelayLazyLogger` instead of `RelayEagerLogger` by default.

# 2.2.0

- Upgraded Relay to version 10.1.0, see: https://github.com/facebook/relay/releases/tag/v10.1.0
- Change to use the new [JSX transforms](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

# 2.1.0

- Added new Flow utils `FragmentContainerType`, `RefetchContainerType` and `PaginationContainerType` which will help you to migrate to the new `types-first` Flow architecture (https://medium.com/flow-type/types-first-a-scalable-new-architecture-for-flow-3d8c7ba1d4eb). Example:

  ```js
  import { createFragmentContainer, graphql, type FragmentContainerType } from '@adeira/relay';

  // ...

  export default (createFragmentContainer(Location, {
    location: graphql`
      fragment Location_location on Location {
        name
        country
      }
    `,
  }): FragmentContainerType<Props>);
  ```

# 2.0.2

- Upgrade relay to 10.0.1

# 2.0.1

- Remove `handlerProvider` from `createEnvironment`, leaving the default from `react-relay` to be used if the consumer doesn't add one.

# 2.0.0

- Upgrade relay to 10.0.0

# 1.3.2

- `QueryRenderer` types defined as generic

# 1.3.1

- Replace `readInline` function with `react-relay` implementation.

# 1.3.0

- Upgrade relay packages to 9.1.0

# 1.2.0

- Remove record proxy type
- Import record proxy type from `@adeira/relay-runtime`

# 1.1.3

- Upgrade `babel-plugin-relay` dependency

# 1.1.0

- Export `useMutation` from index.js

# 1.0.0

- Relay upgraded to the latest version 7.0.0 (see: https://github.com/facebook/relay/releases/tag/v7.0.0)
- Old Relay logger has been replaced with new event-based logger.
- Removed all custom Relay Compiler validations.
- Improve `RefetchOptions` type

# 0.4.7.0

- Improved flow type coverage of Relay store.
- Compiler: added `include` and `exclude` arg options.

# 0.4.6.0

- Fixed Flow types for `createFragmentContainer`, `createPaginationContainer` and `createRefetchContainer`. This may yield many new errors especially if you didn't type your React components correctly. But don't worry, the upgrade can be very simple and automated - contact us directly. :)
- Compiler: added support for experimental FS persist mode (see Relay Example project).

# 0.4.5.0

- Function `commitMutation` is now defined with generic Flow type. You can now use types generated by Relay compiler: `commitMutation<NamedMutation>(...)`.
- New experimental function `commitMutationAsync` added - this function is the same like `commitMutation` except it returns Promise.

# 0.4.4.0

- Burst cache timeout changed to 2 seconds.

# 0.4.3.0

- Added invariant check for correct container factories usages.
- Added support for `readInlineData` (should be combined with `@inline`, see: https://relay.dev/docs/en/graphql-in-relay.html#inline).
- Export `DeclarativeMutationConfig` Flow type.

# 0.4.2.0

- Expose new experimental `RelayEnvironmentProvider` component and `useRelayEnvironment` hook.

# 0.4.1.0

- Added typed `fetchQuery` to the public interface (see: https://relay.dev/docs/en/fetch-query)

# 0.4.0.0

- **Breaking**: Relay upgraded to the latest version 6.0.0 (see: https://github.com/facebook/relay/releases/tag/v6.0.0). We also added Flow interface for the new `LocalQueryRenderer` (with new `createLocalEnvironment`) but please remember that this interface is currently experimental and doesn't have the same capabilities like our `QueryRenderer`. The interface is not finished yet and it may change in the future.
- **Breaking**: Direct usage of `relay-compiler` is no longer officially supported. Use `kiwicom-relay-compiler` instead.

# 0.3.6.0

- Enable `--watch` mode in our experimental Relay compiler.
- Enable `--validate` mode in our experimental Relay compiler. This mode returns code `101` in case of outdated generated files.
- Relay compiler now outputs ES6 modules.
- Added support for official Relay package `relay-config` which allows you to centralize Relay configuration in files like `relay.config.js`. Example:

```js
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './src',
  schema: './data/schema.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
```

# 0.3.5.0

- Experimental Relay compiler now shows warnings when you access deprecated field in your application code.
- Script `kiwicom-fetch-schema` now signs the generated files and sorts fields lexicographically.
- Experimental Relay compiler now verifies the signature generated by `kiwicom-fetch-schema`.

# 0.3.4.0

- This version contains upgraded dependencies and more accurate Flow types.

# 0.3.3.0

- New QueryRenderer property `dataFrom` with values `STORE_THEN_NETWORK` and `NETWORK_ONLY` (more info here: https://relay.dev/docs/en/next/query-renderer#props).
- Many internal updates mostly targeting OSS development experience.

# 0.3.2.0

- New bin script `kiwicom-fetch-schema` available. This little script helps you with the download of your remote schema. Please, read README file to see how to use it.

# 0.3.1.0

- Flow types of some object types are now more accurate
- Reverted breaking change enforcing correct Environment usage from version 3.0.0

# 0.3.0.0

- _(reverted in 0.3.1.0)_ Breaking: functions `commitMutation`, `requestSubscription` and `commitLocalUpdate` now require correct usage of Relay environment which is being passed down from props. Example of how to properly use mutations:

```js
import {
  type RelayProp, // or `PaginationRelayProp` or `RefetchRelayProp` types
} from '@adeira/relay';

type Props = {| +relay: RelayProp |};

function Component(props: Props) {
  useEffect(() => {
    commitMutation(
      props.relay.environment, // <<< this Environment is not being imported but rather reused from `props.relay`
      { mutation: graphql` ... ` },
    );
  });
}
```

- Relay updated to version 5.0, see: https://github.com/facebook/relay/releases/tag/v5.0.0
- This release also contains new _experimental_ Relay Compiler with support for persistent queries. This is currently undocumented feature and you should not use it. Expect breaking changes without any announcements.

# 0.2.3.0

- You can now pass custom GraphiQL Printer into Relay environment factory. There is a default printer enabled for https://graphql.kiwi.com/ - you can just click on the GraphiQL link in your dev console and it will open current query with variables so you can debug it easily.

# 0.2.2.0

- Experimental Flow support for operation loader (needed for `@match` and `@module`).

# 0.2.1.0

- Babel Relay preset is now part of this package. Removed from `@adeira/babel-preset-adeira` in version 3.0.0. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  plugins: ['relay'],
};
```

# 0.2.0.0

- Upgraded to Relay version 4.0.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0). Our previous versions 1.x disallowed some deprecated usages of Relay so this upgrade should be relatively straightforward. Check new testing tools in this release - especially `MockPayloadGenerator` and `RelayMockEnvironment`. There is also an improved support for `@match`/`@module` directives (available from `@adeira/relay` version 1.0) which works well with `@adeira/babel-preset-adeira` from version 3.0. Please give it a try and give us your feedback.

# 0.1.2.0

- Network fetcher now accepts optional `refetchConfig` to be able to adjust `fetchTimeout` and `retryDelays` (see for more details: https://github.com/kiwicom/fetch)

# 0.1.1.0

- `Disposable` Flow type exposed publicly
- `Environment` (incomplete) Flow type exposed publicly
