// @flow

import Icon from '@adeira/icons';
import { Entity, EntityField, LinkButton } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import LayoutPage from '../LayoutPage';

export default function POSAllSessionsPageLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="all POS sessions page title">All POS Sessions</fbt>}
      description={
        <fbt desc="all POS sessions page description">
          Here you can find all active POS sessions.
        </fbt>
      }
    >
      <Entity>
        <EntityField description={<fbt desc="POS in Mexico City">Mexico City</fbt>} />
        <EntityField
          description={
            <LinkButton href="/pos/session" target="_blank" suffix={<Icon name="external" />}>
              <fbt desc="navigation link to point of sales">Open POS session</fbt>
            </LinkButton>
          }
        />
      </Entity>
    </LayoutPage>
  );
}
