/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
/* $FlowFixMe[cannot-resolve-module] This comment suppresses an error when
 * merging two repositories. To see the error delete this comment and run Flow. */
import { Redirect } from '@docusaurus/router'; // eslint-disable-line import/no-unresolved

/* $FlowFixMe[signature-verification-failure] This comment suppresses an error when
 * merging two repositories. To see the error delete this comment and run Flow. */
export default function Home() {
  return <Redirect to="/til" />;
}
