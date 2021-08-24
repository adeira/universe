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
    ...ProductFormCategoriesData
    id
  }
  productAddons: searchAllProductAddons(clientLocale: $clientLocale) {
    ...ProductFormAddonsData
    id
  }
}

fragment ProductFormAddonsData on ProductAddon {
  id
  name
  priceExtra {
    unitAmount
    unitAmountCurrency
  }
}

fragment ProductFormCategoriesData on ProductCategory {
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
],
v1 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
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
            "args": (v1/*: any*/),
            "concreteType": "ProductCategory",
            "kind": "LinkedField",
            "name": "searchAllProductCategories",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "productAddons",
            "args": (v1/*: any*/),
            "concreteType": "ProductAddon",
            "kind": "LinkedField",
            "name": "searchAllProductAddons",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
                "kind": "LinkedField",
                "name": "priceExtra",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unitAmount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unitAmountCurrency",
                    "storageKey": null
                  }
                ],
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
    "cacheID": "f739a813949dc81d25ed314a8d6853c3",
    "id": null,
    "metadata": {},
    "name": "ProductsCreateLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsCreateLayoutQuery(\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    ...ProductCreateFormData\n  }\n}\n\nfragment ProductCreateFormData on CommerceQuery {\n  productCategories: searchAllProductCategories(clientLocale: $clientLocale) {\n    ...ProductFormCategoriesData\n    id\n  }\n  productAddons: searchAllProductAddons(clientLocale: $clientLocale) {\n    ...ProductFormAddonsData\n    id\n  }\n}\n\nfragment ProductFormAddonsData on ProductAddon {\n  id\n  name\n  priceExtra {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n\nfragment ProductFormCategoriesData on ProductCategory {\n  id\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '92d67871b187e5ae9ad965b1fea6eac2';
export default node;
