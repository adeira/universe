/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type StoredOperationInput = {|
  operationId: string,
  text: string,
|};
export type databasePersistFunctionMutationVariables = {|
  input: $ReadOnlyArray<StoredOperationInput>
|};
export type databasePersistFunctionMutationResponse = {|
  +createStoredOperations: ?{|
    +createdOperations: ?$ReadOnlyArray<?{|
      +operationId: ?string,
      +text: ?string,
    |}>
  |}
|};
export type databasePersistFunctionMutation = {|
  variables: databasePersistFunctionMutationVariables,
  response: databasePersistFunctionMutationResponse,
|};

/*
mutation databasePersistFunctionMutation(
  $input: [StoredOperationInput!]!
) {
  createStoredOperations(persistedOperations: $input) {
    createdOperations {
      operationId
      text
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "persistedOperations",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateStoredOperation",
    "kind": "LinkedField",
    "name": "createStoredOperations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "StoredOperation",
        "kind": "LinkedField",
        "name": "createdOperations",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "operationId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "databasePersistFunctionMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "databasePersistFunctionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "82a9cf46d8ff437d0ecb66327b30d997",
    "id": null,
    "metadata": {},
    "name": "databasePersistFunctionMutation",
    "operationKind": "mutation",
    "text": "mutation databasePersistFunctionMutation(\n  $input: [StoredOperationInput!]!\n) {\n  createStoredOperations(persistedOperations: $input) {\n    createdOperations {\n      operationId\n      text\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ee85c20e320eb2c7d12fc9fcc99334f3';
export default node;
