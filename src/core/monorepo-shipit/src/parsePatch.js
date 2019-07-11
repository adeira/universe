// @flow strict

import { invariant } from '@kiwicom/js';

opaque type Yield: string = string;
opaque type Return = void;
opaque type Next = void;

// See: https://github.com/facebook/fbshipit/blob/640eb8640bdf6e024a3a6eff7703f188d8a0d66a/src/shipit/ShipItUtil.php
export default function* parsePatch(patch: string): Generator<Yield, Return, Next> {
  let contents = '';
  let lineNumber = 0;

  let minusLines = 0;
  let plusLines = 0;
  let seenRangeHeader = false;

  for (const line of patch.split('\n')) {
    ++lineNumber;

    if (line.trimRight().match(/^diff --git [ab]\/(?:.*?) [ab]\/(?:.*?)$/)) {
      if (contents !== '') {
        yield contents;
      }
      seenRangeHeader = false;
      contents = `${line}\n`;
      continue;
    }

    const matches = line.match(
      /^@@ -\d+(?:,(?<minus_lines>\d+))? \+\d+(?:,(?<plus_lines>\d+))? @@/,
    );
    if (matches) {
      const rawMinusLines = matches.groups?.minus_lines;
      const rawPlusLines = matches.groups?.plus_lines;
      minusLines = rawMinusLines == null ? 1 : parseInt(rawMinusLines, 10);
      plusLines = rawPlusLines == null ? 1 : parseInt(rawPlusLines, 10);

      contents += `${line}\n`;
      seenRangeHeader = true;
      continue;
    }

    if (seenRangeHeader === false) {
      contents += `${line}\n`;
      continue;
    }

    const leftmost = line.charAt(0);
    if (leftmost === '\\') {
      contents += `${line}\n`;
      // doesn't count as a + or - line whatever happens; if NL at EOF
      // changes, there is a + and - for the last line of content
      continue;
    }

    if (minusLines <= 0 && plusLines <= 0) {
      continue;
    }

    if (leftmost === '+') {
      --plusLines;
    } else if (leftmost === '-') {
      --minusLines;
    } else if (leftmost === ' ' || leftmost === '') {
      // context goes from both
      --plusLines;
      --minusLines;
    } else {
      invariant(false, "Can't parse hunk line %s: %s", lineNumber, line);
    }
    contents += `${line}\n`;
  }

  if (contents !== '') {
    yield contents;
  }
}
