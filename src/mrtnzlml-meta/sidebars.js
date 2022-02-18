// @flow

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  meta: [
    {
      type: 'category',
      label: 'Flow',
      items: [
        { type: 'doc', id: 'flow' },
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
    { type: 'doc', id: 'rust' },
    { type: 'doc', id: 'git' },
    { type: 'doc', id: 'graphql' },
  ],
};
