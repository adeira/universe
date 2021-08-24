// @flow

import FocusTrap from 'focus-trap-react';
import Icon from '@adeira/icons';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

import Button from '../Button/Button';
import LayoutBlock from '../Layout/LayoutBlock';
import LayoutInline from '../Layout/LayoutInline';
import SxDesignPortal from '../SxDesignPortal';
import Text from '../Text/Text';

type Props = {
  +isOpen: boolean,
  +onClose: () => void,
  +title: FbtWithoutString,
  +children: Node,
};

/**
 * Creates a dialog (modal) window overlaid on either the primary window or another dialog window.
 *
 * ## Closing
 *
 * The modal can be closed either by clicking on "X" button, clicking on the modal's underlay
 * (outside the modal) or by pressing "ESC".
 *
 * ## Accessibility
 *
 * Focus is trapped within the modal: `Tab` and `Shift+Tab` will cycle through the modal's focusable
 * nodes without returning to the main document beneath. When the modal closes, focus returns to the
 * element that was focused just before the modal activated.
 *
 * TODO: implement important accessibility features:
 *  - correct aria attributes
 *  - inspiration and resources:
 *    - https://www.w3.org/TR/wai-aria-practices/#dialog_modal
 *    - https://reactjs.org/docs/accessibility.html#programmatically-managing-focus
 *    - https://github.com/davidtheclark/react-aria-modal
 */
export default function Modal(props: Props): Node {
  // TODO: open in a drawer on smaller screens (https://vercel.com/design/drawer)

  const focusTrapOptions = {
    returnFocusOnDeactivate: true,
    escapeDeactivates: () => {
      props.onClose();
      return true;
    },
  };

  return (
    <SxDesignPortal>
      {props.isOpen === true ? (
        <FocusTrap focusTrapOptions={focusTrapOptions}>
          <div className={styles('modalOverlay')}>
            <div className={styles('modalOverlayBackdrop')} onClick={props.onClose} />
            <div className={styles('modalWindowRoot')}>
              <LayoutBlock spacing="large">
                <LayoutInline justifyContent="space-between">
                  <Text size={40}>{props.title}</Text>

                  <Text size={24}>
                    <Button tint="secondary" size="small" onClick={props.onClose}>
                      <Icon name="cross" data-testid="ModalCloseButton" />
                    </Button>
                  </Text>
                </LayoutInline>

                <div>{props.children}</div>
              </LayoutBlock>
            </div>
          </div>
        </FocusTrap>
      ) : null}
    </SxDesignPortal>
  );
}

const styles = sx.create({
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'auto',
    zIndex: 2000,
  },
  modalOverlayBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.25,
    pointerEvents: 'all',
    backgroundColor: 'rgba(var(--sx-foreground))',
    zIndex: -1,
  },
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
