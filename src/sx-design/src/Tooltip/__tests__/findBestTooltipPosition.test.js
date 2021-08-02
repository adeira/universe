// @flow

import findBestTooltipPosition from '../findBestTooltipPosition';

function getHoverArea({ top, left }) {
  const width = 100;
  const height = 100;
  return {
    left: left,
    width,
    right: left + width,
    top: top,
    bottom: top + height,
    height,
  };
}

function getTooltipArea() {
  return {
    left: 0,
    width: 300,
    right: 0,
    top: 0,
    bottom: 0,
    height: 20,
  };
}

const WINDOW_INNER_WIDTH = 2_000; // big enough

it('renders the tooltip above and centered by default', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 600, left: 600 }),
      getTooltipArea(),
      WINDOW_INNER_WIDTH,
    ),
  ).toStrictEqual({
    top: 575, // top of hover area (600) - height of tooltip (20) - extra gap (5)
    left: 500, // left of hover area (600) + 50% of hover area width (50) - 50% of tooltip width (150)
  });
});

it('renders the tooltip above and shifted when it cannot be centered', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 600, left: 0 }),
      getTooltipArea(),
      WINDOW_INNER_WIDTH,
    ),
  ).toStrictEqual({
    top: 575, // top of hover area (600) - height of tooltip (20) - extra gap (5)
    left: 0,
  });
});

it('renders the tooltip below and centered when it cannot fit above', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 0, left: 600 }),
      getTooltipArea(),
      WINDOW_INNER_WIDTH,
    ),
  ).toStrictEqual({
    top: 105, // height of hover area (100) + extra gap (5)
    left: 500, // left of hover area (600) + 50% of hover area width (50) - 50% of tooltip width (150)
  });
});

it('renders the tooltip below and shifted when it cannot fit above and centered', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 0, left: 0 }),
      getTooltipArea(),
      WINDOW_INNER_WIDTH,
    ),
  ).toStrictEqual({
    top: 105, // height of hover area (100) + extra gap (5)
    left: 0,
  });
});

it('renders the tooltip correctly when it cannot fit from the right side', () => {
  expect(
    findBestTooltipPosition(
      getHoverArea({ top: 600, left: WINDOW_INNER_WIDTH - 100 }),
      getTooltipArea(),
      WINDOW_INNER_WIDTH,
    ),
  ).toStrictEqual({
    top: 575, // top of hover area (600) - height of tooltip (20) - extra gap (5)
    left: 1700, // window width (2000) - width of tooltip (300)
  });
});
