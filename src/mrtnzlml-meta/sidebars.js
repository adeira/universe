// @flow

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  programming: [
    {
      type: 'category',
      label: 'Flow & TypeScript',
      items: [
        { type: 'doc', id: 'flow' },
        { type: 'doc', id: 'flow/new-spread-model' },
        { type: 'doc', id: 'flow/saved-state' },
        { type: 'doc', id: 'flow/unsealed-objects' },
        { type: 'doc', id: 'flow/configuration' },
        { type: 'doc', id: 'flow/debugging' },
        {
          type: 'category',
          label: 'Patterns',
          items: [
            'flow/patterns/exhaustive-checking', //
            'flow/patterns/restricted-element',
          ],
        },
        { type: 'doc', id: 'flow/shenanigans' },
      ],
    },
    {
      type: 'category',
      label: 'Relay',
      items: [
        { type: 'doc', id: 'relay' },
        { type: 'doc', id: 'relay/directives' },
        { type: 'doc', id: 'relay/local-schema' },
        { type: 'doc', id: 'relay/match-module' },
        { type: 'doc', id: 'relay/uploadables' },
      ],
    },
    {
      type: 'category',
      label: 'Rust',
      items: [
        { type: 'doc', id: 'rust' },
        { type: 'doc', id: 'rust/modules' },
        { type: 'doc', id: 'rust/best-crates' },
      ],
    },
    { type: 'doc', id: 'accessibility' },
    { type: 'doc', id: 'css' },
    { type: 'doc', id: 'git' },
    { type: 'doc', id: 'graphql' },
    { type: 'doc', id: 'javascript' },
  ],
  investing: [{ type: 'doc', id: 'investing/101' }],
  archive: [
    { type: 'doc', id: 'archive/flow' },
    { type: 'doc', id: 'archive/relay' },
    { type: 'doc', id: 'archive/typescript' },
  ],
};
