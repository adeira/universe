// @flow

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  meta: {
    Flow: [
      'flow',
      'flow/new-spread-model',
      'flow/saved-state',
      'flow/unsealed-objects',
      'flow/configuration',
      'flow/debugging',
      {
        type: 'category',
        label: 'Patterns',
        items: [
          'flow/patterns/exhaustive-checking', //
          'flow/patterns/restricted-element',
        ],
      },
      'flow/shenanigans',
    ],
    Relay: ['relay', 'relay/match-module', 'relay/local-schema', 'relay/uploadables'],
    'Rest of programming': ['git', 'graphql', 'javascript', 'css'],
    Lifestyle: ['travel', 'travel/coworkings', 'travel/mexico', 'read/links'],
  },
};
