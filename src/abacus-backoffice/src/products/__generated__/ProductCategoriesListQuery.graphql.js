/**
 * @generated SignedSource<<50d52857e4890a3f191f8f8e5e8bed1f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x run relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductCategoriesListQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type ProductCategoriesListQuery$data = {|
  +commerce: {|
    +categories: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
    |}>,
  |},
|};
export type ProductCategoriesListQuery = {|
  variables: ProductCategoriesListQuery$variables,
  response: ProductCategoriesListQuery$data,
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
        "alias": "categories",
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
    "name": "ProductCategoriesListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductCategoriesListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "df442eca349822bf78eb2cc9cf2e77b8",
    "id": null,
    "metadata": {},
    "name": "ProductCategoriesListQuery",
    "operationKind": "query",
    "text": "query ProductCategoriesListQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    categories: searchAllProductCategories(clientLocale: $clientLocale) {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "7316f6f463886f0de452366ff2fc918e";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductCategoriesListQuery$variables,
  ProductCategoriesListQuery$data,
>*/);
