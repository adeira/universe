/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCategoriesQueryVariables = {|
  clientLocale: SupportedLocale
|};
export type ProductsCategoriesQueryResponse = {|
  +commerce: {|
    +productCategories: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
    |}>
  |}
|};
export type ProductsCategoriesQuery = {|
  variables: ProductsCategoriesQueryVariables,
  response: ProductsCategoriesQueryResponse,
|};

/*
query ProductsCategoriesQuery(
  $clientLocale: SupportedLocale!
) {
  commerce {
    productCategories: searchAllProductCategories(clientLocale: $clientLocale) {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
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
// prettier-ignore
(node: any).hash = 'cf82629107f79add52f01d591e0da585';
export default node;
