// @flow

import { styleBuffer, mediaStyleBuffer } from './styleBuffer';
import renderAtomicClasses from './css-renderers/renderAtomicClasses';
import renderMediaQuery from './css-renderers/renderMediaQuery';

export default function renderStatic(
  renderFunc: () => $FlowFixMe,
): {| +html: $FlowFixMe, +css: string |} {
  const html = renderFunc();

  let css = renderAtomicClasses(Array.from(styleBuffer.values()));
  let prefix = '';

  for (const [key, value] of mediaStyleBuffer) {
    css += `${prefix}${renderMediaQuery(key, Array.from(value.values()))}}`;
    prefix = ' ';
  }

  return {
    html,
    css,
  };
}
