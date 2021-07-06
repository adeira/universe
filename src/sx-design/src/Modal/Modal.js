// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import SxDesignPortal from '../SxDesignPortal';

type Props = {
  +isOpen: boolean,
  +onClose: () => void,
  +children: Node, // TODO: limit it to only owned components (Modal.Body, Modal.Actions, …)
};

export default function Modal(props: Props): Node {
  // TODO: open in a drawer on smaller screens (mobile)

  return (
    <SxDesignPortal>
      {props.isOpen === true ? (
        <div className={styles('modalOverlay')}>
          <div className={styles('modalOverlayBackdrop')} onClick={props.onClose} />
          <div className={styles('modalWindowRoot')}>{props.children}</div>
        </div>
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
    width: 600,
    maxWidth: '100%',
    height: 400,
    maxHeight: '100%',
    borderRadius: 'var(--sx-radius)',
    boxShadow: 'var(--sx-shadow-large)',
  },
});
