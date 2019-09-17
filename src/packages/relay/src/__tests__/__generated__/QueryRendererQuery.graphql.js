/**
 * @flow
 * @relayHash 25d06689c9c4a86df15c271912d04a4f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type QueryRendererQueryVariables = {||};
export type QueryRendererQueryResponse = {|
  +node: ?{|
    +id: string
  |}
|};
export type QueryRendererQuery = {|
  variables: QueryRendererQueryVariables,
  response: QueryRendererQueryResponse,
|};
*/


/*
query QueryRendererQuery {
  node(id: "my-id") {
    __typename
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "QueryRendererQuery",
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
    "name": "QueryRendererQuery",
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
    "name": "QueryRendererQuery",
    "id": null,
    "text": "query QueryRendererQuery {\n  node(id: \"my-id\") {\n    __typename\n    id\n  }\n}\n",
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
(node/*: any*/).hash = 'eff4ec049f4149500706a066f4030203';
module.exports = node;
