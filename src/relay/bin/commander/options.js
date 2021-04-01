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
