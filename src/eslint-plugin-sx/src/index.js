// @flow

const path = require('path');
const requireIndex = require('requireindex');

// import all rules in src/rules
module.exports.rules = (requireIndex(path.join(__dirname, 'rules')) /*: any */);
