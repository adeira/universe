// @flow strict

// Calculate brightness of a color according to YIQ formula (brightness is Y).
//
// Sources:
// - https://www.w3.org/TR/AERT/#color-contrast
// - https://en.wikipedia.org/wiki/YIQ
// - https://github.com/chromium/chromium/blob/a11b95356a4b646f87ef8857559613bcf5dd4059/third_party/google_input_tools/third_party/closure_library/closure/goog/color/color.js#L746
export default function calculateBrightness(rgb: [number, number, number]): number {
  return Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
}
