// @flow

import { useState, useRef, useCallback, type Node } from 'react';
import sx from '@adeira/sx';
import Icon from '@adeira/icons';

import SxDesignPortal from '../SxDesignPortal';
import Text from '../Text/Text';
import useKeyPress from '../useKeyPress';
import findBestTooltipPosition, { nullClientRect } from './findBestTooltipPosition';

// Tooltip follows similar API as `abbr` element (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr):
//  - `children` is text or symbol being displayed by default
//  - `title` is the popup on hover
type Props = {
  +'title': FbtWithoutString,
  +'children'?: Node,
  +'data-testid'?: string,
};

/**
 * A tooltip is a popup that displays information related to an element when the element receives
 * keyboard focus or the mouse hovers over it. In our case, it appears immediately and
 * disappears when `Escape` is pressed or on mouse out.
 *
 * By default displays the tooltip above the hover area OR tries to find the best position when it
 * doesn't fit above.
 *
 * For more info about `Tooltip` accessibility please visit:
 *  - https://www.w3.org/TR/wai-aria-practices/#tooltip
 *
 * TODO - improve accessibility:
 *  The element that triggers the tooltip references the tooltip element with aria-describedby.
 */
export default function Tooltip(props: Props): Node {
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);
  const tooltipAreaRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(nullClientRect);

  const showTooltip = useCallback(() => {
    const tooltipArea = tooltipAreaRef.current?.getBoundingClientRect() ?? nullClientRect;
    const hoverArea = hoverAreaRef.current?.getBoundingClientRect() ?? nullClientRect;

    setTooltipPosition(
      findBestTooltipPosition(
        {
          // Bounding client rect doesn't take scrolling into account so we need to adjust it:
          left: hoverArea.left + window.scrollX,
          width: hoverArea.width,
          right: hoverArea.right + window.scrollX,
          top: hoverArea.top + window.scrollY,
          bottom: hoverArea.bottom + window.scrollY,
          height: hoverArea.height,
        },
        {
          // Bounding client rect doesn't take scrolling into account so we need to adjust it:
          left: tooltipArea.left + window.scrollX,
          width: tooltipArea.width,
          right: tooltipArea.right + window.scrollX,
          top: tooltipArea.top + window.scrollY,
          bottom: tooltipArea.bottom + window.scrollY,
          height: tooltipArea.height,
        },
        window.innerWidth,
      ),
    );
    setIsTooltipVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsTooltipVisible(false);
  }, []);

  useKeyPress({
    key: 'Escape',
    onKeyDown: hideTooltip,
  });

  return (
    <>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        ref={hoverAreaRef}
        data-testid={props['data-testid']}
        className={styles('hoverArea')}
      >
        {props.children != null ? props.children : <Icon name="question_circle" />}
      </div>

      <SxDesignPortal>
        <div
          role="tooltip"
          className={styles('tooltipRoot')}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            // We use `visibility:hidden` instead of `display:none` so we can measure the width and
            // height of this message and position it correctly when displaying it.
            visibility: isTooltipVisible ? 'visible' : 'hidden',
          }}
          ref={tooltipAreaRef}
        >
          <Text as="small">{props.title}</Text>
        </div>
      </SxDesignPortal>
    </>
  );
}

const styles = sx.create({
  hoverArea: {
    display: 'inline-block',
    color: 'rgba(var(--sx-foreground))',
  },
  tooltipRoot: {
    position: 'absolute',
    maxWidth: '250px',
    color: 'rgba(var(--sx-background))',
    backgroundColor: 'rgba(var(--sx-foreground))',
    borderRadius: 'var(--sx-radius)',
    padding: '5px 10px',
    boxShadow: 'var(--sx-shadow-small)',
  },
});
