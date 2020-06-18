// @flow

require('@babel/register')({
  // Babel by default ignores our workspaces when executed from the nested
  // repository. We need to whitelist our `@adeira` scope here.
  ignore: [/node_modules\/(?!@adeira)/], // TODO: and possibly others out of `@adeira` scope - see `yarn workspaces info`

  // We need to look upwards for the root babel.config.js because these
  // scripts are being executed from the nested workspace.
  rootMode: 'upward',
});

// remove itself from the stack
process.argv = process.argv.filter((arg) => arg !== __filename);

require(process.argv[1]);
