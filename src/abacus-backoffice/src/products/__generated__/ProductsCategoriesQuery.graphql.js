/**
 * @generated SignedSource<<f53014e7ab8521d3a25c76fb7ec315cc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCategoriesQuery$variables = {|
  clientLocale: SupportedLocale,
|};
export type ProductsCategoriesQuery$data = {|
  +commerce: {|
    +productCategories: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
    |}>,
  |},
|};
export type ProductsCategoriesQuery = {|
  variables: ProductsCategoriesQuery$variables,
  response: ProductsCategoriesQuery$data,
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
    "name": "ProductsCategoriesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductsCategoriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2ea44a29e9517150531b3c8a09563b37",
    "id": null,
    "metadata": {},
    "name": "ProductsCategoriesQuery",
    "operationKind": "query",
    "text": "query ProductsCategoriesQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    productCategories: searchAllProductCategories(clientLocale: $clientLocale) {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "cf82629107f79add52f01d591e0da585";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsCategoriesQuery$variables,
  ProductsCategoriesQuery$data,
>*/);
