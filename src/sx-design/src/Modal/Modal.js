// @flow

import FocusTrap from 'focus-trap-react';
import React, { useEffect, type Node } from 'react';

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
 * Additionally, it's not possible to scroll the modal background when the modal is open. This is to
 * make sure that the user returns to the exact same state as before opening the modal.
 */
export default function Modal(props: Props): Node {
  const size = useWindowSize();

  // The following effect prevents the modal background from scrolling when the modal is open.
  // It does so by setting the body overflow to "hidden" when the modal is open and resetting it
  // back to the initial value when it's closed.
  useEffect(() => {
    const body = document.body;
    let initialBodyOverflow = null;
    if (body != null) {
      const computedBodyStyle = window.getComputedStyle(body);
      const bodyOverflow = computedBodyStyle.getPropertyValue('overflow');
      initialBodyOverflow = bodyOverflow === '' ? null : bodyOverflow;
      if (props.isOpen === true) {
        body.style.overflow = 'hidden';
      } else {
        body.style.setProperty('overflow', initialBodyOverflow);
      }
    }
    return () => {
      if (body != null) {
        body.style.setProperty('overflow', initialBodyOverflow);
      }
    };
  }, [props.isOpen]);

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
