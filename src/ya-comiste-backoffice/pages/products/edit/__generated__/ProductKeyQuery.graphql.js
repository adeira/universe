/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type EditProductFormFragment$ref = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductKeyQueryVariables = {|
  clientLocale: SupportedLocale,
  productId: string,
|};
export type ProductKeyQueryResponse = {|
  +product: ?{|
    +$fragmentRefs: EditProductFormFragment$ref
  |}
|};
export type ProductKeyQuery = {|
  variables: ProductKeyQueryVariables,
  response: ProductKeyQueryResponse,
|};

/*
query ProductKeyQuery(
  $clientLocale: SupportedLocale!
  $productId: ID!
) {
  product: getProduct(clientLocale: $clientLocale, productId: $productId) {
    ...EditProductFormFragment
    id
  }
}

fragment EditProductFormFragment on Product {
  price {
    unitAmount
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clientLocale"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  },
  {
    "kind": "Variable",
    "name": "productId",
    "variableName": "productId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductKeyQuery",
    "selections": [
      {
        "alias": "product",
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "getProduct",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditProductFormFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductKeyQuery",
    "selections": [
      {
        "alias": "product",
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "getProduct",
        "plural": false,
        "selections": [
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "05bc69b3cdebe4fe8d9ff7d9dd92e53a",
    "id": null,
    "metadata": {},
    "name": "ProductKeyQuery",
    "operationKind": "query",
    "text": "query ProductKeyQuery(\n  $clientLocale: SupportedLocale!\n  $productId: ID!\n) {\n  product: getProduct(clientLocale: $clientLocale, productId: $productId) {\n    ...EditProductFormFragment\n    id\n  }\n}\n\nfragment EditProductFormFragment on Product {\n  price {\n    unitAmount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '612bbc89ceb02936f4e383260a277675';
export default node;
