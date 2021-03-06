// @flow

const program = require('commander');

/*::

type FetchSchemaOptions = {|
  +resource?: string,
  +filename: string,
|}

*/

module.exports.fetchSchemaOptions = function (
  argToParse: $ReadOnlyArray<string>,
) /*: FetchSchemaOptions */ {
  return program
    .option('--resource <url>')
    .option('--filename <path>', undefined, 'schema.graphql')
    .parse(argToParse)
    .opts();
};

/*::

type RelayCompilerOptions = {|
  +src?: string,
  +schema?: string,
  +persistMode?: string,
  +validate?: boolean,
  +watch?: boolean,
|}

*/

module.exports.relayCompilerOptions = function (
  argToParse: $ReadOnlyArray<string>,
) /*: RelayCompilerOptions */ {
  return (
    program
      // Please note: try not to extend this CLI if possible. Always prefer "relay.config.js" file.
      .option('--src <src>')
      .option('--schema <schema>')
      .option('--persist-mode <fs|remote>')
      .option('--validate', 'Activates validate only mode', false)
      .option(
        '--watch',
        'This option currently REQUIRES Watchman (https://facebook.github.io/watchman/) to be installed.',
        false,
      )
      .parse(argToParse)
      .opts()
  );
};
