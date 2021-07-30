// @flow

import { Badge, LayoutBlock, LayoutInline, Loader, Text, Tooltip } from '@adeira/sx-design';
import React, { type ChildrenArray, type Element, type Node } from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import LayoutHeadingButton from './LayoutHeadingButton';
import LayoutHeadingLink from './LayoutHeadingLink';
import StatusBar from './StatusBar';

type Props = {
  +heading: Fbt,
  +children: Node,
  +isBeta?: boolean,
  +description?: Fbt,
  +actionButtons?: ChildrenArray<
    RestrictedElement<typeof LayoutHeadingLink> | Element<typeof LayoutHeadingButton>,
  >,
};

export default function LayoutPage(props: Props): Node {
  const { description } = props;

  return (
    <LayoutBlock>
      <StatusBar />

      <LayoutInline>
        <Text as="h1" size={48}>
          {props.heading}
        </Text>

        {props.isBeta ? (
          <div className={styles('badge')}>
            <Tooltip
              title={
                <fbt desc="work in progress badge description">
                  This section is currently under active development. Are you missing some features?
                  Let us know!
                </fbt>
              }
            >
              <Badge tint="success">
                <fbt desc="beta label">BETA</fbt>
              </Badge>
            </Tooltip>
          </div>
        ) : null}
      </LayoutInline>

      {description != null ? (
        <span className={styles('description')}>
          <Text as="small" size={14}>
            {description}
          </Text>
        </span>
      ) : null}

      <LayoutInline>{props.actionButtons ?? null}</LayoutInline>

      <div className={styles('main')}>
        <React.Suspense fallback={<Loader />}>{props.children}</React.Suspense>
      </div>
    </LayoutBlock>
  );
}

const styles = sx.create({
  badge: {
    alignSelf: 'center',
  },
  description: {
    color: 'rgba(var(--sx-accent-5))',
  },
  main: {
    marginBlockStart: '1rem',
  },
});
