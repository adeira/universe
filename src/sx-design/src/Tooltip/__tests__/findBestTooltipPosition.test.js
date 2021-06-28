// @flow

import findBestTooltipPosition from '../findBestTooltipPosition';

function getHoverArea({ top, left }) {
  return {
    left: left,
    width: 150,
    right: left + 150,
    top: top,
    bottom: top + 250,
    height: 250,
  };
}

function getTooltipChildrenArea({ width, height }) {
  return {
    left: 0,
    width: width,
    right: 0,
    top: 0,
    bottom: 0,
    height: height,
  };
}

it('renders the tooltip above and centered by default', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 600, left: 600 }),
      getTooltipChildrenArea({ width: 300, height: 20 }),
    ),
  ).toStrictEqual({
    top: 570, // top of hover area (600) - height (20) - extra gap (10)
    left: 450, // left of hover area (600) - 50% of the tooltip width (150)
  });
});

it('renders the tooltip below and centered when it cannot fit above', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 0, left: 500 }),
      getTooltipChildrenArea({ width: 200, height: 50 }),
    ),
  ).toStrictEqual({
    top: 260, // height of hover area (250) + extra gap (10)
    left: 400, // left of hover area (500) - 50% of the tooltip width (100)
  });
});

it('renders the tooltip below and shifted when it cannot fit above and centered', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 0, left: 0 }),
      getTooltipChildrenArea({ width: 200, height: 50 }),
    ),
  ).toStrictEqual({
    top: 260, // height of hover area (250) + extra gap (10)
    left: 0,
  });
});
