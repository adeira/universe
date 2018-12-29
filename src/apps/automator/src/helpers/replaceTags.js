// @flow

import os from 'os';

export default function replaceTags(
  originalText: string,
  taskIdentifier: string,
  replacement: string,
) {
  const OPEN_TAG = `<!-- AUTOMATOR:${taskIdentifier} -->` + os.EOL;
  const CLOSE_TAG = os.EOL + `<!-- /AUTOMATOR:${taskIdentifier} -->`;
  const TAGS_REGEXP = new RegExp(
    '<!-- AUTOMATOR:' +
      taskIdentifier +
      ' -->[\\s\\S]*?<!-- /AUTOMATOR:' +
      taskIdentifier +
      ' -->',
    'gu',
  );

  return originalText.replace(TAGS_REGEXP, OPEN_TAG + replacement + CLOSE_TAG);
}
