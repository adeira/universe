/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type IndexPageQueryVariables = {||};
export type IndexPageQueryResponse = {|
  +whoami: {|
    +id: ?string,
    +humanReadableType: ?string,
    +isDebugAssertionsEnabled: boolean,
  |},
  +pos: {|
    +getTotalCheckoutStats: ?{|
      +totalCheckouts: number,
      +totalSoldUnits: number,
      +totalSoldUnitAmount: number,
    |}
  |},
|};
export type IndexPageQuery = {|
  variables: IndexPageQueryVariables,
  response: IndexPageQueryResponse,
|};

/*
query IndexPageQuery {
  whoami {
    id
    humanReadableType
    isDebugAssertionsEnabled
  }
  pos {
    getTotalCheckoutStats {
      totalCheckouts
      totalSoldUnits
      totalSoldUnitAmount
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "WhoamiPayload",
    "kind": "LinkedField",
    "name": "whoami",
    "plural": false,
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
        "name": "humanReadableType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isDebugAssertionsEnabled",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "POSQuery",
    "kind": "LinkedField",
    "name": "pos",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PosCheckoutTotalStats",
        "kind": "LinkedField",
        "name": "getTotalCheckoutStats",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCheckouts",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalSoldUnits",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalSoldUnitAmount",
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
    "name": "IndexPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d6c2b969b215fc211b2487fa1b831d67",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  whoami {\n    id\n    humanReadableType\n    isDebugAssertionsEnabled\n  }\n  pos {\n    getTotalCheckoutStats {\n      totalCheckouts\n      totalSoldUnits\n      totalSoldUnitAmount\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'aeba1fc58c0f30fa53eeafb0041861bf';
export default node;
