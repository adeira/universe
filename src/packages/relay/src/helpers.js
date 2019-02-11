// @flow

import type {
  Variables,
  Uploadables,
  CacheConfig,
  RequestNode,
} from './types.flow';

export const isMutation = (request: RequestNode) => {
  return request.operationKind === 'mutation';
};

export const isQuery = (request: RequestNode) => {
  return request.operationKind === 'query';
};

export const forceFetch = (cacheConfig: CacheConfig) => {
  return !!(cacheConfig && cacheConfig.force);
};

export const handleData = (response: {|
  +headers: Headers,
  +json: () => Object,
  +text: () => string,
|}) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return response.text();
};

function getRequestBodyWithUploadables(request, variables, uploadables) {
  const formData = new FormData();
  formData.append('query', request.text);
  formData.append('variables', JSON.stringify(variables));

  Object.keys(uploadables).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });

  return formData;
}

function getRequestBodyWithoutUplodables(request, variables) {
  return JSON.stringify({
    // TODO: fetch persisted queries instead (based on operation.id)
    query: request.text, // GraphQL text from input
    variables,
  });
}

export function getRequestBody(
  request: RequestNode,
  variables: Variables,
  uploadables: ?Uploadables,
) {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }

  return getRequestBodyWithoutUplodables(request, variables);
}

export const getHeaders = (uploadables: ?Uploadables) => {
  if (uploadables) {
    return {
      Accept: '*/*',
    };
  }

  return {
    Accept: 'application/json',
    'Content-type': 'application/json',
  };
};
