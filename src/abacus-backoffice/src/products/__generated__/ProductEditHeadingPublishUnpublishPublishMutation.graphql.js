/**
 * @generated SignedSource<<2d70ba3248d7cec9d3314c7778487f2b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductEditHeadingPublishUnpublishPublishMutation$variables = {|
  productKey: string,
  clientLocale: SupportedLocale,
|};
export type ProductEditHeadingPublishUnpublishPublishMutationVariables = ProductEditHeadingPublishUnpublishPublishMutation$variables;
export type ProductEditHeadingPublishUnpublishPublishMutation$data = {|
  +commerce: {|
    +productOrError: {|
      +__typename: "Product",
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
export type ProductEditHeadingPublishUnpublishPublishMutationResponse = ProductEditHeadingPublishUnpublishPublishMutation$data;
export type ProductEditHeadingPublishUnpublishPublishMutation = {|
  variables: ProductEditHeadingPublishUnpublishPublishMutationVariables,
  response: ProductEditHeadingPublishUnpublishPublishMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "clientLocale"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productKey"
},
v2 = [
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
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductEditHeadingPublishUnpublishPublishMutation",
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
            "alias": "productOrError",
            "args": (v2/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productPublish",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "Product",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProductEditHeadingPublishUnpublishPublishMutation",
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
            "alias": "productOrError",
            "args": (v2/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productPublish",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
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
                  (v4/*: any*/)
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
    "cacheID": "565a613b6c2c0ea3b7db874add5c8a3a",
    "id": null,
    "metadata": {},
    "name": "ProductEditHeadingPublishUnpublishPublishMutation",
    "operationKind": "mutation",
    "text": "mutation ProductEditHeadingPublishUnpublishPublishMutation(\n  $productKey: ID!\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    productOrError: productPublish(productKey: $productKey, clientLocale: $clientLocale) {\n      __typename\n      ... on Product {\n        __typename\n        id\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "fc652ae1a9c373aa274a64cdd1398435";
}

module.exports = ((node/*: any*/)/*: Mutation<
  ProductEditHeadingPublishUnpublishPublishMutation$variables,
  ProductEditHeadingPublishUnpublishPublishMutation$data,
>*/);
