/**
 * @flow
 * @relayHash 20397bde88ca14fac97532f7e40772ee
 */

/* eslint-disable */
// flowlint untyped-type-import:off

import type { ConcreteRequest } from 'relay-runtime';
export type useMutationMutationVariables = {||};
export type useMutationMutationResponse = {|
  +__typename: string
|};
export type useMutationMutation = {|
  variables: useMutationMutationVariables,
  response: useMutationMutationResponse,
|};

/*
mutation useMutationMutation {
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
    "name": "useMutationMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "useMutationMutation",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "useMutationMutation",
    "id": null,
    "text": "mutation useMutationMutation {\n  __typename\n}\n",
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
(node: any).hash = 'f6e3cb8144fd79e69d57471f6f533008';
export default node;
