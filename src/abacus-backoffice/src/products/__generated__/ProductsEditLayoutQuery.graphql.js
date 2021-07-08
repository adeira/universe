/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type ProductEditFormData$ref = any;
type ProductEditHeading$ref = any;
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsEditLayoutQueryVariables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductsEditLayoutQueryResponse = {|
  +commerce: {|
    +product: {|
      +images: $ReadOnlyArray<{|
        +name: string,
        +blurhash: string,
        +url: string,
      |}>,
      +$fragmentRefs: ProductEditHeading$ref & ProductEditFormData$ref,
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
      ...ProductEditHeading
      images {
        name
        blurhash
        url
      }
      ...ProductEditFormData
      id
    }
  }
}

fragment ProductEditFormData on Product {
  key
  revision
  availableCategories(clientLocale: $clientLocale) {
    ...ProductFormData
    id
  }
  price {
    unitAmount
  }
  selectedCategories(clientLocale: $clientLocale) {
    id
  }
  visibility
  enTranslation: translation(locale: en_US) {
    name
    description
  }
  esTranslation: translation(locale: es_MX) {
    name
    description
  }
  images {
    name
  }
}

fragment ProductEditHeading on Product {
  key
  name
  isPublished
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productKey"
  }
],
v1 = {
  "kind": "Variable",
  "name": "clientLocale",
  "variableName": "clientLocale"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "images",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blurhash",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  (v1/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "description",
    "storageKey": null
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
            "args": (v2/*: any*/),
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "getUnpublishedProductByKey",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProductEditHeading"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProductEditFormData"
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
            "args": (v2/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPublished",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "revision",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "ProductCategory",
                "kind": "LinkedField",
                "name": "availableCategories",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
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
                "args": (v5/*: any*/),
                "concreteType": "ProductCategory",
                "kind": "LinkedField",
                "name": "selectedCategories",
                "plural": true,
                "selections": [
                  (v6/*: any*/)
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
                "alias": "enTranslation",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "locale",
                    "value": "en_US"
                  }
                ],
                "concreteType": "ProductMultilingualTranslations",
                "kind": "LinkedField",
                "name": "translation",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": "translation(locale:\"en_US\")"
              },
              {
                "alias": "esTranslation",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "locale",
                    "value": "es_MX"
                  }
                ],
                "concreteType": "ProductMultilingualTranslations",
                "kind": "LinkedField",
                "name": "translation",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": "translation(locale:\"es_MX\")"
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dcaead0cf6fade07aaf79cea88c48696",
    "id": null,
    "metadata": {},
    "name": "ProductsEditLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsEditLayoutQuery(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n) {\n  commerce {\n    product: getUnpublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {\n      ...ProductEditHeading\n      images {\n        name\n        blurhash\n        url\n      }\n      ...ProductEditFormData\n      id\n    }\n  }\n}\n\nfragment ProductEditFormData on Product {\n  key\n  revision\n  availableCategories(clientLocale: $clientLocale) {\n    ...ProductFormData\n    id\n  }\n  price {\n    unitAmount\n  }\n  selectedCategories(clientLocale: $clientLocale) {\n    id\n  }\n  visibility\n  enTranslation: translation(locale: en_US) {\n    name\n    description\n  }\n  esTranslation: translation(locale: es_MX) {\n    name\n    description\n  }\n  images {\n    name\n  }\n}\n\nfragment ProductEditHeading on Product {\n  key\n  name\n  isPublished\n}\n\nfragment ProductFormData on ProductCategory {\n  id\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'a0bfb0ff14c17bd91dd157d472cab49e';
export default node;
