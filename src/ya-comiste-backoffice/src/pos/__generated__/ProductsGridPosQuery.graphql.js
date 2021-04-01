/**
 * @generated SignedSource<<4b39f4d6c0aa21d2325f8a6b7478a9f2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: yarn workspace @adeira/ya-comiste-backoffice relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type ProductsGridPosQueryVariables = {||};
export type ProductsGridPosQueryResponse = {|
  +pos: {|
    +products: ?$ReadOnlyArray<?{|
      +id: string,
      +key: string,
      +name: string,
      +imageCover: ?{|
        +blurhash: string,
      |},
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>,
  |},
|};
export type ProductsGridPosQuery = {|
  variables: ProductsGridPosQueryVariables,
  response: ProductsGridPosQueryResponse,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "POSQuery",
    "kind": "LinkedField",
    "name": "pos",
    "plural": false,
    "selections": [
      {
        "alias": "products",
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "listPublishedProducts",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "key",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "imageCover",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "blurhash",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductPrice",
            "kind": "LinkedField",
            "name": "price",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmountCurrency",
                "storageKey": null
              }
            ],
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsGridPosQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProductsGridPosQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d8b25d3dae9a306f97e5df7804ea784f",
    "id": null,
    "metadata": {},
    "name": "ProductsGridPosQuery",
    "operationKind": "query",
    "text": "query ProductsGridPosQuery {\n  pos {\n    products: listPublishedProducts {\n      id\n      key\n      name\n      imageCover {\n        blurhash\n      }\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "9dd37e933f4a5700a633433087397030";
}

module.exports = node;
