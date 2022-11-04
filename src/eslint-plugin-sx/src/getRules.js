// @flow strict

const fs = require('fs');
const path = require('path');

const DEFAULT_RULES_PATH = path.join(__dirname, 'rules');

module.exports = function getRules(
  rulesPath /*: string */ = DEFAULT_RULES_PATH,
) /*: { +[ruleName: string]: string } */ {
  const rules /*: { [string]: $FlowFixMe } */ = {};
  for (const dirent of fs.readdirSync(rulesPath, {
    encoding: 'utf8',
    withFileTypes: true,
  })) {
    /* $FlowFixMe[incompatible-type] This comment suppresses an error when
     * upgrading Flow. To see the error delete this comment and run Flow. */
    const ruleFile /*: string */ = dirent.name;
    if (dirent.isFile() && /\.js$/.test(ruleFile)) {
      const ruleName = ruleFile.replace(/\.js$/, '');
      rules[ruleName] = require(path.join(rulesPath, ruleFile));
    }
  }
  return rules;
};
