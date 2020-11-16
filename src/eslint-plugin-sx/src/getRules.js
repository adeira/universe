// @flow strict

const fs = require('fs');
const path = require('path');

const DEFAULT_RULES_PATH = path.join(__dirname, 'rules');

module.exports = function getRules(
  rulesPath /*: string */ = DEFAULT_RULES_PATH,
) /*: {| +[ruleName: string]: string |} */ {
  const rules = {};
  for (const dirent of fs.readdirSync(rulesPath, {
    encoding: 'utf8',
    withFileTypes: true,
  })) {
    // $FlowIssue[prop-missing]: https://github.com/facebook/flow/pull/8532
    if (dirent.isFile() && /\.js$/.test(dirent.name)) {
      // $FlowIssue[prop-missing]: https://github.com/facebook/flow/pull/8532
      const ruleFile = dirent.name;
      const ruleName = ruleFile.replace(/\.js$/, '');
      rules[ruleName] = require(path.join(rulesPath, ruleFile));
    }
  }
  return rules;
};
