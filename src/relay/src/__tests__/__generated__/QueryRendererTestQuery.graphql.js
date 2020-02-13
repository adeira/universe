/**
 * @flow
 * @relayHash 9e5091db0ab6327154c0ea86c51c952e
 */

/* eslint-disable */
// flowlint untyped-type-import:off

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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "QueryRendererTestQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": "node(id:\"my-id\")",
        "args": (v0/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "QueryRendererTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": "node(id:\"my-id\")",
        "args": (v0/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "QueryRendererTestQuery",
    "id": null,
    "text": "query QueryRendererTestQuery {\n  node(id: \"my-id\") {\n    __typename\n    id\n  }\n}\n",
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
    }
  }
};
})();
// prettier-ignore
(node: any).hash = '6da37014e280a934ef08b7983d1c4d94';
export default node;
