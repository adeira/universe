/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type EditProductFormFragment$ref = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductKeyGetQueryVariables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductKeyGetQueryResponse = {|
  +product: {|
    +key: string,
    +$fragmentRefs: EditProductFormFragment$ref,
  |}
|};
export type ProductKeyGetQuery = {|
  variables: ProductKeyGetQueryVariables,
  response: ProductKeyGetQueryResponse,
|};

/*
query ProductKeyGetQuery(
  $clientLocale: SupportedLocale!
  $productKey: ID!
) {
  product: getProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
    key
    ...EditProductFormFragment
    id
  }
}

fragment EditProductFormFragment on Product {
  revision
  price {
    unitAmount
  }
  visibility
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
    "name": "productKey"
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
    "name": "productKey",
    "variableName": "productKey"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductKeyGetQuery",
    "selections": [
      {
        "alias": "product",
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "getProductByKey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "name": "ProductKeyGetQuery",
    "selections": [
      {
        "alias": "product",
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "getProductByKey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "revision",
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "visibility",
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
    "cacheID": "afd5934821e6653613dca07bfc26f0fa",
    "id": null,
    "metadata": {},
    "name": "ProductKeyGetQuery",
    "operationKind": "query",
    "text": "query ProductKeyGetQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  product: getProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n    key\n    ...EditProductFormFragment\n    id\n  }\n}\n\nfragment EditProductFormFragment on Product {\n  revision\n  price {\n    unitAmount\n  }\n  visibility\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e8a7dc6c2d97aaee20212a3c200245ad';
export default node;
