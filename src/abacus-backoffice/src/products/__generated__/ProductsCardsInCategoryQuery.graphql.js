/**
 * @generated SignedSource<<920b5fc46579d287619d35b6b0a42e69>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type ProductsCardsData$fragmentType = any;
export type PriceSortDirection = "LOW_TO_HIGH" | "HIGH_TO_LOW" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCardsInCategoryQuery$variables = {|
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
  categories?: ?$ReadOnlyArray<string>,
|};
export type ProductsCardsInCategoryQuery$data = {|
  +commerce: {|
    +products: $ReadOnlyArray<?{|
      +$fragmentSpreads: ProductsCardsData$fragmentType,
    |}>,
  |},
|};
export type ProductsCardsInCategoryQuery = {|
  variables: ProductsCardsInCategoryQuery$variables,
  response: ProductsCardsInCategoryQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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

if (__DEV__) {
  (node/*: any*/).hash = "978767bfb60ad8c2fbe1d8fad793c608";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsCardsInCategoryQuery$variables,
  ProductsCardsInCategoryQuery$data,
>*/);
