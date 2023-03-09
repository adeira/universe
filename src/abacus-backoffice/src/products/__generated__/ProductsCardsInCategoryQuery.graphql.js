/**
 * @generated SignedSource<<c13b379bdd79113322a354cc9e45644e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProductsCardsData$fragmentType } from "./ProductsCardsData.graphql";
export type PriceSortDirection = "HIGH_TO_LOW" | "LOW_TO_HIGH" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCardsInCategoryQuery$variables = {|
  categories?: ?$ReadOnlyArray<string>,
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
|};
export type ProductsCardsInCategoryQuery$data = {|
  +commerce: {|
    +products: $ReadOnlyArray<?{|
      +$fragmentSpreads: ProductsCardsData$fragmentType,
    |}>,
  |},
|};
export type ProductsCardsInCategoryQuery = {|
  response: ProductsCardsInCategoryQuery$data,
  variables: ProductsCardsInCategoryQuery$variables,
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
    "cacheID": "ea81d25d3fe28cf65806a538e46a983d",
    "id": null,
    "metadata": {},
    "name": "ProductsCardsInCategoryQuery",
    "operationKind": "query",
    "text": "query ProductsCardsInCategoryQuery($clientLocale:SupportedLocale!,$priceSortDirection:PriceSortDirection!,$categories:[ID!]){commerce{products:searchAllProducts(clientLocale:$clientLocale,priceSortDirection:$priceSortDirection,categories:$categories){...ProductsCardsData,id}}}fragment ProductsCardsData on Product{id,key,name,imageCover{blurhash,url},price{unitAmount,unitAmountCurrency},isPublished}"
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
