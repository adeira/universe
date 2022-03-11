/**
 * @generated SignedSource<<3aa664e01f3dd9533714355c27d08d4a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsGridCategoriesQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type ProductsGridCategoriesQuery$data = {|
  +commerce: {|
    +productCategories: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
    |}>,
  |},
|};
export type ProductsGridCategoriesQuery = {|
  variables: ProductsGridCategoriesQuery$variables,
  response: ProductsGridCategoriesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clientLocale"
  }
],
v1 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsGridCategoriesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductsGridCategoriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8617f3583c098a57d657e584471c3079",
    "id": null,
    "metadata": {},
    "name": "ProductsGridCategoriesQuery",
    "operationKind": "query",
    "text": "query ProductsGridCategoriesQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    productCategories: searchAllProductCategories(clientLocale: $clientLocale) {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "882269418d6d1623202ddefd70071363";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsGridCategoriesQuery$variables,
  ProductsGridCategoriesQuery$data,
>*/);
