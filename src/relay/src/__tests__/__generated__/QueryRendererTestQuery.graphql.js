/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type QueryRendererTestQueryVariables = {||};
export type QueryRendererTestQueryResponse = {|
  +node: ?{|
    +id: string
  |}
|};
export type QueryRendererTestQuery = {|
  variables: QueryRendererTestQueryVariables,
  response: QueryRendererTestQueryResponse,
|};

/*
query QueryRendererTestQuery {
  node(id: "my-id") {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "my-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueryRendererTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "node(id:\"my-id\")"
      }
    ],
    "type": "RootQuery"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueryRendererTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "node(id:\"my-id\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "node": {
          "type": "Node",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        }
      }
    },
    "name": "QueryRendererTestQuery",
    "operationKind": "query",
    "text": "query QueryRendererTestQuery {\n  node(id: \"my-id\") {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6da37014e280a934ef08b7983d1c4d94';
export default node;
