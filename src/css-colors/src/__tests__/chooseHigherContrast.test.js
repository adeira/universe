// @flow strict

import calculateContrastRatio from '../calculateContrastRatio';
import chooseHigherContrast from '../chooseHigherContrast';

// HELP:
// [0, 0, 0], // black
// [255, 255, 255], // white

it('works when there is no good choice', () => {
  expect(chooseHigherContrast([0, 0, 0], [0, 0, 0], [0, 0, 0])).toStrictEqual([0, 0, 0]);
  expect(chooseHigherContrast([255, 255, 255], [255, 255, 255], [255, 255, 255])).toStrictEqual([
    255, 255, 255,
  ]);
});

it('picks white color on black background', () => {
  expect(chooseHigherContrast([255, 255, 255], [128, 128, 128], [0, 0, 0])).toStrictEqual([
    255, 255, 255,
  ]);
});

it('chooses the first foreground when contrasts are identical', () => {
  const fgA = [0, 0, 245];
  const fgB = [125, 28, 123];
  const bg = [133, 133, 133];

  expect(calculateContrastRatio(fgA, bg)).toBe(2.45);
  expect(calculateContrastRatio(fgB, bg)).toBe(2.45);

  expect(chooseHigherContrast(fgA, fgB, bg)).toStrictEqual(fgA);
  expect(chooseHigherContrast(fgB, fgA, bg)).toStrictEqual(fgB);
});
