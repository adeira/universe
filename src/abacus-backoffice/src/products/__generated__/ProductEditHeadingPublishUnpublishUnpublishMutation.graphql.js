/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedLocale = "en_US" | "es_MX" | "%future added value";
export type ProductEditHeadingPublishUnpublishUnpublishMutationVariables = {|
  productKey: string,
  clientLocale: SupportedLocale,
|};
export type ProductEditHeadingPublishUnpublishUnpublishMutationResponse = {|
  +commerce: {|
    +productOrError: {|
      +__typename: "Product"
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
export type ProductEditHeadingPublishUnpublishUnpublishMutation = {|
  variables: ProductEditHeadingPublishUnpublishUnpublishMutationVariables,
  response: ProductEditHeadingPublishUnpublishUnpublishMutationResponse,
|};

/*
mutation ProductEditHeadingPublishUnpublishUnpublishMutation(
  $productKey: ID!
  $clientLocale: SupportedLocale!
) {
  commerce {
    productOrError: productUnpublish(productKey: $productKey, clientLocale: $clientLocale) {
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
}
*/

const node: ConcreteRequest = (function(){
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
    "name": "ProductEditHeadingPublishUnpublishUnpublishMutation",
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
            "name": "productUnpublish",
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
    "name": "ProductEditHeadingPublishUnpublishUnpublishMutation",
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
            "name": "productUnpublish",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
    "cacheID": "59206588ead3c453ffd248768ec0dfb1",
    "id": null,
    "metadata": {},
    "name": "ProductEditHeadingPublishUnpublishUnpublishMutation",
    "operationKind": "mutation",
    "text": "mutation ProductEditHeadingPublishUnpublishUnpublishMutation(\n  $productKey: ID!\n  $clientLocale: SupportedLocale!\n) {\n  commerce {\n    productOrError: productUnpublish(productKey: $productKey, clientLocale: $clientLocale) {\n      __typename\n      ... on Product {\n        __typename\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '336e82aea443fa579b50ee8a5e0808ba';
export default node;
