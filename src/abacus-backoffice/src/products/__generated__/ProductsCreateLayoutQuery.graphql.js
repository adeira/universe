/**
 * @generated SignedSource<<7544de7ca6a66fa103a0bb0a2f66d8d3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProductCreateFormData$fragmentType } from "./ProductCreateFormData.graphql";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCreateLayoutQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type ProductsCreateLayoutQuery$data = {|
  +commerce: {|
    +$fragmentSpreads: ProductCreateFormData$fragmentType,
  |},
|};
export type ProductsCreateLayoutQuery = {|
  response: ProductsCreateLayoutQuery$data,
  variables: ProductsCreateLayoutQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clientLocale"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsCreateLayoutQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProductCreateFormData"
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
    "name": "ProductsCreateLayoutQuery",
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
            "alias": "productCategories",
            "args": [
              {
                "kind": "Variable",
                "name": "clientLocale",
                "variableName": "clientLocale"
              }
            ],
            "concreteType": "ProductCategory",
            "kind": "LinkedField",
            "name": "searchAllProductCategories",
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
                "name": "name",
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
    "cacheID": "263ea7e228a4663d11b81938fa1d49f6",
    "id": null,
    "metadata": {},
    "name": "ProductsCreateLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsCreateLayoutQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    ...ProductCreateFormData\n  }\n}\n\nfragment ProductCreateFormData on CommerceQuery {\n  productCategories: searchAllProductCategories(clientLocale: $clientLocale) {\n    ...ProductFormCategoriesData\n    id\n  }\n}\n\nfragment ProductFormCategoriesData on ProductCategory {\n  id\n  name\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "92d67871b187e5ae9ad965b1fea6eac2";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsCreateLayoutQuery$variables,
  ProductsCreateLayoutQuery$data,
>*/);
