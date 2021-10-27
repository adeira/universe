// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

export default function GlobalAnnouncement(): Node {
  return (
    <div className={styles('announcement')}>
      <fbt desc="opening soon announcement">
        Opening soon! Follow our social media for the announcement.
      </fbt>
    </div>
  );
}

const styles = sx.create({
  announcement: {
    backgroundColor: 'rgba(var(--sx-success-light))',
    padding: 'var(--sx-spacing-small)',
    textAlign: 'center',
  },
});
