/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type EditProductHeadingPublishUnpublishUnpublishMutationVariables = {|
  productKey: string
|};
export type EditProductHeadingPublishUnpublishUnpublishMutationResponse = {|
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
export type EditProductHeadingPublishUnpublishUnpublishMutation = {|
  variables: EditProductHeadingPublishUnpublishUnpublishMutationVariables,
  response: EditProductHeadingPublishUnpublishUnpublishMutationResponse,
|};

/*
mutation EditProductHeadingPublishUnpublishUnpublishMutation(
  $productKey: ID!
) {
  commerce {
    productOrError: productUnpublish(productKey: $productKey) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productKey"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "productKey",
    "variableName": "productKey"
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
    "name": "EditProductHeadingPublishUnpublishUnpublishMutation",
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
            "args": (v1/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUnpublish",
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
    "name": "EditProductHeadingPublishUnpublishUnpublishMutation",
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
            "args": (v1/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productUnpublish",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b4524cd20f19adb661c0d3a8988a1128",
    "id": null,
    "metadata": {},
    "name": "EditProductHeadingPublishUnpublishUnpublishMutation",
    "operationKind": "mutation",
    "text": "mutation EditProductHeadingPublishUnpublishUnpublishMutation(\n  $productKey: ID!\n) {\n  commerce {\n    productOrError: productUnpublish(productKey: $productKey) {\n      __typename\n      ... on Product {\n        __typename\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'a35342e4abcd1ab77abbeb777165d401';
export default node;
