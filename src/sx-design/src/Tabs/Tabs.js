// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import Text from '../Text/Text';

type TabValue = string | number | null;
type Props = {
  +tabs: $ReadOnlyArray<{ +title: Fbt, +value: TabValue }>,
  +selected: TabValue,
  +setSelected: (TabValue) => void,
};

/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of
 * content at a time. Each tab panel has an associated tab element, that when activated, displays
 * the panel. The list of tab elements is arranged along one edge of the currently displayed panel.
 *
 * TODO: improve accessibility
 *  - https://www.w3.org/TR/wai-aria-practices/#tabpanel
 *  - https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
 */
export default function Tabs(props: Props): Node {
  return (
    <div className={styles('tabs')} role="tablist">
      {props.tabs.map((tab) => {
        const isTabSelected = props.selected === tab.value;
        return (
          // eslint-disable-next-line react/forbid-elements
          <button
            role="tab"
            type="button"
            key={tab.value}
            aria-selected={isTabSelected}
            // tabIndex={isTabSelected ? 0 : -1} // TODO (when we can navigate tabs with arrows)
            className={styles({
              tabDefault: true,
              tabSelected: isTabSelected,
            })}
            onClick={() => {
              props.setSelected(tab.value);
            }}
          >
            <Text size={16} weight={700}>
              {tab.title}
            </Text>
          </button>
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
  tabDefault: {
    'paddingInline': 20,
    'paddingBlock': 15,
    'cursor': 'pointer',
    'color': 'rgba(var(--sx-accent-6))',
    'backgroundColor': 'rgba(var(--sx-background))',
    'borderInline': 0,
    'borderBlockStart': 0,
    'borderBlockEnd': '2px solid rgba(var(--sx-accent-1))',
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
