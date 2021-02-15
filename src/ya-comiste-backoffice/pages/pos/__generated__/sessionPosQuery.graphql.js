/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
export type sessionPosQueryVariables = {||};
export type sessionPosQueryResponse = {|
  +pos: {|
    +listPublishedProducts: ?$ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
      +description: ?string,
      +images: $ReadOnlyArray<string>,
      +unitLabel: string,
      +price: {|
        +unitAmount: number,
        +unitAmountCurrency: SupportedCurrency,
      |},
    |}>
  |}
|};
export type sessionPosQuery = {|
  variables: sessionPosQueryVariables,
  response: sessionPosQueryResponse,
|};

/*
query sessionPosQuery {
  pos {
    listPublishedProducts {
      id
      name
      description
      images
      unitLabel
      price {
        unitAmount
        unitAmountCurrency
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "POS",
    "kind": "LinkedField",
    "name": "pos",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "listPublishedProducts",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "images",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unitLabel",
            "storageKey": null
          },
          {
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitAmountCurrency",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "sessionPosQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "sessionPosQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8e4d6a76976214a6885c43fe7e2fb6a6",
    "id": null,
    "metadata": {},
    "name": "sessionPosQuery",
    "operationKind": "query",
    "text": "query sessionPosQuery {\n  pos {\n    listPublishedProducts {\n      id\n      name\n      description\n      images\n      unitLabel\n      price {\n        unitAmount\n        unitAmountCurrency\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f22c20e8d010b47e89204ecf852a6c04';
export default node;
