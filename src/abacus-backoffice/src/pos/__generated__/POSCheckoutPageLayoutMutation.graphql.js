/**
 * @generated SignedSource<<2832bce7e6916f8163edf4d0114d6c42>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler-experimental
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type PosCheckoutProductInput = {|
  productKey: string,
  productUnits: number,
  productPriceUnitAmount: number,
  productPriceUnitAmountCurrency: SupportedCurrency,
|};
export type POSCheckoutPageLayoutMutationVariables = {|
  checkoutInput: $ReadOnlyArray<PosCheckoutProductInput>,
|};
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
      +__typename: "%other",
    |},
  |},
|};
export type POSCheckoutPageLayoutMutation = {|
  variables: POSCheckoutPageLayoutMutationVariables,
  response: POSCheckoutPageLayoutMutationResponse,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "checkoutInput"
  }
],
v1 = [
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
            "fields": [
              {
                "kind": "Variable",
                "name": "selectedProducts",
                "variableName": "checkoutInput"
              }
            ],
            "kind": "ObjectValue",
            "name": "input"
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
    "name": "POSCheckoutPageLayoutMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "POSCheckoutPageLayoutMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6bfc6efa2217519c7fb6660b9ade4806",
    "id": null,
    "metadata": {},
    "name": "POSCheckoutPageLayoutMutation",
    "operationKind": "mutation",
    "text": "mutation POSCheckoutPageLayoutMutation(\n  $checkoutInput: [PosCheckoutProductInput!]!\n) {\n  pos {\n    checkout(input: {selectedProducts: $checkoutInput}) {\n      __typename\n      ... on PosCheckoutPayload {\n        id\n      }\n      ... on PosCheckoutError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "62625f93bb702c890c5f3d38d652d255";
}

module.exports = node;
