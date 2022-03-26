// @flow

import React, { type Node } from 'react';
import fbt from 'fbt';
import { LayoutInline, Link, Note } from '@adeira/sx-design';

export default function OpenPositionAvailableNote(): Node {
  return (
    <>
      <Note tint="success">
        <fbt desc="position available description">
          This position is currently available. We are still working on a better application
          process, however, you can leave us your data in our &quot;Talent Pool&quot; in a meantime.
        </fbt>
      </Note>

      <LayoutInline>
        👉
        <Link href="https://forms.gle/JDKwgRiUK8yA7Bw5A" target="_blank">
          <fbt desc="apply in talent pool link text">
            Apply in <strong>Talent Pool</strong> on Google Forms
          </fbt>
        </Link>
        👈
      </LayoutInline>
    </>
  );
}
