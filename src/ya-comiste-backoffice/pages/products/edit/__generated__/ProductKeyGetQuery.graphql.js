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
  +commerce: {|
    +product: {|
      +key: string,
      +$fragmentRefs: EditProductFormFragment$ref,
    |}
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
  commerce {
    product: getProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
      key
      ...EditProductFormFragment
      id
    }
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
        "alias": null,
        "args": null,
        "concreteType": "CommerceQuery",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
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
        "alias": null,
        "args": null,
        "concreteType": "CommerceQuery",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b45ec183b261fd0dc9bd2ea05e83c34",
    "id": null,
    "metadata": {},
    "name": "ProductKeyGetQuery",
    "operationKind": "query",
    "text": "query ProductKeyGetQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  commerce {\n    product: getProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n      key\n      ...EditProductFormFragment\n      id\n    }\n  }\n}\n\nfragment EditProductFormFragment on Product {\n  revision\n  price {\n    unitAmount\n  }\n  visibility\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5dfda432bc7910d7228feef5965298a4';
export default node;
