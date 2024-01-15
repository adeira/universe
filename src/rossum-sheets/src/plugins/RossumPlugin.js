// @flow

import lodashGet from 'lodash.get';
import { findBySchemaId } from '@adeira/rossum-utils';
import { CellError, FunctionPlugin, FunctionArgumentType, SimpleRangeValue } from 'hyperformula';
import type { RossumDatapoint } from '@adeira/rossum-flow-types';

export const RossumPluginTranslations = {
  enUS: {
    'ROSSUM.DP': 'ROSSUM.DP',
    'ROSSUM.DP_CONFIDENCE': 'ROSSUM.DP_CONFIDENCE',
    'ROSSUM.DP_VALIDATION_SOURCES': 'ROSSUM.DP_VALIDATION_SOURCES',
    'ROSSUM.PAYLOAD': 'ROSSUM.PAYLOAD',
  },
};

export class RossumPlugin extends FunctionPlugin {
  #getDatapoint(datapointId: string): RossumDatapoint | null {
    const datapoint = findBySchemaId(globalThis.__rossum_payload__.annotation.content, datapointId);
    if (datapoint == null) {
      return new CellError('VALUE', `Datapoint with ID '${datapointId}' does not exist.`);
    }
    return datapoint[0];
  }

  /**
   * Returns value of the specified datapoint.
   */
  rossumDatapoint(ast: $FlowFixMe, state: $FlowFixMe): string | CellError {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('ROSSUM.DP'),
      (datapointId, normalize) => {
        if (typeof datapointId !== 'string') {
          return new CellError('VALUE', 'Function ROSSUM.DP accepts only a string as an argument.');
        }

        const datapoint = this.#getDatapoint(datapointId);
        if (datapoint instanceof CellError) {
          return datapoint;
        }

        let datapointValue = datapoint.content.normalized_value ?? datapoint.content.value;

        // if (normalize === true) {
        //   datapointValue = datapointValue.replaceAll(/[^a-zA-Z0-9]/g, '');
        // }

        // TODO: Adeira/js
        function isNumeric(value: mixed): boolean {
          return !isNaN(parseFloat(value)) && isFinite(value);
        }

        // return datapointValue === '' ? null : datapointValue;

        // It is important to return the correct data type (string/number/...) so that other
        // formulas know how to work with said value. To do so, we need to check the schema (must
        // be side-loaded).

        // TODO: rework to use the side-loaded schemas
        return isNumeric(datapointValue) ? parseFloat(datapointValue) : datapointValue;
      },
    );
  }

  rossumDatapointConfidence(ast: $FlowFixMe, state: $FlowFixMe): number | null {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('ROSSUM.DP_CONFIDENCE'),
      (datapointId) => {
        if (typeof datapointId !== 'string') {
          return new CellError(
            'VALUE',
            'Function ROSSUM.DP_CONFIDENCE accepts only a string as an argument.',
          );
        }

        const datapoint = this.#getDatapoint(datapointId);
        if (datapoint instanceof CellError) {
          return datapoint;
        }

        return datapoint.content.rir_confidence; // TODO: can sometimes return null - should we normalize it to 0 (?)
      },
    );
  }

  rossumDatapointValidationSources(ast: $FlowFixMe, state: $FlowFixMe): $FlowFixMe {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('ROSSUM.DP_VALIDATION_SOURCES'),
      (datapointId) => {
        if (typeof datapointId !== 'string') {
          return new CellError(
            'VALUE',
            'Function ROSSUM.DP_VALIDATION_SOURCES accepts only a string as an argument.',
          );
        }

        const datapoint = this.#getDatapoint(datapointId);
        if (datapoint instanceof CellError) {
          return datapoint;
        }

        return SimpleRangeValue.onlyValues([datapoint.validation_sources]);
      },
    );
  }

  rossumPayload(ast: $FlowFixMe, state: $FlowFixMe): $FlowFixMe {
    return this.runFunction(ast.args, state, this.metadata('ROSSUM.PAYLOAD'), (payloadPath) => {
      if (typeof payloadPath !== 'string') {
        return new CellError(
          'VALUE',
          'Function ROSSUM.PAYLOAD accepts only a string as an argument.',
        );
      }

      return lodashGet(globalThis.__rossum_payload__, payloadPath);
    });
  }
}

RossumPlugin.implementedFunctions = {
  'ROSSUM.DP': {
    // isVolatile: true, // TODO
    method: 'rossumDatapoint',
    parameters: [
      { argumentType: FunctionArgumentType.STRING },
      { argumentType: FunctionArgumentType.BOOLEAN, defaultValue: false },
    ],
  },
  'ROSSUM.DP_CONFIDENCE': {
    method: 'rossumDatapointConfidence',
    parameters: [{ argumentType: FunctionArgumentType.STRING }],
  },
  'ROSSUM.DP_VALIDATION_SOURCES': {
    method: 'rossumDatapointValidationSources',
    parameters: [{ argumentType: FunctionArgumentType.STRING }],
  },
  'ROSSUM.PAYLOAD': {
    method: 'rossumPayload',
    parameters: [{ argumentType: FunctionArgumentType.STRING }],
  },
};
