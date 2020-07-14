/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type StoredOperationInput = {|
  operationId: string,
  text: string,
|};
export type useMutationTestMutationVariables = {|
  persistedOperations: $ReadOnlyArray<StoredOperationInput>
|};
export type useMutationTestMutationResponse = {|
  +createStoredOperations: ?{|
    +__typename: string
  |}
|};
export type useMutationTestMutation = {|
  variables: useMutationTestMutationVariables,
  response: useMutationTestMutationResponse,
|};

/*
mutation useMutationTestMutation(
  $persistedOperations: [StoredOperationInput!]!
) {
  createStoredOperations(persistedOperations: $persistedOperations) {
    __typename
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "persistedOperations"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "persistedOperations",
        "variableName": "persistedOperations"
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
        "kind": "ScalarField",
        "name": "__typename",
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
    "name": "useMutationTestMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMutationTestMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "71add8595c59833765c2923bf59df600",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "createStoredOperations": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreateStoredOperation"
        },
        "createStoredOperations.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "useMutationTestMutation",
    "operationKind": "mutation",
    "text": "mutation useMutationTestMutation(\n  $persistedOperations: [StoredOperationInput!]!\n) {\n  createStoredOperations(persistedOperations: $persistedOperations) {\n    __typename\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '4852841bf3f0a926c710bc2129e8fa4b';
export default node;
