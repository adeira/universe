// @flow

import { ungzip } from 'pako';

import processRossumPayload from '../processRossumPayload';

export function handler(event: $FlowFixMe, context: $FlowFixMe, callback: $FlowFixMe): void {
  let payload;

  if (event.isBase64Encoded === true) {
    payload = Buffer.from(event.body, 'base64');
  } else {
    payload = event.body;
  }

  if (event.headers['content-encoding'] === 'gzip') {
    payload = new TextDecoder().decode(ungzip(payload));
  }

  const {
    messages,
    operations,
    automation_blockers, // eslint-disable-line camelcase
  } = processRossumPayload(JSON.parse(payload.toString()));

  callback(
    null,
    JSON.stringify({
      messages,
      operations,
      automation_blockers, // eslint-disable-line camelcase
    }),
  );
}
