// @flow

import calculateContrastRatio from '../calculateContrastRatio';

it.each([
  [
    [0, 0, 0], // black foreground
    [255, 255, 255], // on white background
    21, // 21:1
  ],
  [
    [255, 255, 255], // white foreground
    [0, 0, 0], // on black background
    21, // 21:1
  ],
  [
    [255, 255, 255], // white foreground
    [255, 255, 255], // on white background
    1, // 1:1
  ],
  [
    [0, 0, 0], // black foreground
    [0, 0, 0], // on black background
    1, // 1:1
  ],
  // Some random samples:
  [
    [231, 115, 37],
    [82, 161, 81],
    1.05, // 1.05:1
  ],
  [
    [130, 242, 75],
    [119, 46, 242],
    4.27, // 4.27:1
  ],
  [
    [104, 50, 28],
    [243, 225, 229],
    8.11, // 8.11:1
  ],
])(
  'takes %s RGB triplet and %s RGB triplet and calculates %s:1 contrast ratio',
  (foreground, background, ratio) => {
    expect(calculateContrastRatio(foreground, background)).toBe(ratio);
  },
);
