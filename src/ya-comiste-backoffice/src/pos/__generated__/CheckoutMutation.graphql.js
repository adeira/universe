/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutMutationVariables = {||};
export type CheckoutMutationResponse = {|
  +pos: {|
    +checkout: {|
      +__typename: "PosCheckoutPayload",
      +id: string,
    |} | {|
      +__typename: "PosCheckoutError",
      +message: string,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other"
    |}
  |}
|};
export type CheckoutMutation = {|
  variables: CheckoutMutationVariables,
  response: CheckoutMutationResponse,
|};

/*
mutation CheckoutMutation {
  pos {
    checkout {
      __typename
      ... on PosCheckoutPayload {
        id
      }
      ... on PosCheckoutError {
        message
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "POSMutation",
    "kind": "LinkedField",
    "name": "pos",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "checkout",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "type": "PosCheckoutPayload",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "message",
                "storageKey": null
              }
            ],
            "type": "PosCheckoutError",
            "abstractKey": null
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CheckoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CheckoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "dcd642327774268176dc053cf6f9a86f",
    "id": null,
    "metadata": {},
    "name": "CheckoutMutation",
    "operationKind": "mutation",
    "text": "mutation CheckoutMutation {\n  pos {\n    checkout {\n      __typename\n      ... on PosCheckoutPayload {\n        id\n      }\n      ... on PosCheckoutError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '2de5122ab060dbd431dcbaf413ddc81b';
export default node;
