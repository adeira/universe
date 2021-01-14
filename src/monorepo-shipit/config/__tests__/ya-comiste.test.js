// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'ya-comiste.js'), [
  // Backoffice
  ['src/ya-comiste-backoffice/pages/index.js', 'backoffice/pages/index.js'],
  ['src/ya-comiste-backoffice/package.json', 'backoffice/package.json'],

  // Meta
  ['src/ya-comiste-meta/README.md', 'meta/README.md'],
  ['src/ya-comiste-meta/schema.graphql', 'meta/schema.graphql'],

  // React Native
  ['src/ya-comiste-react-native/ios/Podfile', 'react-native/ios/Podfile'],
  [
    'src/ya-comiste-react-native/src/relay/QueryRenderer.js',
    'react-native/src/relay/QueryRenderer.js',
  ],
  ['src/ya-comiste-react-native/package.json', 'react-native/package.json'],

  // Rust
  ['src/ya-comiste-rust/arangodb/dump/ENCRYPTION', 'rust/arangodb/dump/ENCRYPTION'],
  ['src/ya-comiste-rust/crates/server/src/main.rs', 'rust/crates/server/src/main.rs'],
  ['src/ya-comiste-rust/Cargo.lock', 'rust/Cargo.lock'],
  ['src/ya-comiste-rust/Cargo.toml', 'rust/Cargo.toml'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/ya-comiste-backoffice/BUILD.bazel', undefined], // correctly deleted
  ['src/ya-comiste-backoffice/BUILD', undefined], // correctly deleted
  ['src/ya-comiste-backoffice/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/ya-comiste-backoffice/WORKSPACE', undefined], // correctly deleted
  ['src/ya-comiste-meta/BUILD.bazel', undefined], // correctly deleted
  ['src/ya-comiste-meta/BUILD', undefined], // correctly deleted
  ['src/ya-comiste-meta/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/ya-comiste-meta/WORKSPACE', undefined], // correctly deleted
  ['src/ya-comiste-react-native/BUILD.bazel', undefined], // correctly deleted
  ['src/ya-comiste-react-native/BUILD', undefined], // correctly deleted
  ['src/ya-comiste-react-native/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/ya-comiste-react-native/WORKSPACE', undefined], // correctly deleted
  ['src/ya-comiste-rust/BUILD.bazel', undefined], // correctly deleted
  ['src/ya-comiste-rust/BUILD', undefined], // correctly deleted
  ['src/ya-comiste-rust/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/ya-comiste-rust/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
