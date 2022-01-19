/**
 * @generated SignedSource<<2c678555dc4772ea6966219d3143ecbe>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x run relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type ProductEditFormData$fragmentType = any;
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductMultilingualInputTranslations = {|
  locale: SupportedLocale,
  name: string,
  description?: ?string,
|};
export type ProductEditFormMutation$variables = {|
  clientLocale: SupportedLocale,
  productKey: string,
  productRevision: string,
  productImagesNames: $ReadOnlyArray<string>,
  productPriceUnitAmount: number,
  translations: $ReadOnlyArray<ProductMultilingualInputTranslations>,
  visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  categories: $ReadOnlyArray<string>,
  addons: $ReadOnlyArray<string>,
|};
export type ProductEditFormMutation$data = {|
  +commerce: {|
    +result: {|
      +__typename: "Product",
      +id: string,
      +name: string,
      +revision: string,
      +$fragmentSpreads: ProductEditFormData$fragmentType,
    |} | {|
      +__typename: "ProductError",
      +message: string,
    |} | {|
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      +__typename: "%other",
    |},
  |},
|};
export type ProductEditFormMutation = {|
  variables: ProductEditFormMutation$variables,
  response: ProductEditFormMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "addons"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categories"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clientLocale"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productImagesNames"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productKey"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productPriceUnitAmount"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productRevision"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "translations"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visibility"
},
v9 = {
  "kind": "Variable",
  "name": "clientLocale",
  "variableName": "clientLocale"
},
v10 = [
  (v9/*: any*/),
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "addons",
        "variableName": "addons"
      },
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "revision",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v16 = [
  (v9/*: any*/)
],
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unitAmount",
  "storageKey": null
},
v18 = [
  (v12/*: any*/)
],
v19 = [
  (v13/*: any*/),
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
      (v7/*: any*/),
      (v8/*: any*/)
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
            "args": (v10/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUpdate",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
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
                  (v11/*: any*/),
                  (v15/*: any*/)
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
      (v2/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v1/*: any*/),
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
            "args": (v10/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUpdate",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v16/*: any*/),
                    "concreteType": "ProductCategory",
                    "kind": "LinkedField",
                    "name": "availableCategories",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v16/*: any*/),
                    "concreteType": "ProductAddon",
                    "kind": "LinkedField",
                    "name": "availableAddons",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Price",
                        "kind": "LinkedField",
                        "name": "priceExtra",
                        "plural": false,
                        "selections": [
                          (v17/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "price",
                    "plural": false,
                    "selections": [
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v16/*: any*/),
                    "concreteType": "ProductCategory",
                    "kind": "LinkedField",
                    "name": "selectedCategories",
                    "plural": true,
                    "selections": (v18/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v16/*: any*/),
                    "concreteType": "ProductAddon",
                    "kind": "LinkedField",
                    "name": "selectedAddons",
                    "plural": true,
                    "selections": (v18/*: any*/),
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
                    "selections": (v19/*: any*/),
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
                    "selections": (v19/*: any*/),
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
                      (v13/*: any*/)
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
                  (v15/*: any*/)
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
    "cacheID": "c281d9fc599790dbce7b4224e4071039",
    "id": null,
    "metadata": {},
    "name": "ProductEditFormMutation",
    "operationKind": "mutation",
    "text": "mutation ProductEditFormMutation(\n  $clientLocale: SupportedLocale!\n  $productKey: ID!\n  $productRevision: ID!\n  $productImagesNames: [ProductImageUploadable!]!\n  $productPriceUnitAmount: Int!\n  $translations: [ProductMultilingualInputTranslations!]!\n  $visibility: [ProductMultilingualInputVisibility!]!\n  $categories: [ID!]!\n  $addons: [ID!]!\n) {\n  commerce {\n    result: productUpdate(clientLocale: $clientLocale, productKey: $productKey, productRevision: $productRevision, productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility, categories: $categories, addons: $addons}) {\n      __typename\n      ... on Product {\n        __typename\n        id\n        name\n        revision\n        ...ProductEditFormData\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n\nfragment ProductEditFormData on Product {\n  key\n  revision\n  availableCategories(clientLocale: $clientLocale) {\n    ...ProductFormCategoriesData\n    id\n  }\n  availableAddons(clientLocale: $clientLocale) {\n    ...ProductFormAddonsData\n    id\n  }\n  price {\n    unitAmount\n  }\n  selectedCategories(clientLocale: $clientLocale) {\n    id\n  }\n  selectedAddons(clientLocale: $clientLocale) {\n    id\n  }\n  visibility\n  enTranslation: translation(locale: en_US) {\n    name\n    description\n  }\n  esTranslation: translation(locale: es_MX) {\n    name\n    description\n  }\n  images {\n    name\n  }\n}\n\nfragment ProductFormAddonsData on ProductAddon {\n  id\n  name\n  priceExtra {\n    unitAmount\n    unitAmountCurrency\n  }\n}\n\nfragment ProductFormCategoriesData on ProductCategory {\n  id\n  name\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "5ea7f8b50995909c30fb798b4847a574";
}

module.exports = ((node/*: any*/)/*: Mutation<
  ProductEditFormMutation$variables,
  ProductEditFormMutation$data,
>*/);
