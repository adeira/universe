/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductMultilingualInputTranslations = {|
  locale: SupportedLocale,
  name?: ?string,
  description?: ?string,
|};
export type createProductCreateMutationVariables = {|
  productImagesNames: $ReadOnlyArray<any>,
  productPriceUnitAmount: number,
  translations: $ReadOnlyArray<ProductMultilingualInputTranslations>,
  visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
|};
export type createProductCreateMutationResponse = {|
  +productCreate: {|
    +__typename: "Product"
  |} | {|
    +__typename: "ProductError",
    +message: string,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other"
  |}
|};
export type createProductCreateMutation = {|
  variables: createProductCreateMutationVariables,
  response: createProductCreateMutationResponse,
|};

/*
mutation createProductCreateMutation(
  $productImagesNames: [ProductImageUploadable!]!
  $productPriceUnitAmount: Int!
  $translations: [ProductMultilingualInputTranslations!]!
  $visibility: [ProductMultilingualInputVisibility!]!
) {
  productCreate(productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility}) {
    __typename
    ... on Product {
      __typename
    }
    ... on ProductError {
      __typename
      message
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productImagesNames"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productPriceUnitAmount"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "translations"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "visibility"
  }
],
v1 = [
  {
    "fields": [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createProductCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "productCreate",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/)
            ],
            "type": "Product",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "type": "ProductError",
            "abstractKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createProductCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "productCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "ProductError",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1cb857db0f1fa777d56f28627ef00995",
    "id": null,
    "metadata": {},
    "name": "createProductCreateMutation",
    "operationKind": "mutation",
    "text": "mutation createProductCreateMutation(\n  $productImagesNames: [ProductImageUploadable!]!\n  $productPriceUnitAmount: Int!\n  $translations: [ProductMultilingualInputTranslations!]!\n  $visibility: [ProductMultilingualInputVisibility!]!\n) {\n  productCreate(productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility}) {\n    __typename\n    ... on Product {\n      __typename\n    }\n    ... on ProductError {\n      __typename\n      message\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5d1e75dafe89b3d98d20090d5f680682';
export default node;
