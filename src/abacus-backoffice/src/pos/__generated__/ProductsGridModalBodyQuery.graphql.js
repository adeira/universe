/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsGridModalBodyQueryVariables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductsGridModalBodyQueryResponse = {|
  +commerce: {|
    +product: {|
      +name: string,
      +price: {|
        +unitAmount: number
      |},
      +selectedAddons: $ReadOnlyArray<?{|
        +id: string,
        +name: string,
        +priceExtra: {|
          +unitAmount: number,
          +unitAmountCurrency: SupportedCurrency,
        |},
      |}>,
    |}
  |}
|};
export type ProductsGridModalBodyQuery = {|
  variables: ProductsGridModalBodyQueryVariables,
  response: ProductsGridModalBodyQueryResponse,
|};

/*
query ProductsGridModalBodyQuery(
  $clientLocale: SupportedLocale!
  $productKey: ID!
) {
  commerce {
    product: getPublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
      name
      price {
        unitAmount
      }
      selectedAddons(clientLocale: $clientLocale) {
        id
        name
        priceExtra {
          unitAmount
          unitAmountCurrency
        }
      }
      id
    }
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
    "name": "productKey"
  }
],
v1 = {
  "kind": "Variable",
  "name": "clientLocale",
  "variableName": "clientLocale"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unitAmount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Price",
  "kind": "LinkedField",
  "name": "price",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": [
    (v1/*: any*/)
  ],
  "concreteType": "ProductAddon",
  "kind": "LinkedField",
  "name": "selectedAddons",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "priceExtra",
      "plural": false,
      "selections": [
        (v4/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsGridModalBodyQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/)
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
    "name": "ProductsGridModalBodyQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getPublishedProductByKey",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1ce7f10f202450681ffc48611c0b272f",
    "id": null,
    "metadata": {},
    "name": "ProductsGridModalBodyQuery",
    "operationKind": "query",
    "text": "query ProductsGridModalBodyQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  commerce {\n    product: getPublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n      name\n      price {\n        unitAmount\n      }\n      selectedAddons(clientLocale: $clientLocale) {\n        id\n        name\n        priceExtra {\n          unitAmount\n          unitAmountCurrency\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6de4765822d4f76264cde76f74a90a16';
export default node;
