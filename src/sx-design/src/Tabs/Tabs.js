// @flow

import React, { useRef, type Node } from 'react';
import sx from '@adeira/sx';

import Text from '../Text/Text';
import useKeyPress from '../useKeyPress';

export type TabValueType = string | number | null;
export type TabsType = Array<{
  +title: Fbt | RestrictedElement<typeof Text>,
  +value: TabValueType,
}>;

type Props = {
  +tabs: TabsType,
  +selected: TabValueType,
  +setSelected: (TabValueType) => void,
};

/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of
 * content at a time. Each tab panel has an associated tab element, that when activated, displays
 * the panel. The list of tab elements is arranged along one edge of the currently displayed panel.
 *
 * ## Accessibility
 *
 * When focus moves into the tab list, places focus on the active tab element. When the tab list
 * contains the focus, moves focus to the next element in the page tab sequence outside the tablist,
 * which is typically either the first focusable element inside the tab panel or the tab panel itself.
 *
 * When focus is on a tab element in a horizontal tab list:
 *  - Left Arrow: moves focus to the previous tab. If focus is on the first tab, moves focus to the
 *   last tab.
 *  - Right Arrow: moves focus to the next tab. If focus is on the last tab element, moves focus to
 *   the first tab.
 *
 * When focus is on a tab in a tablist:
 *  - Space or Enter: activates the tab if it was not activated automatically on focus.
 *
 * For more information about accessibility please visit:
 *  - https://www.w3.org/TR/wai-aria-practices/#tabpanel
 *  - https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
 */
export default function Tabs(props: Props): Node {
  const tabRefs = useRef([]);

  // The following function takes care of switching the tabs based on the pressed arrows (left/right).
  // We could emulate this behavior by simply using radiogroup which does this by default. However,
  // it's convenient to implement it manually because we want to delay the tabpanel activation on
  // spacebar/enter press. This way we can preload the tabpanel content in case the panel is not
  // loading instantly (for example: https://relay.dev/docs/api-reference/use-preloaded-query/).
  //
  // TODO: add ability to activate the tabs instantly when the preloading is not needed (?)
  const switchTabOnArrowPress = (direction: 'left' | 'right') => {
    const activeIndex = tabRefs.current.findIndex((tab) => tab === document.activeElement);

    if (activeIndex === -1) {
      // none of the tabs is focused so we have to ignore all attempts to change the tab with arrows
      return;
    }

    const nextTab = tabRefs.current[activeIndex + (direction === 'left' ? -1 : +1)];
    if (nextTab != null) {
      nextTab.focus();
    } else if (direction === 'left') {
      // focus LAST tab (going from the left card to the end)
      tabRefs.current[tabRefs.current.length - 1]?.focus();
    } else if (direction === 'right') {
      // focus FIST tab (going from the right card to the beginning)
      tabRefs.current[0]?.focus();
    } else {
      (direction: empty);
    }
  };

  useKeyPress({
    key: 'ArrowLeft',
    onKeyDown: () => {
      switchTabOnArrowPress('left');
    },
  });

  useKeyPress({
    key: 'ArrowRight',
    onKeyDown: () => {
      switchTabOnArrowPress('right');
    },
  });

  return (
    <div className={styles('tabs')} role="tablist" aria-orientation="horizontal">
      {props.tabs.map((tab, index) => {
        const isTabSelected = props.selected === tab.value;
        return (
          // eslint-disable-next-line react/forbid-elements
          <button
            data-testid={tab.value != null ? `TabsButton-${tab.value}` : 'TabsButton'}
            role="tab"
            type="button"
            key={tab.value}
            aria-selected={isTabSelected}
            tabIndex={isTabSelected ? 0 : -1} // only the selected tab can be "tabbable", use arrows to navigate to the other tabs
            className={styles({
              tabDefault: true,
              tabSelected: isTabSelected,
            })}
            onClick={() => {
              props.setSelected(tab.value);
            }}
            ref={(element) => (tabRefs.current[index] = element)}
          >
            <Text size={16} weight={700} as="span">
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
