/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type ProductCreateFormData$ref = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsCreateLayoutQueryVariables = {|
  clientLocale: SupportedLocale
|};
export type ProductsCreateLayoutQueryResponse = {|
  +commerce: {|
    +$fragmentRefs: ProductCreateFormData$ref
  |}
|};
export type ProductsCreateLayoutQuery = {|
  variables: ProductsCreateLayoutQueryVariables,
  response: ProductsCreateLayoutQueryResponse,
|};

/*
query ProductsCreateLayoutQuery(
  $clientLocale: SupportedLocale!
) {
  commerce {
    ...ProductCreateFormData
  }
}

fragment ProductCreateFormData on CommerceQuery {
  productCategories: searchAllProductCategories(clientLocale: $clientLocale) {
    ...ProductFormData
    id
  }
}

fragment ProductFormData on ProductCategory {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
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
    "cacheID": "5eb0cf080ea5edf08e41024cef2a0b4a",
    "id": null,
    "metadata": {},
    "name": "ProductsCreateLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsCreateLayoutQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    ...ProductCreateFormData\n  }\n}\n\nfragment ProductCreateFormData on CommerceQuery {\n  productCategories: searchAllProductCategories(clientLocale: $clientLocale) {\n    ...ProductFormData\n    id\n  }\n}\n\nfragment ProductFormData on ProductCategory {\n  id\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '92d67871b187e5ae9ad965b1fea6eac2';
export default node;
