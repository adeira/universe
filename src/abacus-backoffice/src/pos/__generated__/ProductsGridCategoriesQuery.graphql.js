/**
 * @generated SignedSource<<d2b0f3ce4879e372ad8a7893400de40a>>
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
  response: ProductsGridCategoriesQuery$data,
  variables: ProductsGridCategoriesQuery$variables,
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
    "cacheID": "0e068203fb7143c9c3e8f345a7e56ed1",
    "id": null,
    "metadata": {},
    "name": "ProductsGridCategoriesQuery",
    "operationKind": "query",
    "text": "query ProductsGridCategoriesQuery($clientLocale:SupportedLocale!){commerce{productCategories:searchAllProductCategories(clientLocale:$clientLocale){id,name}}}"
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
