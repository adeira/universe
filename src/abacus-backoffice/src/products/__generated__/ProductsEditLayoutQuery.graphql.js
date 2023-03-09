/**
 * @generated SignedSource<<88ab65847f1460ce6804c9a687d41616>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProductEditFormData$fragmentType } from "./ProductEditFormData.graphql";
import type { ProductEditHeading$fragmentType } from "./ProductEditHeading.graphql";
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductsEditLayoutQuery$variables = {|
  clientLocale: SupportedLocale,
  productKey: string,
|};
export type ProductsEditLayoutQuery$data = {|
  +commerce: {|
    +product: {|
      +images: $ReadOnlyArray<{|
        +blurhash: string,
        +name: string,
        +url: string,
      |}>,
      +$fragmentSpreads: ProductEditFormData$fragmentType & ProductEditHeading$fragmentType,
    |},
  |},
|};
export type ProductsEditLayoutQuery = {|
  response: ProductsEditLayoutQuery$data,
  variables: ProductsEditLayoutQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProductEditHeading"
              },
              (v4/*: any*/),
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
    "cacheID": "86e4d09cbee3f709c62a944f7a17fff7",
    "id": null,
    "metadata": {},
    "name": "ProductsEditLayoutQuery",
    "operationKind": "query",
    "text": "query ProductsEditLayoutQuery($clientLocale:SupportedLocale!,$productKey:ID!){commerce{product:getUnpublishedProductByKey(clientLocale:$clientLocale,productKey:$productKey){...ProductEditHeading,images{name,blurhash,url},...ProductEditFormData,id}}}fragment ProductEditFormData on Product{key,revision,availableCategories(clientLocale:$clientLocale){...ProductFormCategoriesData,id},price{unitAmount},selectedCategories(clientLocale:$clientLocale){id},visibility,enTranslation:translation(locale:en_US){name,description},esTranslation:translation(locale:es_MX){name,description},images{name}}fragment ProductEditHeading on Product{key,name,isPublished}fragment ProductFormCategoriesData on ProductCategory{id,name}"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "65d361f91d79ebe6a215a4a69979a04f";
}

module.exports = ((node/*: any*/)/*: Query<
  ProductsEditLayoutQuery$variables,
  ProductsEditLayoutQuery$data,
>*/);
