/**
 * @generated SignedSource<<d1b05f69eae97b92242bfd6367dddde7>>
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
    "cacheID": "618d03c0f24b7ad1ed034b274e5dcfe1",
    "id": null,
    "metadata": {},
    "name": "ProductsCreateLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsCreateLayoutQuery($clientLocale:SupportedLocale!){commerce{...ProductCreateFormData}}fragment ProductCreateFormData on CommerceQuery{productCategories:searchAllProductCategories(clientLocale:$clientLocale){...ProductFormCategoriesData,id}}fragment ProductFormCategoriesData on ProductCategory{id,name}"
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
