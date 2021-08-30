// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';

type Props = {
  +onClick: () => void,
  +children: Node,
  +align: 'center' | 'end',
};

export default function ModalBackdrop(props: Props): Node {
  return (
    <div
      className={styles({
        modalOverlay: true,
        modalOverlayCenter: props.align === 'center',
        modalOverlayEnd: props.align === 'end',
      })}
    >
      <div
        className={styles('modalOverlayBackdrop')}
        onClick={props.onClick}
        data-testid="ModalBackdrop"
      />
      {props.children}
    </div>
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
    height: '100vh',
    width: '100vw',
    overflow: 'auto',
    zIndex: 2000,
  },
  modalOverlayCenter: {
    justifyContent: 'center',
  },
  modalOverlayEnd: {
    justifyContent: 'end',
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
});
