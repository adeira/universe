// @flow

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
 * TODO: deal with a situation when it doesn't fit from the right side (see storybook)
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#value
 */
export default function findBestTooltipPosition(
  hoverArea: CustomClientRect,
  tooltipChildrenArea: CustomClientRect,
): { +top: number, +left: number } {
  const position = { top: 0, left: 0 };

  const topAbove = hoverArea.top - (tooltipChildrenArea.height + 10);
  const topBelow = hoverArea.bottom + 10;
  const leftCentered = hoverArea.left - tooltipChildrenArea.width * 0.5;

  if (topAbove > 0) {
    // render the tooltip above if there is enough space
    position.top = topAbove;
  } else {
    // or below otherwise
    position.top = topBelow;
  }

  if (leftCentered > 0) {
    // render the tooltip centered if it fits
    position.left = leftCentered;
  } else {
    // otherwise shift it to the right
    position.left = 0;
  }

  return position;
}
