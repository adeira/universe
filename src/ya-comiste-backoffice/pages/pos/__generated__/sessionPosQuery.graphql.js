/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type sessionPosQueryVariables = {||};
export type sessionPosQueryResponse = {|
  +pos: {|
    +listProducts: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +description: string,
      +images: $ReadOnlyArray<string>,
      +unitLabel: string,
      +price: {|
        +unitAmount: number,
        +currency: string,
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
    listProducts {
      id
      name
      description
      images
      unitLabel
      price {
        unitAmount
        currency
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
        "name": "listProducts",
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
                "name": "currency",
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
    "cacheID": "dd75b0da7cad399523fe24bb25cdbf9c",
    "id": null,
    "metadata": {},
    "name": "sessionPosQuery",
    "operationKind": "query",
    "text": "query sessionPosQuery {\n  pos {\n    listProducts {\n      id\n      name\n      description\n      images\n      unitLabel\n      price {\n        unitAmount\n        currency\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '222c6fb64b4ae67a1116200e4cac802b';
export default node;
