// @flow

import ReactDOM from 'react-dom';
import { invariant } from '@adeira/js';
import { useEffect, useState, useRef, type Portal, type Node } from 'react';

type Props = {
  +children: Node,
};

export default function TooltipPortal(props: Props): Portal | null {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#react-portal-root');
    setMounted(true);
  }, []);

  if (mounted === true) {
    invariant(
      ref.current != null,
      'Tooltip component requires HTML node with ID "#react-portal-root" (none was found). ' +
        'Did you forget to call "<SxDesignProvider />" somewhere in the application root?',
    );
    return ReactDOM.createPortal(props.children, ref.current);
  }

  return null;
}
