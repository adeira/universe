// @flow strict

/**
 * Contrast ratio is defined as:
 *  (L1 + 0.05) / (L2 + 0.05), where:
 *    L1 is the relative luminance of the lighter of the colors, and
 *    L2 is the relative luminance of the darker of the colors.
 *
 * Relative luminance is defined as:
 *  L = 0.2126 * R + 0.7152 * G + 0.0722 * B, where:
 *    if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
 *    if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
 *    if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4, where:
 *      RsRGB = R8bit/255
 *      GsRGB = G8bit/255
 *      BsRGB = B8bit/255
 *
 * See: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 * See: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * See: https://webaim.org/resources/contrastchecker/
 */
export default function calculateContrastRatio(
  rgbForeground: [number, number, number],
  rgbBackground: [number, number, number],
): number {
  const L1 = calculateRelativeLuminance(...rgbForeground);
  const L2 = calculateRelativeLuminance(...rgbBackground);
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  return Math.round(ratio * 100) / 100;
}

function calculateRelativeLuminance(R8bit: number, G8bit: number, B8bit: number): number {
  const R = calculateRelativeLuminancePart(R8bit / 255);
  const G = calculateRelativeLuminancePart(G8bit / 255);
  const B = calculateRelativeLuminancePart(B8bit / 255);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function calculateRelativeLuminancePart(sRGB: number): number {
  if (sRGB <= 0.03928) {
    return sRGB / 12.92;
  }
  return ((sRGB + 0.055) / 1.055) ** 2.4;
}
