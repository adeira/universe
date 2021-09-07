// @flow strict-local

import type { UploadableMap, Variables } from 'relay-runtime';

export const isMutation = (request: $FlowFixMe): boolean %checks => {
  return request.operationKind === 'mutation';
};

export const isQuery = (request: $FlowFixMe): boolean %checks => {
  return request.operationKind === 'query';
};

export const forceFetch = (cacheConfig: { +force?: ?boolean }): boolean %checks => {
  return !!(cacheConfig && cacheConfig.force);
};

export const handleData = (response: Response): Promise<$FlowFixMe> | Promise<string> => {
  const contentType = response.headers.get('content-type');
  if (contentType != null && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return response.text();
};

function getRequestBodyWithUploadables(request, variables, uploadables): FormData {
  const formData = new FormData();
  if (__DEV__ && request.text != null) {
    formData.append('query', request.text);
  } else if (request.id != null) {
    formData.append('documentId', request.id);
  } else {
    formData.append('query', request.text);
  }
  formData.append('variables', JSON.stringify(variables));

  Object.keys(uploadables).forEach((key) => {
    /* $FlowFixMe[method-unbinding] This comment suppresses an error when
     * upgrading Flow to version 0.153.0. To see the error delete this comment
     * and run Flow. */
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });

  return formData;
}

function getRequestBodyWithoutUplodables(request, variables): string {
  let body = {};
  if (__DEV__ && request.text != null) {
    body = { query: request.text, variables };
  } else if (request.id != null) {
    body = { documentId: request.id, variables };
  } else {
    body = { query: request.text, variables };
  }
  return JSON.stringify(body);
}

export function getRequestBody(
  request: $FlowFixMe,
  variables: Variables,
  uploadables: ?UploadableMap,
): string | FormData {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }
  return getRequestBodyWithoutUplodables(request, variables);
}

export const getHeaders = (uploadables: ?UploadableMap): { +[string]: string } => {
  if (uploadables) {
    return {
      Accept: '*/*',
    };
  }
  return {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  };
};
