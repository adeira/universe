// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +tabs: $ReadOnlyArray<{ +title: Fbt, +value: string }>,
  +selected: string,
  +setSelected: (string) => void,
};

export default function Tabs(props: Props): Node {
  return (
    <div className={styles('tabs')}>
      {props.tabs.map((tab) => {
        return (
          <div
            key={tab.value}
            className={styles({
              tab: true,
              tabSelected: props.selected === tab.value,
            })}
            onClick={() => {
              props.setSelected(tab.value);
            }}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
}

const styles = sx.create({
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tab: {
    paddingInline: 20,
    paddingBlock: 15,
    cursor: 'pointer',
    color: 'rgba(var(--sx-foreground))',
    borderBlockEnd: '1px solid rgba(var(--sx-accent-2))',
  },
  tabSelected: {
    borderBlockEnd: '2px solid rgba(var(--sx-foreground))',
  },
});
