/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type ProductsCardsData$ref = any;
export type PriceSortDirection = "HIGH_TO_LOW" | "LOW_TO_HIGH" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCardsInCategoryQueryVariables = {|
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
  categories?: ?$ReadOnlyArray<string>,
|};
export type ProductsCardsInCategoryQueryResponse = {|
  +commerce: {|
    +products: $ReadOnlyArray<?{|
      +$fragmentRefs: ProductsCardsData$ref
    |}>
  |}
|};
export type ProductsCardsInCategoryQuery = {|
  variables: ProductsCardsInCategoryQueryVariables,
  response: ProductsCardsInCategoryQueryResponse,
|};

/*
query ProductsCardsInCategoryQuery(
  $clientLocale: SupportedLocale!
  $priceSortDirection: PriceSortDirection!
  $categories: [ID!]
) {
  commerce {
    products: searchAllProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, categories: $categories) {
      ...ProductsCardsData
      id
    }
  }
}

fragment ProductsCardsData on Product {
  id
  key
  name
  imageCover {
    blurhash
    url
  }
  price {
    unitAmount
    unitAmountCurrency
  }
  isPublished
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categories"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clientLocale"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priceSortDirection"
},
v3 = [
  {
    "kind": "Variable",
    "name": "categories",
    "variableName": "categories"
  },
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  },
  {
    "kind": "Variable",
    "name": "priceSortDirection",
    "variableName": "priceSortDirection"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsCardsInCategoryQuery",
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
            "alias": "products",
            "args": (v3/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "searchAllProducts",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProductsCardsData"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProductsCardsInCategoryQuery",
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
            "alias": "products",
            "args": (v3/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "searchAllProducts",
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPublished",
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
    "cacheID": "8e52fb89730c10f7751c8a4d5b05bb0a",
    "id": null,
    "metadata": {},
    "name": "ProductsCardsInCategoryQuery",
    "operationKind": "query",
    "text": "query ProductsCardsInCategoryQuery(\n  $clientLocale: SupportedLocale!\n  $priceSortDirection: PriceSortDirection!\n  $categories: [ID!]\n) {\n  commerce {\n    products: searchAllProducts(clientLocale: $clientLocale, priceSortDirection: $priceSortDirection, categories: $categories) {\n      ...ProductsCardsData\n      id\n    }\n  }\n}\n\nfragment ProductsCardsData on Product {\n  id\n  key\n  name\n  imageCover {\n    blurhash\n    url\n  }\n  price {\n    unitAmount\n    unitAmountCurrency\n  }\n  isPublished\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '1fb8a914e7bbc4c6535f25b4f592cb12';
export default node;
