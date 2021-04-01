/**
 * @generated SignedSource<<2f995b9fbfd1b7a9aa1e9767a0daea30>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductMultilingualInputTranslations = {|
  locale: SupportedLocale,
  name: string,
  description?: ?string,
|};
export type ProductCreateFormMutation$variables = {|
  clientLocale: SupportedLocale,
  productImagesNames: $ReadOnlyArray<string>,
  productPriceUnitAmount: number,
  translations: $ReadOnlyArray<ProductMultilingualInputTranslations>,
  visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  categories: $ReadOnlyArray<string>,
  addons: $ReadOnlyArray<string>,
|};
export type ProductCreateFormMutationVariables = ProductCreateFormMutation$variables;
export type ProductCreateFormMutation$data = {|
  +commerce: {|
    +result: {|
      +__typename: "Product",
      +name: string,
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
export type ProductCreateFormMutationResponse = ProductCreateFormMutation$data;
export type ProductCreateFormMutation = {|
  variables: ProductCreateFormMutationVariables,
  response: ProductCreateFormMutation$data,
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
  "name": "productPriceUnitAmount"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "translations"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visibility"
},
v7 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
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
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductCreateFormMutation",
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
            "args": (v7/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productCreate",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  (v10/*: any*/)
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
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProductCreateFormMutation",
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
            "args": (v7/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productCreate",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/)
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
    "cacheID": "00c8232f0b57981df0af028b799429d7",
    "id": null,
    "metadata": {},
    "name": "ProductCreateFormMutation",
    "operationKind": "mutation",
    "text": "mutation ProductCreateFormMutation(\n  $clientLocale: SupportedLocale!\n  $productImagesNames: [ProductImageUploadable!]!\n  $productPriceUnitAmount: Int!\n  $translations: [ProductMultilingualInputTranslations!]!\n  $visibility: [ProductMultilingualInputVisibility!]!\n  $categories: [ID!]!\n  $addons: [ID!]!\n) {\n  commerce {\n    result: productCreate(clientLocale: $clientLocale, productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility, categories: $categories, addons: $addons}) {\n      __typename\n      ... on Product {\n        __typename\n        name\n        id\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "5281cea08ca8f73289b8cf2d5ac5af08";
}

module.exports = ((node/*: any*/)/*: Mutation<
  ProductCreateFormMutation$variables,
  ProductCreateFormMutation$data,
>*/);
