// @flow strict-local

import * as React from 'react';
import fbt from 'fbt';

export default function Navigation(): React.Node {
  return (
    <ul>
      <li>
        <a href="/">
          <fbt desc="navigation link to homepage">Homepage</fbt>
        </a>
      </li>
      <li>
        <a href="/rules">
          <fbt desc="navigation link to rules">Our rules</fbt>
        </a>
      </li>
    </ul>
  );
}
