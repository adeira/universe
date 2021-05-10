/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type ProductEditHeadingPublishUnpublishPublishMutationVariables = {|
  productKey: string
|};
export type ProductEditHeadingPublishUnpublishPublishMutationResponse = {|
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
export type ProductEditHeadingPublishUnpublishPublishMutation = {|
  variables: ProductEditHeadingPublishUnpublishPublishMutationVariables,
  response: ProductEditHeadingPublishUnpublishPublishMutationResponse,
|};

/*
mutation ProductEditHeadingPublishUnpublishPublishMutation(
  $productKey: ID!
) {
  commerce {
    productOrError: productPublish(productKey: $productKey) {
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
            "args": (v1/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productPublish",
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
            "args": (v1/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "productPublish",
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
    "cacheID": "91a9e274463dd430529129ce27db6317",
    "id": null,
    "metadata": {},
    "name": "ProductEditHeadingPublishUnpublishPublishMutation",
    "operationKind": "mutation",
    "text": "mutation ProductEditHeadingPublishUnpublishPublishMutation(\n  $productKey: ID!\n) {\n  commerce {\n    productOrError: productPublish(productKey: $productKey) {\n      __typename\n      ... on Product {\n        __typename\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'add5766330337f5cfcc4db1072b81ec7';
export default node;
