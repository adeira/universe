/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type ProductKeyDeleteMutationVariables = {|
  productKey: string
|};
export type ProductKeyDeleteMutationResponse = {|
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
|};
export type ProductKeyDeleteMutation = {|
  variables: ProductKeyDeleteMutationVariables,
  response: ProductKeyDeleteMutationResponse,
|};

/*
mutation ProductKeyDeleteMutation(
  $productKey: ID!
) {
  productOrError: productDelete(productKey: $productKey) {
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
    "name": "ProductKeyDeleteMutation",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductKeyDeleteMutation",
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
    "cacheID": "7aea1ac0cde4d63ec220af576cb5b100",
    "id": null,
    "metadata": {},
    "name": "ProductKeyDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ProductKeyDeleteMutation(\n  $productKey: ID!\n) {\n  productOrError: productDelete(productKey: $productKey) {\n    __typename\n    ... on Product {\n      __typename\n    }\n    ... on ProductError {\n      __typename\n      message\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '96076dded274d80e58dbbfebd1d7f29e';
export default node;
