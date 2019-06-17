/**
 * @flow
 * @relayHash 1356eb97cb53271ff39b87b7efac4430
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StoredOperationInput = {|
  operationId: string,
  text: string,
|};
export type persistOperationMutationVariables = {|
  input: $ReadOnlyArray<StoredOperationInput>
|};
export type persistOperationMutationResponse = {|
  +createStoredOperations: ?{|
    +createdOperations: ?$ReadOnlyArray<?{|
      +operationId: ?string,
      +text: ?string,
    |}>
  |}
|};
export type persistOperationMutation = {|
  variables: persistOperationMutationVariables,
  response: persistOperationMutationResponse,
|};
*/


/*
mutation persistOperationMutation(
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

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "persistOperationMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "persistOperationMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "persistOperationMutation",
    "id": null,
    "text": "mutation persistOperationMutation(\n  $input: [StoredOperationInput!]!\n) {\n  createStoredOperations(persistedOperations: $input) {\n    createdOperations {\n      operationId\n      text\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '097e8bc9a7513dd82933138677510706';
module.exports = node;
