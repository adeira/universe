// @flow

import os from 'os';

export default function replaceAutomatorTags(
  originalText: string,
  taskIdentifier: string,
  replacement: string,
) {
  // Extra gap is necessary because some Markdown parsers are not handling
  // HTML comments well: https://github.com/jonschlinkert/remarkable/issues/209
  const gap = os.EOL + os.EOL;
  const OPEN_TAG = `<!-- AUTOMATOR:${taskIdentifier} -->${gap}`;
  const CLOSE_TAG = `${gap}<!-- /AUTOMATOR:${taskIdentifier} -->`;

  const TAGS_REGEXP = new RegExp(
    `<!-- AUTOMATOR:${taskIdentifier} -->[\\s\\S]*?<!-- /AUTOMATOR:${taskIdentifier} -->`,
    'gu',
  );

  return originalText.replace(TAGS_REGEXP, OPEN_TAG + replacement + CLOSE_TAG);
}
