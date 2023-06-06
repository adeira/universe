// @flow

import findBySchemaId from '../../../utils/findBySchemaId';
import removeLineItemsExceptOne from '../removeLineItemsExceptOne';
import payloadWithMultipleLineItems from './fixtures/payload_with_multiple_line_items.json';

it('TKTK', () => {
  // button ID: 3877884978
  const datapoint_id = payloadWithMultipleLineItems.updated_datapoints[0];

  expect(
    findBySchemaId(payloadWithMultipleLineItems.annotation.content, 'line_items')[0].children,
  ).toHaveLength(2);

  const newPayload = removeLineItemsExceptOne(payloadWithMultipleLineItems, datapoint_id);
  expect(newPayload).toMatchSnapshot();

  expect(findBySchemaId(newPayload.annotation.content, 'line_items')[0].children).toHaveLength(1);
});
