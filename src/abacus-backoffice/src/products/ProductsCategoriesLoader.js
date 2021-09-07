// @flow

import { LayoutInline, Skeleton, Tabs } from '@adeira/sx-design';
import React, { type Node } from 'react';

/**
 * This component exists just to show the Skeleton component instead of a simple Loader when loading
 * product categories in the inventory/POS.
 */
export default function ProductsCategoriesLoader(): Node {
  return (
    <LayoutInline>
      <Skeleton>
        <Tabs tabs={[{ title: 'Mock tab AAA', value: 'a' }]} selected="a" setSelected={() => {}} />
      </Skeleton>
      <Skeleton>
        <Tabs tabs={[{ title: 'Mock tab BBB', value: 'b' }]} selected="b" setSelected={() => {}} />
      </Skeleton>
      <Skeleton>
        <Tabs tabs={[{ title: 'Mock tab CCC', value: 'c' }]} selected="c" setSelected={() => {}} />
      </Skeleton>
    </LayoutInline>
  );
}
