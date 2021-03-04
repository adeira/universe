/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type HomeQueryVariables = {||};
export type HomeQueryResponse = {|
  +whoami: {|
    +id: ?string,
    +humanReadableType: ?string,
  |}
|};
export type HomeQuery = {|
  variables: HomeQueryVariables,
  response: HomeQueryResponse,
|};

/*
query HomeQuery {
  whoami {
    id
    humanReadableType
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
    "name": "HomeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "22bbad59fe48ceefb9625f7c5a6eb867",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery {\n  whoami {\n    id\n    humanReadableType\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ea89eba3cc995284961c5c73eb2927b5';
export default node;
