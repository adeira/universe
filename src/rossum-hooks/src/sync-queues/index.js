// @flow

// TODO: use `node:https` when supported (https://github.com/facebook/flow/issues/9028)
import https from 'https';
// TODO: use `node:url` when supported (https://github.com/facebook/flow/issues/9028)
import { URL } from 'url'; // eslint-disable-line n/prefer-global/url

import type { WebhookResponse } from '../types';

type ParsedBaseUrl = {
  +protocol: string,
  +hostname: string,
  +basePath: string,
};

function parseBaseUrl(baseUrl: string): ParsedBaseUrl {
  const url = new URL(baseUrl);
  const basePath = url.pathname === '/' ? '/api/v1' : url.pathname;
  return {
    protocol: url.protocol,
    hostname: url.hostname,
    basePath: basePath,
  };
}

function httpRequest(options: $FlowFixMe, data: $FlowFixMe = null): Promise<$FlowFixMe> {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(
            new Error(`Request failed with status code ${res.statusCode}: ${res.statusMessage}`),
          );
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

function fetchQueue(
  authToken: string,
  queueId: string | number,
  parsedBaseUrl: ParsedBaseUrl,
): Promise<$FlowFixMe> {
  const options = {
    protocol: parsedBaseUrl.protocol,
    hostname: parsedBaseUrl.hostname,
    path: `${parsedBaseUrl.basePath}/queues/${queueId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return httpRequest(options);
}

function extractSchemaUrl(queue: $FlowFixMe): string {
  return queue.schema;
}

export async function rossum_hook_request_handler({
  rossum_authorization_token,
  base_url,
}: $FlowFixMe): Promise<WebhookResponse> {
  const parsedBaseUrl = parseBaseUrl(base_url);

  const fetchQueueId = 693393; // TODO: make configurable
  const updateQueueIds = [
    824803, // TODO: make configurable
    824948, // TODO: make configurable
  ];

  // Fetch the fetchQueue and extract its schema URL
  const fetchedQueue = await fetchQueue(rossum_authorization_token, fetchQueueId, parsedBaseUrl);
  const fetchSchemaUrl = extractSchemaUrl(fetchedQueue);

  // Fetch the schema
  const fetchSchemaOptions = {
    protocol: parsedBaseUrl.protocol,
    hostname: parsedBaseUrl.hostname,
    path: `${parsedBaseUrl.basePath}/schemas/${fetchSchemaUrl.split('/').pop()}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${rossum_authorization_token}`,
    },
  };
  const fetchedSchema = await httpRequest(fetchSchemaOptions);

  // Fetch the updateQueues and extract their schema URLs
  const updateQueues = await Promise.all(
    updateQueueIds.map((queueId) => fetchQueue(rossum_authorization_token, queueId, parsedBaseUrl)),
  );
  const updateSchemaUrls = updateQueues.map(extractSchemaUrl);

  // Update the other schemas
  const updatePromises = updateSchemaUrls.map((schemaUrl) => {
    const updateSchemaOptions = {
      protocol: parsedBaseUrl.protocol,
      hostname: parsedBaseUrl.hostname,
      path: `${parsedBaseUrl.basePath}/schemas/${schemaUrl.split('/').pop()}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${rossum_authorization_token}`,
        'Content-Type': 'application/json',
      },
    };

    const updateData = JSON.stringify({
      name: fetchedSchema.name,
      content: fetchedSchema.content,
    });

    return httpRequest(updateSchemaOptions, updateData);
  });

  await Promise.all(updatePromises);

  return {
    messages: [],
  };
}
