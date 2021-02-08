/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type ProductMultilingualInputTranslations = {|
  name?: ?string,
  description?: ?string,
|};
export type createProductCreateMutationVariables = {|
  productImagesNames: $ReadOnlyArray<any>,
  productPriceUnitAmount: number,
  enTranslations?: ?ProductMultilingualInputTranslations,
  esTranslations?: ?ProductMultilingualInputTranslations,
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
  $enTranslations: ProductMultilingualInputTranslations
  $esTranslations: ProductMultilingualInputTranslations
) {
  productCreate(productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount}, en_US: $enTranslations, es_MX: $esTranslations}) {
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "enTranslations"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "esTranslations"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productImagesNames"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productPriceUnitAmount"
},
v4 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "en_US",
        "variableName": "enTranslations"
      },
      {
        "kind": "Variable",
        "name": "es_MX",
        "variableName": "esTranslations"
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
          }
        ],
        "kind": "ObjectValue",
        "name": "price"
      }
    ],
    "kind": "ObjectValue",
    "name": "productMultilingualInput"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
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
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "createProductCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "productCreate",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/)
            ],
            "type": "Product",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "createProductCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "productCreate",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v6/*: any*/)
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
    "cacheID": "913784df938577ddc30713c44943bb16",
    "id": null,
    "metadata": {},
    "name": "createProductCreateMutation",
    "operationKind": "mutation",
    "text": "mutation createProductCreateMutation(\n  $productImagesNames: [ProductImageUploadable!]!\n  $productPriceUnitAmount: Int!\n  $enTranslations: ProductMultilingualInputTranslations\n  $esTranslations: ProductMultilingualInputTranslations\n) {\n  productCreate(productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount}, en_US: $enTranslations, es_MX: $esTranslations}) {\n    __typename\n    ... on Product {\n      __typename\n    }\n    ... on ProductError {\n      __typename\n      message\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e40689759fc4cffb4a4726b593f3e122';
export default node;
