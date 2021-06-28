// @flow

import { useState, useRef, useCallback, type Node } from 'react';
import sx from '@adeira/sx';

import SxDesignPortal from '../SxDesignPortal';
import findBestTooltipPosition, { nullClientRect } from './findBestTooltipPosition';

type Props = {
  +'children': FbtWithoutString,
  +'data-testid'?: string,
};

/**
 * By default displays the tooltip above the hover area OR tries to find the best position when it
 * doesn't fit above.
 */
export default function Tooltip(props: Props): Node {
  const hoverAreaRef = useRef<HTMLSpanElement | null>(null);
  const tooltipChildrenAreaRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(nullClientRect);

  const showTooltip = useCallback(() => {
    const tooltipChildrenArea =
      tooltipChildrenAreaRef.current?.getBoundingClientRect() ?? nullClientRect;
    const hoverArea = hoverAreaRef.current?.getBoundingClientRect() ?? nullClientRect;

    setTooltipPosition(findBestTooltipPosition(hoverArea, tooltipChildrenArea));
    setIsTooltipVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
  }, []);

  return (
    <>
      <span
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        ref={hoverAreaRef}
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

      <SxDesignPortal>
        <div
          className={styles('tooltipRoot')}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            // We use `visibility:hidden` instead of `display:none` so we can measure the width and
            // height of this message and position it correctly when displaying it.
            visibility: isTooltipVisible ? 'visible' : 'hidden',
          }}
          ref={tooltipChildrenAreaRef}
        >
          {props.children}
        </div>
      </SxDesignPortal>
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
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-foreground))',
    borderRadius: 'var(--sx-radius)',
    padding: '5px 10px',
  },
});
