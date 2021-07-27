// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type TabValue = string | number | null;
type Props = {
  +tabs: $ReadOnlyArray<{ +title: Fbt, +value: TabValue }>,
  +selected: TabValue,
  +setSelected: (TabValue) => void,
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
    'fontWeight': 'bold',
    'paddingInline': 20,
    'paddingBlock': 15,
    'cursor': 'pointer',
    'color': 'rgba(var(--sx-accent-6))',
    'borderBlockEnd': '1px solid rgba(var(--sx-accent-2))',
    ':hover': {
      color: 'rgba(var(--sx-foreground))',
      borderBlockEnd: '2px solid rgba(var(--sx-accent-2))',
    },
  },
  tabSelected: {
    'color': 'rgba(var(--sx-foreground))',
    'borderBlockEnd': '2px solid rgba(var(--sx-foreground))',
    ':hover': {
      borderBlockEnd: '2px solid rgba(var(--sx-foreground))',
    },
  },
});
