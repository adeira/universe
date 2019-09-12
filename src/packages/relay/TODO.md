# TODO

_This mostly describes breaking changes._

- Property `dataFrom` on query renderer should be changed to `fetchPolicy` in next major version. This is how is this property called on master, see: https://github.com/facebook/relay/blob/master/packages/react-relay/ReactRelayQueryRenderer.js
- Remove official support for `relay-compiler` (in favor of `kiwicom-relay-compiler`). There is probably no way of removing it hardly but we should state somewhere we no longer support it and it can be broken in the future.
