/**
 * @generated SignedSource<<ef21ec573e6c4342c0a6c71a902a9a02>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: yarn workspace @adeira/ya-comiste-backoffice relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IndexPageQueryVariables = {||};
export type IndexPageQueryResponse = {|
  +whoami: {|
    +id: ?string,
    +humanReadableType: ?string,
  |},
|};
export type IndexPageQuery = {|
  variables: IndexPageQueryVariables,
  response: IndexPageQueryResponse,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "cacheID": "da3fd8961335901d5195e17e7716df48",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  whoami {\n    id\n    humanReadableType\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "d60b2473ed02228caec449ba8598cebd";
}

module.exports = node;
