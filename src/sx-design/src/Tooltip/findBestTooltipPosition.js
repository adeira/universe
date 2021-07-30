// @flow

// +-------------------------------------------+
// |                 ^             ^           |
// |                 | top (y)     |           |
// |                 v             | bottom    |
// |   left (x)   +---------+      |           |
// | <----------> | Element |      |           |
// |              +---------+      v           |
// |   right                                   |
// | <---------------------->                  |
// |                                           |
// +-------------------------------------------+
//
interface CustomClientRect {
  +left: number;
  +width: number;
  +right: number;
  +top: number;
  +bottom: number;
  +height: number;
}

export const nullClientRect: CustomClientRect = {
  left: 0,
  width: 0,
  right: 0,
  top: 0,
  bottom: 0,
  height: 0,
};

/**
 * By default, we try to display the tooltip above (centered). If it doesn't fit above, we display
 * it below. If it cannot be centered, we display it shifted to the right.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#value
 */
export default function findBestTooltipPosition(
  hoverArea: CustomClientRect,
  tooltipArea: CustomClientRect,
  windowInnerWidth: number,
): { +top: number, +left: number } {
  const position = { top: 0, left: 0 };

  const margin = 5;
  const topAbove = hoverArea.top - (tooltipArea.height + margin);
  const topBelow = hoverArea.bottom + margin;
  const leftCentered = hoverArea.left + hoverArea.width * 0.5 - tooltipArea.width * 0.5;

  if (topAbove > 0) {
    // render the tooltip above if there is enough space
    position.top = topAbove;
  } else {
    // or below otherwise
    position.top = topBelow;
  }

  if (leftCentered > 0 && leftCentered + tooltipArea.width < windowInnerWidth) {
    // covers a case when the tooltip fits perfectly (fits from left and right side)
    position.left = leftCentered;
  } else if (leftCentered + tooltipArea.width >= windowInnerWidth) {
    // covers a case when the tooltip DOESN'T fit from the right
    position.left = windowInnerWidth - tooltipArea.width;
  } else {
    // in any other case render it with left=0 and wish for the best
    position.left = 0;
  }

  return position;
}
