// @flow

// TODO: use `node:https` when supported (https://github.com/facebook/flow/issues/9028)
import https from 'https';

type FetchOptions = {
  body?: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  headers?: FetchOptionsHeaders,
};

type FetchOptionsHeaders = {
  +'Authorization'?: string,
  +'Content-Length'?: string,
  +'Content-Type'?: string,
};

// Technically, this function is similar to `fetch` but there are two main differences:
//
// 1) it uses `https` module from Node.js under the hood (which is required by Rossum API)
// 2) it doesn't return a promise that resolves to a `Response` object but rather to a JSON object (for convenience)
export default function fetchRossumAPI<Response = { ... }>(
  url: string,
  options: FetchOptions = {},
): Promise<Response> {
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
