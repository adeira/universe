/**
 * @generated SignedSource<<38916bc577b924dc5f85db5443b3b312>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: yarn workspace @adeira/ya-comiste-backoffice relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditProductHeadingDeleteMutationVariables = {|
  productKey: string,
|};
export type EditProductHeadingDeleteMutationResponse = {|
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
export type EditProductHeadingDeleteMutation = {|
  variables: EditProductHeadingDeleteMutationVariables,
  response: EditProductHeadingDeleteMutationResponse,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "name": "EditProductHeadingDeleteMutation",
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
            "name": "productDelete",
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
    "name": "EditProductHeadingDeleteMutation",
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
            "name": "productDelete",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "cacheID": "dceec47313f272a68f163891fdd3f8e1",
    "id": null,
    "metadata": {},
    "name": "EditProductHeadingDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation EditProductHeadingDeleteMutation(\n  $productKey: ID!\n) {\n  commerce {\n    productOrError: productDelete(productKey: $productKey) {\n      __typename\n      ... on Product {\n        __typename\n        id\n      }\n      ... on ProductError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "c1136d3597d18021eecfd51142dbb6b5";
}

module.exports = node;
