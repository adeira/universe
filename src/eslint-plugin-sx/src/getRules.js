// @flow strict

const fs = require('fs');
const path = require('path');

module.exports = function getRules() /*: {| +[ruleName: string]: string |} */ {
  const rules = {};
  const rulesPath = path.join(__dirname, 'rules');
  for (const dirent of fs.readdirSync(rulesPath, {
    encoding: 'utf8',
    withFileTypes: true,
  })) {
    // $FlowIssue[prop-missing]: https://github.com/facebook/flow/pull/8532
    if (dirent.isFile()) {
      // $FlowIssue[prop-missing]: https://github.com/facebook/flow/pull/8532
      const ruleFile = dirent.name;
      const ruleName = ruleFile.replace(/\.js$/, '');
      rules[ruleName] = require(path.join(rulesPath, ruleFile));
    }
  }
  return rules;
};
