/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type pagesQueryVariables = {||};
export type pagesQueryResponse = {|
  +whoami: {|
    +id: ?string
  |}
|};
export type pagesQuery = {|
  variables: pagesQueryVariables,
  response: pagesQueryResponse,
|};

/*
query pagesQuery {
  whoami {
    id
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
    "name": "pagesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "518df86b7ff0fd30547d9f9d9345af6f",
    "id": null,
    "metadata": {},
    "name": "pagesQuery",
    "operationKind": "query",
    "text": "query pagesQuery {\n  whoami {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e3b35f066647ed5440767915b9648c4b';
export default node;
