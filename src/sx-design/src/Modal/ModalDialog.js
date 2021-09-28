// @flow

import Icon from '@adeira/icons';
import React, { type Node } from 'react';
import sx from '@adeira/sx';
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
 * Renders modal DIALOG to be used inside `Modal` component. It should be somehow similar to
 * `ModalDrawer` component.
 *
 * Note: This component is currently not intended to be used alone (use Modal instead).
 */
export default function ModalDialog(props: Props): Node {
  return (
    <ModalBackdrop onClick={props.onClose} align="center">
      <div className={styles('modalWindowRoot')}>
        <LayoutBlock spacing="large">
          <LayoutInline justifyContent="space-between">
            <Text size={40}>{props.title}</Text>

            <Text size={24}>
              <Button
                tint="secondary"
                size="small"
                onClick={props.onClose}
                aria-label={
                  <fbt desc="ARIA description of the button which closes the modal dialog">
                    close modal
                  </fbt>
                }
              >
                <Icon name="cross" data-testid="ModalDialogCloseButton" />
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
  modalWindowRoot: {
    backgroundColor: 'rgba(var(--sx-background))',
    color: 'rgba(var(--sx-foreground))',
    width: '80%',
    maxWidth: '100%',
    height: '80%',
    maxHeight: '100%',
    borderRadius: 'var(--sx-radius)',
    boxShadow: 'var(--sx-shadow-large)',
    padding: 'var(--sx-spacing-large)',
    overflowX: 'hidden',
    overflowY: 'auto',
    marginBlock: 'var(--sx-spacing-large)',
  },
});
