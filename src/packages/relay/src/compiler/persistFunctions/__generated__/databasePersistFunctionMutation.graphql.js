/**
 * @flow
 * @relayHash a38a448b048a0789762ead728b073734
 */

/* eslint-disable */
// flowlint untyped-type-import:off

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
    "kind": "LocalArgument",
    "name": "input",
    "type": "[StoredOperationInput!]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createStoredOperations",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "persistedOperations",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateStoredOperation",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createdOperations",
        "storageKey": null,
        "args": null,
        "concreteType": "StoredOperation",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "operationId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "text",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "databasePersistFunctionMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "databasePersistFunctionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "databasePersistFunctionMutation",
    "id": null,
    "text": "mutation databasePersistFunctionMutation(\n  $input: [StoredOperationInput!]!\n) {\n  createStoredOperations(persistedOperations: $input) {\n    createdOperations {\n      operationId\n      text\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node: any).hash = 'ee85c20e320eb2c7d12fc9fcc99334f3';
export default node;
