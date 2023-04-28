/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Redirect } from '@docusaurus/router';

export default function Home() {
  return <Redirect to="/til" />;
}
