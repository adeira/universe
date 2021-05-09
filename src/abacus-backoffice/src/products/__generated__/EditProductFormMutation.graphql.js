/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type EditProductFormData$ref = any;
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductMultilingualInputTranslations = {|
  locale: SupportedLocale,
  name: string,
  description?: ?string,
|};
export type EditProductFormMutationVariables = {|
  productKey: string,
  productRevision: string,
  productImagesNames: $ReadOnlyArray<any>,
  productPriceUnitAmount: number,
  translations: $ReadOnlyArray<ProductMultilingualInputTranslations>,
  visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
|};
export type EditProductFormMutationResponse = {|
  +commerce: {|
    +result: {|
      +__typename: "Product",
      +id: string,
      +name: string,
      +revision: string,
      +$fragmentRefs: EditProductFormData$ref,
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
export type EditProductFormMutation = {|
  variables: EditProductFormMutationVariables,
  response: EditProductFormMutationResponse,
|};

/*
mutation EditProductFormMutation(
  $productKey: ID!
  $productRevision: ID!
  $productImagesNames: [ProductImageUploadable!]!
  $productPriceUnitAmount: Int!
  $translations: [ProductMultilingualInputTranslations!]!
  $visibility: [ProductMultilingualInputVisibility!]!
) {
  commerce {
    result: productUpdate(productKey: $productKey, productRevision: $productRevision, productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility}) {
      __typename
      ... on Product {
        __typename
        id
        name
        revision
        ...EditProductFormData
      }
      ... on ProductError {
        __typename
        message
      }
    }
  }
}

fragment EditProductFormData on Product {
  key
  revision
  price {
    unitAmount
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productImagesNames"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productKey"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productPriceUnitAmount"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productRevision"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "translations"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visibility"
},
v6 = [
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
  },
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
  },
  {
    "kind": "Variable",
    "name": "productRevision",
    "variableName": "productRevision"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "revision",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v12 = {
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibility",
  "storageKey": null
},
v14 = [
  (v9/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "description",
    "storageKey": null
  }
],
v15 = {
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
  "selections": (v14/*: any*/),
  "storageKey": "translation(locale:\"en_US\")"
},
v16 = {
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
  "selections": (v14/*: any*/),
  "storageKey": "translation(locale:\"es_MX\")"
},
v17 = {
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
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditProductFormMutation",
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
            "args": (v6/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUpdate",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "InlineDataFragmentSpread",
                    "name": "EditProductFormData",
                    "selections": [
                      (v11/*: any*/),
                      (v10/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/)
                    ]
                  }
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v17/*: any*/)
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
      (v0/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "EditProductFormMutation",
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
            "args": (v6/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUpdate",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/)
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v17/*: any*/)
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
    "cacheID": "682f89cc30a666ded3242d967f3a2835",
    "id": null,
    "metadata": {},
    "name": "EditProductFormMutation",
    "operationKind": "mutation",
    "text": "mutation EditProductFormMutation(\n  $productKey: ID!\n  $productRevision: ID!\n  $productImagesNames: [ProductImageUploadable!]!\n  $productPriceUnitAmount: Int!\n  $translations: [ProductMultilingualInputTranslations!]!\n  $visibility: [ProductMultilingualInputVisibility!]!\n) {\n  commerce {\n    result: productUpdate(productKey: $productKey, productRevision: $productRevision, productMultilingualInput: {images: $productImagesNames, price: {unitAmount: $productPriceUnitAmount, unitAmountCurrency: MXN}, translations: $translations, visibility: $visibility}) {\n      __typename\n      ... on Product {\n        __typename\n        id\n        name\n        revision\n        ...EditProductFormData\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n\nfragment EditProductFormData on Product {\n  key\n  revision\n  price {\n    unitAmount\n  }\n  visibility\n  enTranslation: translation(locale: en_US) {\n    name\n    description\n  }\n  esTranslation: translation(locale: es_MX) {\n    name\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6e0c68810c8de013d27dc703065d335e';
export default node;
