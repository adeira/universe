/**
 * @generated SignedSource<<2627a9bcd99d783f096d728c9cb0b717>>
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
  response: ProductCategoriesListQuery$data,
  variables: ProductCategoriesListQuery$variables,
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
    "cacheID": "2673b875bbb933fa48980988beaf9600",
    "id": null,
    "metadata": {},
    "name": "ProductCategoriesListQuery",
    "operationKind": "query",
    "text": "query ProductCategoriesListQuery($clientLocale:SupportedLocale!){commerce{categories:searchAllProductCategories(clientLocale:$clientLocale){id,name}}}"
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
