// @flow

import { Badge, LayoutBlock, LayoutInline, Loader, Text, Tooltip } from '@adeira/sx-design';
import { NextSeo } from 'next-seo';
import React, { type ChildrenArray, type Element, type Node } from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import LayoutHeadingButton from './LayoutHeadingButton';
import LayoutHeadingLink from './LayoutHeadingLink';

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
    <>
      <NextSeo title={props.heading} />
      <LayoutBlock>
        <LayoutInline>
          <span className={styles('heading')}>
            <Text as="h1">{props.heading}</Text>
          </span>

          {props.isBeta ? (
            <div className={styles('badge')}>
              <Tooltip
                title={
                  <fbt desc="work in progress badge description">
                    This section is currently under active development. Are you missing some
                    features? Something is broken? Let us know!
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
            <Text as="small">{description}</Text>
          </span>
        ) : null}

        <LayoutInline>{props.actionButtons ?? null}</LayoutInline>

        <div className={styles('main')}>
          <React.Suspense fallback={<Loader />}>{props.children}</React.Suspense>
        </div>
      </LayoutBlock>
    </>
  );
}

const styles = sx.create({
  heading: {
    color: 'rgba(var(--sx-foreground))',
  },
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
