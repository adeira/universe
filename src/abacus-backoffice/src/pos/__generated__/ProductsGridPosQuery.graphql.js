/**
 * @generated SignedSource<<efc82d62c9361ebda3fa58c797c7a22a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PriceSortDirection = "HIGH_TO_LOW" | "LOW_TO_HIGH" | "%future added value";
export type SupportedCurrency = "MXN" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsGridPosQuery$variables = {|
  categories?: ?$ReadOnlyArray<string>,
  clientLocale: SupportedLocale,
  priceSortDirection: PriceSortDirection,
|};
export type ProductsGridPosQuery$data = {|
  +commerce: {|
    +products: $ReadOnlyArray<?{|
      +hasSelectedAddons: boolean,
      +id: string,
      +imageCover: ?{|
        +blurhash: string,
        +url: string,
      |},
      +key: string,
      +name: string,
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>,
  |},
|};
export type ProductsGridPosQuery = {|
  response: ProductsGridPosQuery$data,
  variables: ProductsGridPosQuery$variables,
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
    "alias": null,
    "args": null,
    "concreteType": "CommerceQuery",
    "kind": "LinkedField",
    "name": "commerce",
    "plural": false,
    "selections": [
      {
        "alias": "products",
        "args": [
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
          },
          {
            "kind": "Literal",
            "name": "visibility",
            "value": "POS"
          }
        ],
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "searchAllPublishedProducts",
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
            "name": "hasSelectedAddons",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsGridPosQuery",
    "selections": (v3/*: any*/),
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
    "name": "ProductsGridPosQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "dbd5ec9a0c29e37abdd0ea3aca50faaa",
    "id": null,
    "metadata": {},
    "name": "ProductsGridPosQuery",
    "operationKind": "query",
    "text": "query ProductsGridPosQuery($clientLocale:SupportedLocale!,$priceSortDirection:PriceSortDirection!,$categories:[ID!]){commerce{products:searchAllPublishedProducts(clientLocale:$clientLocale,priceSortDirection:$priceSortDirection,categories:$categories,visibility:POS){id,key,name,imageCover{blurhash,url},price{unitAmount,unitAmountCurrency},hasSelectedAddons}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "ee7ac4fa90eea0072e03c41fe566ff9f";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsGridPosQuery$variables,
  ProductsGridPosQuery$data,
>*/);
