// @flow

import * as React from 'react';
import { Blurhash as ReactBlurhash } from 'react-blurhash';

export default function Blurhash(): React.Node {
  return (
    <ReactBlurhash
      width={250}
      height={250}
      hash="LGF5]+Yk^6#M@-5c,1J5@[or[Q6." // TODO: from props
    />
  );
}
