'use strict';

var https = require('https');

// 


/**
 * Create a message which will be shown to the user.
 *
 * @param type - the type of the message; errors prevent confirmation in the UI
 * @param content - the message shown to the user
 * @param datapointId - the id of the datapoint where the message will appear (null for "global" messages).
 *
 * Returns the JSON message definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
 */
function createMessage(
  type,
  content,
  datapointId = null,
) {
  return {
    content,
    type,
    id: datapointId,
  };
}

// 




// Technically, this function is similar to `fetch` but there are two main differences:
//
// 1) it uses `https` module from Node.js under the hood (which is required by Rossum API)
// 2) it doesn't return a promise that resolves to a `Response` object but rather to a JSON object (for convenience)
function fetchRossumAPI(
  url,
  options = {},
) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
      (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            // resolve({
            //   ok: true,
            //   status: res.statusCode,
            //   statusText: res.statusMessage,
            //   json: () => Promise.resolve(JSON.parse(body)),
            //   text: () => Promise.resolve(body),
            // });
            resolve(JSON.parse(body));
          } else {
            reject(
              new Error(
                `Request to ${url} failed with status code ${res.statusCode}: ${res.statusMessage} (${body})`,
              ),
            );
          }
        });
      },
    );

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body != null) {
      req.write(options.body);
    }

    req.end();
  });
}

// 


function fetchQueue(
  authToken,
  queueId,
  baseUrl,
) {
  return fetchRossumAPI(`${baseUrl}/queues/${queueId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

function extractSchemaUrl(queue) {
  return queue.schema;
}

async function rossum_hook_request_handler({
  rossum_authorization_token: rossumAuthorizationToken,
  base_url: baseUrl,
}) {
  const fetchQueueId = 693393; // TODO: make configurable
  const updateQueueIds = [
    824803, // TODO: make configurable
    825096, // TODO: make configurable
  ];

  // Fetch the fetchQueue and extract its schema URL
  const fetchedQueue = await fetchQueue(rossumAuthorizationToken, fetchQueueId, baseUrl);
  const fetchSchemaUrl = extractSchemaUrl(fetchedQueue);

  // Fetch the schema
  const fetchedSchema = await fetchRossumAPI(
    `${baseUrl}/schemas/${fetchSchemaUrl.split('/').pop()}`,
    { headers: { Authorization: `Bearer ${rossumAuthorizationToken}` } },
  );

  // Fetch the updateQueues and extract their schema URLs
  const updateQueues = await Promise.all(
    updateQueueIds.map((queueId) => fetchQueue(rossumAuthorizationToken, queueId, baseUrl)),
  );
  const updateSchemaUrls = updateQueues.map(extractSchemaUrl);

  // Update the other schemas
  const updatePromises = updateSchemaUrls.map((schemaUrl) => {
    return fetchRossumAPI(`${baseUrl}/schemas/${schemaUrl.split('/').pop()}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${rossumAuthorizationToken}` },
      body: JSON.stringify({
        name: fetchedSchema.name,
        content: fetchedSchema.content,
      }),
    });
  });

  await Promise.all(updatePromises);

  return {
    messages: [createMessage('info', 'Queues were updated successfully.')],
  };
}

exports.rossum_hook_request_handler = rossum_hook_request_handler;
