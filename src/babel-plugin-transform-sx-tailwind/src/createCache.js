// @flow

// BEGIN-ADEIRA-UNIVERSE-INTERNAL
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward',
});
// END-ADEIRA-UNIVERSE-INTERNAL

// Async script called via execFileSync from Babel plugin
// Params are passed as a JSON stringified object with two props:
//
// options - see https://tailwindcss.com/docs/configuration
// cacheFile - full path to cache file

const fs = require('fs');
const { generateTailwind } = require('@adeira/sx-tailwind');
const resolveConfig = require('tailwindcss/resolveConfig');

try {
  const { options, cacheFile } = JSON.parse(process.argv[2]);
  const config = resolveConfig(options);

  generateTailwind(config).then(({ styles, keyframes }) => {
    fs.writeFileSync(cacheFile, JSON.stringify({ keyframes, styles }));
  });
} catch (e) {}
