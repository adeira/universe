// @flow

import { useState, useRef, type Node } from 'react';
import sx from '@adeira/sx';

import TooltipPortal from './TooltipPortal';

type Props = {
  +'children': FbtWithoutString,
  +'data-testid'?: string,
};

export default function Tooltip(props: Props): Node {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [boundingClientRect, setBoundingClientRect] = useState(null);

  const showTooltip = () => {
    setBoundingClientRect(ref.current?.getBoundingClientRect());
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => setIsTooltipVisible(false);

  return (
    <>
      <span
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        ref={ref}
        data-testid={props['data-testid']}
        className={styles('hoverIcon')}
      >
        {/* TODO: extract this icon somewhere else (https://systemuicons.com/) */}
        <svg height="1em" width="1em" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd" transform="translate(2 2)">
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8.5" cy="8.5" r="8" />
              <path d="m8.5 12.5v-4h-1" />
              <path d="m7.5 12.5h2" />
            </g>
            <circle cx="8.5" cy="5.5" fill="currentColor" r="1" />
          </g>
        </svg>
      </span>

      {isTooltipVisible === true && boundingClientRect != null ? (
        <TooltipPortal>
          <div
            className={styles('tooltipRoot')}
            style={{
              // Note: we currently do not deal with the viewport - we just display the tooltip
              // above no matter whether it fits or not.
              top: boundingClientRect.top,
              left: boundingClientRect.left,
            }}
          >
            {props.children}
          </div>
        </TooltipPortal>
      ) : null}
    </>
  );
}

const styles = sx.create({
  hoverIcon: {
    color: 'rgba(var(--sx-foreground))',
  },
  tooltipRoot: {
    position: 'absolute',
    maxWidth: '250px',
    transform: 'translate(calc(-50% + 15px), calc(-100% - 10px))',
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-foreground))',
    borderRadius: 'var(--sx-radius)',
    padding: '5px 10px',
  },
});
