// @flow

const program = require('commander');
const RelayConfig = require('relay-config');
const { invariant } = require('@adeira/js');

/*::

type FetchSchemaOptions = {
  +resource: string,
  +schema: string,
}

*/

module.exports.fetchSchemaOptions = function (
  argToParse: $ReadOnlyArray<string>,
) /*: FetchSchemaOptions */ {
  const relayConfig = RelayConfig.loadConfig() ?? {};

  const options = program
    .option('--resource <url>')
    .option('--filename <path>', "DEPRECATED - use 'relay.config.js' instead")
    .parse(argToParse)
    .opts();

  const config = {
    resource: options.resource,
    schema: options.filename ?? relayConfig.schema,
  };

  invariant(config.resource != null, 'Option --resource is required.');
  invariant(config.schema != null, 'Option --filename is required.'); // TODO: rename to `--schema`

  return config;
};

/*::

type RelayCompilerOptions = {
  +src: string,
  +schema: string,
  +validate: boolean,
  +watch: boolean,
}

*/

module.exports.relayCompilerOptions = function (
  argToParse: $ReadOnlyArray<string>,
) /*: RelayCompilerOptions */ {
  const relayConfig = RelayConfig.loadConfig() ?? {};

  const options = program
    // Please note: try not to extend this CLI if possible. Always prefer "relay.config.js" file.
    .option('--src <src>')
    .option('--schema <schema>')
    .option('--validate', 'Activates validate only mode', false)
    .option(
      '--watch',
      'This option currently REQUIRES Watchman (https://facebook.github.io/watchman/) to be installed.',
      false,
    )
    .parse(argToParse)
    .opts();

  const config = {
    src: options.src ?? relayConfig.src,
    schema: options.schema ?? relayConfig.schema,
    validate: options.validate ?? relayConfig.validate,
    watch: options.watch ?? relayConfig.watch,
  };

  invariant(config.src != null, 'Option --src is required.');
  invariant(config.schema != null, 'Option --schema is required.');

  return config;
};
