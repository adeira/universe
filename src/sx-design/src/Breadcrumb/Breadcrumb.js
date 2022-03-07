// @flow

import fbt from 'fbt';
import Icon from '@adeira/icons';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

import BreadcrumbItem from './BreadcrumbItem';
import LayoutInline from '../Layout/LayoutInline';
import useSxDesignContext from '../useSxDesignContext';
import { SupportedDirections } from '../constants';

type Props = {
  +children:
    | RestrictedElement<typeof BreadcrumbItem>
    | $ReadOnlyArray<RestrictedElement<typeof BreadcrumbItem>>,
};

/**
 * A breadcrumb trail consists of a list of links to the parent pages of the current page in
 * hierarchical order. It helps users find their place within a website or web application.
 * Breadcrumbs are often placed horizontally before a page's main content.
 *
 * ## RTL support
 *
 * Item separators are flipped in RTL mode (arrows pointing from right to left)
 * See: https://rtlstyling.com/posts/rtl-styling#breadcrumbs
 */
export default function Breadcrumb(props: Props): Node {
  const { direction } = useSxDesignContext();

  let separator = null;
  const childrenCount = React.Children.count(props.children);
  return (
    <LayoutInline
      spacing="none"
      as="nav"
      aria-label={<fbt desc="breadcrumb">Breadcrumb</fbt>}
      alignItems="center"
    >
      {React.Children.map(props.children, (child, iterator) => {
        const newChild = (
          <>
            {separator}
            {React.cloneElement(child, {
              isLast: iterator + 1 === childrenCount,
            })}
          </>
        );
        separator = (
          <div
            className={styles({
              breadcrumbSeparator: true,
              rtl: direction === SupportedDirections.RTL,
            })}
          >
            <Icon name="chevron_right" />
          </div>
        );
        return newChild;
      })}
    </LayoutInline>
  );
}

Breadcrumb.Item = BreadcrumbItem;

const styles = sx.create({
  breadcrumbSeparator: {
    color: 'rgba(var(--sx-accent-7))',
  },
  rtl: {
    transform: 'rotate(180deg)',
  },
});
