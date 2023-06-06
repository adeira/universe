// @flow

import getRandomDatapointID from './getRandomDatapointID';

export default function createDummyDatapoint(schemaId: string, value: string): $FlowFixMe {
  return {
    id: getRandomDatapointID(),
    url: 'https://api.elis.rossum.ai/v1/annotations/32762322/content/3877884973',
    content: {
      value: value,
      normalized_value: null,
      page: null,
      position: null,
      rir_text: '',
      rir_raw_text: '',
      ocr_text: null,
      ocr_raw_text: null,
      rir_page: null,
      rir_position: null,
      ocr_position: null,
      rir_confidence: null,
      connector_position: null,
      connector_text: null,
    },
    category: 'datapoint',
    schema_id: schemaId,
    validation_sources: ['not_found'],
    time_spent: 0.0,
    time_spent_overall: 0.0,
  };
}
