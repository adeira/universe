// @flow

import processRossumPayload from '../processRossumPayload';

export function handler(event: $FlowFixMe, context: $FlowFixMe, callback: $FlowFixMe): void {
  const payload = JSON.parse(event.body);

  const {
    messages,
    operations,
    automation_blockers, // eslint-disable-line camelcase
  } = processRossumPayload(payload);

  callback(
    null,
    JSON.stringify({
      messages,
      operations,
      automation_blockers, // eslint-disable-line camelcase
    }),
  );
}
