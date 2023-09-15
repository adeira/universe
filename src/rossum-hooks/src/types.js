// @flow

type WebhookResponseOperationReplace = {
  op: 'replace',
  id: string,
  value: { ... }, // TODO
};

type WebhookResponseOperationAdd = {
  op: 'add',
  id: string,
  value: $ReadOnlyArray<{ ... }>, // TODO
};

type WebhookResponseOperationRemove = {
  op: 'remove',
  id: string,
};

export type WebhookResponseOperation =
  | WebhookResponseOperationReplace
  | WebhookResponseOperationAdd
  | WebhookResponseOperationRemove;

export type WebhookResponseMessage = {
  type: 'error' | 'warning' | 'info',
  content: string,
  id: ?string,
};

export type WebhookResponse = {
  +messages: Array<WebhookResponseMessage>,
  +operations?: Array<WebhookResponseOperation>,
};

// https://elis.rossum.ai/api/docs/#datapoint
export type RossumDatapoint = {
  +id: string,
  +type: 'string' | 'number' | 'date' | 'enum' | 'button',
  +rir_field_names?: $ReadOnlyArray<string>,
};

export type RossumPayload = {
  ...
    | {
        +event: 'annotation_content',
        +action: 'initialize' | 'started' | 'user_update' | 'updated' | 'confirm' | 'export',
        +updated_datapoints: $ReadOnlyArray<number>,
      }
    | { +event: 'annotation_status', +action: 'changed' }
    | { +event: 'email', +action: 'received' }
    | { +event: 'invocation', +action: 'scheduled' | 'manual' },
  +annotation: {
    +content: Array<{ ... }>,
  },
  +rossum_authorization_token: string,
  +base_url: string,
  settings: { ... },
};
