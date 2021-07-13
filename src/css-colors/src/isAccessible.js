// @flow strict

import calculateContrastRatio from './calculateContrastRatio';

type ContrastContext =
  | 'NORMAL_TEXT' // body text
  | 'LARGE_TEXT' // large-scale text (120-150% larger than body text)
  | 'GRAPHICAL_OBJECTS'; // active user interface components and graphical objects such as icons and graphs

type SuccessCriteria =
  | 'AA' // minimum ratio (AA rating)
  | 'AAA'; // enhanced ratio (AAA rating)

/**
 * WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large
 * text. WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and user interface
 * components (such as form input borders). WCAG Level AAA requires a contrast ratio of at least 7:1
 * for normal text and 4.5:1 for large text.
 *
 * Enhanced ratio for graphical objects is not defined.
 */
export default function isAccessible(
  rgbForeground: [number, number, number],
  rgbBackground: [number, number, number],
  context: ContrastContext = 'NORMAL_TEXT',
  successCriteria: SuccessCriteria = 'AA',
): boolean {
  const contrast = calculateContrastRatio(rgbForeground, rgbBackground);

  if (successCriteria === 'AA') {
    if (context === 'NORMAL_TEXT') {
      return contrast >= 4.5;
    } else if (context === 'LARGE_TEXT' || context === 'GRAPHICAL_OBJECTS') {
      return contrast >= 3.0;
    }
    (context: empty);
    return false;
  } else if (successCriteria === 'AAA') {
    if (context === 'NORMAL_TEXT') {
      return contrast >= 7.0;
    } else if (context === 'LARGE_TEXT') {
      return contrast >= 4.5;
    } else if (context === 'GRAPHICAL_OBJECTS') {
      // technically, this is not defined so we use the value from AA rating
      return contrast >= 3.0;
    }
    (context: empty);
    return false;
  }
  (successCriteria: empty);
  return false;
}
