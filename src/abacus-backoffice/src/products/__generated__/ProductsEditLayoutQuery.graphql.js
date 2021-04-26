/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type EditProductFormFragment$ref = any;
type EditProductHeading$ref = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsEditLayoutQueryVariables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductsEditLayoutQueryResponse = {|
  +commerce: {|
    +product: {|
      +$fragmentRefs: EditProductHeading$ref & EditProductFormFragment$ref
    |}
  |}
|};
export type ProductsEditLayoutQuery = {|
  variables: ProductsEditLayoutQueryVariables,
  response: ProductsEditLayoutQueryResponse,
|};

/*
query ProductsEditLayoutQuery(
  $clientLocale: SupportedLocale!
  $productKey: ID!
) {
  commerce {
    product: getUnpublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
      ...EditProductHeading
      ...EditProductFormFragment
      id
    }
  }
}

fragment EditProductFormFragment on Product {
  key
  revision
  price {
    unitAmount
  }
  visibility
  translations {
    locale
    name
    description
  }
}

fragment EditProductHeading on Product {
  key
  isPublished
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clientLocale"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productKey"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  },
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsEditLayoutQuery",
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
            "alias": "product",
            "args": (v1/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getUnpublishedProductByKey",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditProductHeading"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditProductFormFragment"
              }
            ],
            "storageKey": null
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
    "name": "ProductsEditLayoutQuery",
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
            "alias": "product",
            "args": (v1/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getUnpublishedProductByKey",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "key",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPublished",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "revision",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductPrice",
                "kind": "LinkedField",
                "name": "price",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unitAmount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "visibility",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductMultilingualTranslations",
                "kind": "LinkedField",
                "name": "translations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "locale",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "cacheID": "eace6076c3a436ce4c751a02ab33548e",
    "id": null,
    "metadata": {},
    "name": "ProductsEditLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsEditLayoutQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  commerce {\n    product: getUnpublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n      ...EditProductHeading\n      ...EditProductFormFragment\n      id\n    }\n  }\n}\n\nfragment EditProductFormFragment on Product {\n  key\n  revision\n  price {\n    unitAmount\n  }\n  visibility\n  translations {\n    locale\n    name\n    description\n  }\n}\n\nfragment EditProductHeading on Product {\n  key\n  isPublished\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e824cf1305b11f36c2d5e2f1ac63ad91';
export default node;
