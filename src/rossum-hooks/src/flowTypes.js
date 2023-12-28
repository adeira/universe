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

export type WebhookResponseAutomationBlocker = {
  id: string,
  content: string,
};

export type WebhookPayload<WebhookSettings = {}> = {
  // TODO: extend with other fields
  +annotation: {
    +content: $ReadOnlyArray<$FlowFixMe>,
    +document: string,
    +id: number,
    +queue: string,
    +relations: $ReadOnlyArray<string>,
    +schema: string,
    +url: string,
  },
  +base_url: string,
  +document: {
    +id: number,
    +s3_name: string,
    +url: string,
  },
  +request_id: string,
  +rossum_authorization_token?: string,
  +settings: WebhookSettings,
};

export type WebhookResponse = {
  +messages: Array<WebhookResponseMessage>,
  +operations?: Array<WebhookResponseOperation>,
  +automation_blockers?: Array<WebhookResponseAutomationBlocker>,
};

// https://elis.rossum.ai/api/docs/#datapoint
export type RossumDatapoint = {
  +id: string,
  +type: 'string' | 'number' | 'date' | 'enum' | 'button',
  +rir_field_names?: $ReadOnlyArray<string>,
};
