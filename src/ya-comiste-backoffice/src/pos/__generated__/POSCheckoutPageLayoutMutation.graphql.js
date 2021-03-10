/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type POSCheckoutPageLayoutMutationVariables = {||};
export type POSCheckoutPageLayoutMutationResponse = {|
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
export type POSCheckoutPageLayoutMutation = {|
  variables: POSCheckoutPageLayoutMutationVariables,
  response: POSCheckoutPageLayoutMutationResponse,
|};

/*
mutation POSCheckoutPageLayoutMutation {
  pos {
    checkout(input: {selectedProducts: [{productKey: "TODO", productUnits: -1, productPriceUnitAmount: -1, productPriceUnitAmountCurrency: MXN}]}) {
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
        "args": [
          {
            "kind": "Literal",
            "name": "input",
            "value": {
              "selectedProducts": [
                {
                  "productKey": "TODO",
                  "productPriceUnitAmount": -1,
                  "productPriceUnitAmountCurrency": "MXN",
                  "productUnits": -1
                }
              ]
            }
          }
        ],
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
        "storageKey": "checkout(input:{\"selectedProducts\":[{\"productKey\":\"TODO\",\"productPriceUnitAmount\":-1,\"productPriceUnitAmountCurrency\":\"MXN\",\"productUnits\":-1}]})"
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
    "name": "POSCheckoutPageLayoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "POSCheckoutPageLayoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a1a683802929ac840dcd3a93600659d9",
    "id": null,
    "metadata": {},
    "name": "POSCheckoutPageLayoutMutation",
    "operationKind": "mutation",
    "text": "mutation POSCheckoutPageLayoutMutation {\n  pos {\n    checkout(input: {selectedProducts: [{productKey: \"TODO\", productUnits: -1, productPriceUnitAmount: -1, productPriceUnitAmountCurrency: MXN}]}) {\n      __typename\n      ... on PosCheckoutPayload {\n        id\n      }\n      ... on PosCheckoutError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '1bf24e366599f855d11e285c37d7a2e9';
export default node;
