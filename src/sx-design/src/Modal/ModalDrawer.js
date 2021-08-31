// @flow

import Icon from '@adeira/icons';
import sx from '@adeira/sx';
import React, { type Node } from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import LayoutBlock from '../Layout/LayoutBlock';
import LayoutInline from '../Layout/LayoutInline';
import ModalBackdrop from './ModalBackdrop';
import Text from '../Text/Text';

type Props = {
  +isOpen: boolean,
  +onClose: () => void,
  +title: FbtWithoutString,
  +children: Node,
};

/**
 * Renders modal DRAWER to be used inside `Modal` component. It should be somehow similar to
 * `ModalDialog` component.
 *
 * Note: This component is currently not intended to be used alone (use Modal instead).
 */
export default function ModalDrawer(props: Props): Node {
  return (
    <ModalBackdrop onClick={props.onClose} align="end">
      <div className={styles('drawerWindowRoot')}>
        <LayoutBlock spacing="large">
          <LayoutInline justifyContent="space-between">
            <Text size={32}>{props.title}</Text>

            <Text>
              <Button
                tint="secondary"
                size="small"
                onClick={props.onClose}
                aria-label={
                  <fbt desc="close modal button ARIA description">close modal button</fbt>
                }
              >
                <Icon name="cross" data-testid="ModalDrawerCloseButton" />
              </Button>
            </Text>
          </LayoutInline>

          <div>{props.children}</div>
        </LayoutBlock>
      </div>
    </ModalBackdrop>
  );
}

const styles = sx.create({
  drawerWindowRoot: {
    backgroundColor: 'rgba(var(--sx-background))',
    color: 'rgba(var(--sx-foreground))',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    maxHeight: '90%',
    borderStartStartRadius: 'var(--sx-radius)',
    borderStartEndRadius: 'var(--sx-radius)',
    boxShadow: 'var(--sx-shadow-large)',
    padding: 'var(--sx-spacing-medium)',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});
