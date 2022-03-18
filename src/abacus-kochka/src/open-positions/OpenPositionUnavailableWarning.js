// @flow

import React, { type Node } from 'react';
import fbt from 'fbt';
import { Link, Note } from '@adeira/sx-design';

export default function OpenPositionUnavailableWarning(): Node {
  return (
    <Note tint="warning">
      <fbt desc="position unavailable description">
        This position is currently unavailable. However, you can leave us your data in our
        &quot;Talent Pool&quot; so we can contact you later:{' '}
        <Link href="https://forms.gle/JDKwgRiUK8yA7Bw5A" target="_blank">
          Open Talent Pool on Google Forms
        </Link>
      </fbt>
    </Note>
  );
}
