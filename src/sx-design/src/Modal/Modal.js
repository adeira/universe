// @flow

import FocusTrap from 'focus-trap-react';
import React, { type Node } from 'react';

import ModalDialog from './ModalDialog';
import ModalDrawer from './ModalDrawer';
import SxDesignPortal from '../SxDesignPortal';
import useWindowSize from '../useWindowSize';
import { MOBILE_WIDTH_BOUNDARY } from '../constants';

type Props = {
  +isOpen: boolean,
  +onClose: () => void,
  +title: FbtWithoutString,
  +children: Node,
};

/**
 * Creates a modal window overlaid on either the primary window or another modal window. By default
 * the modal window is renders as a dialog window on large screens and as a drawer on smaller
 * screens (mobile).
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
  const size = useWindowSize();

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
          <div
            // leave this wrapping div here (needed by FocusTrap component)
            role="dialog"
            aria-modal="true"
            aria-label={props.title}
          >
            {size.width != null && size.width <= MOBILE_WIDTH_BOUNDARY ? (
              <ModalDrawer isOpen={props.isOpen} onClose={props.onClose} title={props.title}>
                {props.children}
              </ModalDrawer>
            ) : (
              <ModalDialog isOpen={props.isOpen} onClose={props.onClose} title={props.title}>
                {props.children}
              </ModalDialog>
            )}
          </div>
        </FocusTrap>
      ) : null}
    </SxDesignPortal>
  );
}
