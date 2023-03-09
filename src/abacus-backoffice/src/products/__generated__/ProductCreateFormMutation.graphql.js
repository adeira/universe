/**
 * @generated SignedSource<<2194413864043bef8844f65076d9f292>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductMultilingualInputTranslations = {|
  description?: ?string,
  locale: SupportedLocale,
  name: string,
|};
export type ProductCreateFormMutation$variables = {|
  categories: $ReadOnlyArray<string>,
  clientLocale: SupportedLocale,
  productImagesNames: $ReadOnlyArray<string>,
  productPriceUnitAmount: number,
  translations: $ReadOnlyArray<ProductMultilingualInputTranslations>,
  visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
|};
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
export type ProductCreateFormMutation = {|
  response: ProductCreateFormMutation$data,
  variables: ProductCreateFormMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
  "name": "productPriceUnitAmount"
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
    "name": "clientLocale",
    "variableName": "clientLocale"
  },
  {
    "fields": [
      {
        "kind": "Literal",
        "name": "addons",
        "value": ([]/*: any*/)
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
  "name": "name",
  "storageKey": null
},
v9 = {
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
            "args": (v6/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productCreate",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v9/*: any*/)
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
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
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
            "args": (v6/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productCreate",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
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
                  (v9/*: any*/)
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
    "cacheID": "da179f821c696d9f5a9bf7d3253d8cd3",
    "id": null,
    "metadata": {},
    "name": "ProductCreateFormMutation",
    "operationKind": "mutation",
    "text": "mutation ProductCreateFormMutation($clientLocale:SupportedLocale!,$productImagesNames:[ProductImageUploadable!]!,$productPriceUnitAmount:Int!,$translations:[ProductMultilingualInputTranslations!]!,$visibility:[ProductMultilingualInputVisibility!]!,$categories:[ID!]!){commerce{result:productCreate(clientLocale:$clientLocale,productMultilingualInput:{images:$productImagesNames,price:{unitAmount:$productPriceUnitAmount,unitAmountCurrency:MXN},translations:$translations,visibility:$visibility,categories:$categories,addons:[]}){__typename,...on Product{__typename,name,id},...on ProductError{__typename,message}}}}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "4f36d3ee0db88d27a4c104f0b1deace3";
}

module.exports = ((node/*: any*/)/*: Mutation<
  ProductCreateFormMutation$variables,
  ProductCreateFormMutation$data,
>*/);
