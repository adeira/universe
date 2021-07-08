/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type ProductEditFormData$ref = any;
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductMultilingualInputTranslations = {|
  locale: SupportedLocale,
  name: string,
  description?: ?string,
|};
export type ProductEditFormMutationVariables = {|
  clientLocale: SupportedLocale,
  productKey: string,
  productRevision: string,
  productImagesNames: $ReadOnlyArray<any>,
  productPriceUnitAmount: number,
  translations: $ReadOnlyArray<ProductMultilingualInputTranslations>,
  visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  categories: $ReadOnlyArray<string>,
|};
export type ProductEditFormMutationResponse = {|
  +commerce: {|
    +result: {|
      +__typename: "Product",
      +id: string,
      +name: string,
      +revision: string,
      +$fragmentRefs: ProductEditFormData$ref,
    |} | {|
      +__typename: "ProductError",
      +message: string,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other"
    |}
  |}
|};
export type ProductEditFormMutation = {|
  variables: ProductEditFormMutationVariables,
  response: ProductEditFormMutationResponse,
|};

/*
mutation ProductEditFormMutation(
  $clientLocale: SupportedLocale!
  $productKey: ID!
  $productRevision: ID!
  $productImagesNames: [ProductImageUploadable!]!
  $productPriceUnitAmount: Int!
  $translations: [ProductMultilingualInputTranslations!]!
  $visibility: [ProductMultilingualInputVisibility!]!
  $categories: [ID!]!
) {
  commerce {
    result: productUpdate(clientLocale: $clientLocale, productKey: $productKey, productRevision: $productRevision, productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility, categories: $categories}) {
      __typename
      ... on Product {
        __typename
        id
        name
        revision
        ...ProductEditFormData
      }
      ... on ProductError {
        __typename
        message
      }
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

fragment ProductFormData on ProductCategory {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categories"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clientLocale"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productImagesNames"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productKey"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productPriceUnitAmount"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productRevision"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "translations"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visibility"
},
v8 = {
  "kind": "Variable",
  "name": "clientLocale",
  "variableName": "clientLocale"
},
v9 = [
  (v8/*: any*/),
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "categories",
        "variableName": "categories"
      },
      {
        "kind": "Variable",
        "name": "images",
        "variableName": "productImagesNames"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "unitAmount",
            "variableName": "productPriceUnitAmount"
          },
          {
            "kind": "Literal",
            "name": "unitAmountCurrency",
            "value": "MXN"
          }
        ],
        "kind": "ObjectValue",
        "name": "price"
      },
      {
        "kind": "Variable",
        "name": "translations",
        "variableName": "translations"
      },
      {
        "kind": "Variable",
        "name": "visibility",
        "variableName": "visibility"
      }
    ],
    "kind": "ObjectValue",
    "name": "productMultilingualInput"
  },
  {
    "kind": "Variable",
    "name": "productRevision",
    "variableName": "productRevision"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "revision",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v15 = [
  (v8/*: any*/)
],
v16 = [
  (v12/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductEditFormMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommerceMutation",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
        "selections": [
          {
            "alias": "result",
            "args": (v9/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUpdate",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ProductEditFormData"
                  }
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/),
                  (v14/*: any*/)
                ],
                "type": "ProductError",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProductEditFormMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommerceMutation",
        "kind": "LinkedField",
        "name": "commerce",
        "plural": false,
        "selections": [
          {
            "alias": "result",
            "args": (v9/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUpdate",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v15/*: any*/),
                    "concreteType": "ProductCategory",
                    "kind": "LinkedField",
                    "name": "availableCategories",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v12/*: any*/)
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
                    "args": (v15/*: any*/),
                    "concreteType": "ProductCategory",
                    "kind": "LinkedField",
                    "name": "selectedCategories",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/)
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
                    "selections": (v16/*: any*/),
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
                    "selections": (v16/*: any*/),
                    "storageKey": "translation(locale:\"es_MX\")"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "images",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v14/*: any*/)
                ],
                "type": "ProductError",
                "abstractKey": null
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
    "cacheID": "fa8b4a1ca541bd7aec3013522250c8d0",
    "id": null,
    "metadata": {},
    "name": "ProductEditFormMutation",
    "operationKind": "mutation",
    "text": "mutation ProductEditFormMutation(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n  $productRevision: ID!\n  $productImagesNames: [ProductImageUploadable!]!\n  $productPriceUnitAmount: Int!\n  $translations: [ProductMultilingualInputTranslations!]!\n  $visibility: [ProductMultilingualInputVisibility!]!\n  $categories: [ID!]!\n) {\n  commerce {\n    result: productUpdate(clientLocale: $clientLocale, productKey: $productKey, productRevision: $productRevision, productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility, categories: $categories}) {\n      __typename\n      ... on Product {\n        __typename\n        id\n        name\n        revision\n        ...ProductEditFormData\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n\nfragment ProductEditFormData on Product {\n  key\n  revision\n  availableCategories(clientLocale: $clientLocale) {\n    ...ProductFormData\n    id\n  }\n  price {\n    unitAmount\n  }\n  selectedCategories(clientLocale: $clientLocale) {\n    id\n  }\n  visibility\n  enTranslation: translation(locale: en_US) {\n    name\n    description\n  }\n  esTranslation: translation(locale: es_MX) {\n    name\n    description\n  }\n  images {\n    name\n  }\n}\n\nfragment ProductFormData on ProductCategory {\n  id\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '000c9aa4b4b7322e2b53dbb8d8453f14';
export default node;
