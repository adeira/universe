/**
 * @flow
 * @relayHash a0a47123d5dc1cb17ff751181571190e
 */

/* eslint-disable */
// flowlint untyped-type-import:off

import type { ConcreteRequest } from 'relay-runtime';
export type useMutationTestMutationVariables = {||};
export type useMutationTestMutationResponse = {|
  +__typename: string
|};
export type useMutationTestMutation = {|
  variables: useMutationTestMutationVariables,
  response: useMutationTestMutationResponse,
|};

/*
mutation useMutationTestMutation {
  __typename
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "__typename",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "useMutationTestMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "useMutationTestMutation",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "useMutationTestMutation",
    "id": null,
    "text": "mutation useMutationTestMutation {\n  __typename\n}\n",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "__typename": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        }
      }
    }
  }
};
})();
// prettier-ignore
(node: any).hash = '694437f71cc6444ecd2349f459c64221';
export default node;
