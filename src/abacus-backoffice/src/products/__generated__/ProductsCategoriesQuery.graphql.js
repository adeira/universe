/**
 * @generated SignedSource<<abf2a6ac977c6fe67a749f43cda4d03e>>
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
  response: ProductsCategoriesQuery$data,
  variables: ProductsCategoriesQuery$variables,
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
    "cacheID": "f9cf395e3bf56c7d2c1e10ad4aba4a5d",
    "id": null,
    "metadata": {},
    "name": "ProductsCategoriesQuery",
    "operationKind": "query",
    "text": "query ProductsCategoriesQuery($clientLocale:SupportedLocale!){commerce{productCategories:searchAllProductCategories(clientLocale:$clientLocale){id,name}}}"
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
