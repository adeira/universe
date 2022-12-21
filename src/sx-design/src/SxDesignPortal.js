// @flow

import ReactDOM from 'react-dom';
import { invariant } from '@adeira/js';
import { useEffect, useState, useRef, type Node, type Portal } from 'react';

type Props = {
  +children: Node,
};

export const SX_DESIGN_REACT_PORTAL_ID = 'sx-design-react-portal-root';

export default function SxDesignPortal(props: Props): Portal | null {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(`#${SX_DESIGN_REACT_PORTAL_ID}`);
    setMounted(true);
  }, []);

  if (mounted === true) {
    invariant(
      ref.current != null,
      'Some components require HTML node with ID "#%s" (none was found). ' +
        'Did you forget to call "<SxDesignProvider />" somewhere in the application root?',
      SX_DESIGN_REACT_PORTAL_ID,
    );
    return ReactDOM.createPortal(props.children, ref.current);
  }

  return null;
}
