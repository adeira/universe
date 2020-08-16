// @flow

/*::

type SourceStrings = {|
  +phrases: $ReadOnlyArray<{|
    +hashToText: {| +[string]: string |},
    +filepath: string,
    +line_beg: number,
    +col_beg: number,
    +line_end: number,
    +col_end: number,
    +desc: string,
    +project: string,
    +type: string,
    +jsfbt: string, // TODO
  |}>,
|};

*/

// $FlowIssue[cannot-resolve-module] https://github.com/facebook/flow/issues/7673
const sourceStrings /*: SourceStrings */ = require('../.source_strings.json');

// node scripts/fbt-to-txt.js

for (const phrase of sourceStrings.phrases) {
  for (const [hash, text] of Object.entries(phrase.hashToText)) {
    // $FlowIssue[incompatible-type] https://github.com/facebook/flow/issues/5838
    console.warn(`${hash} (${phrase.desc})\nEN: ${text}\nES: \n`); // eslint-disable-line no-console
  }
}
