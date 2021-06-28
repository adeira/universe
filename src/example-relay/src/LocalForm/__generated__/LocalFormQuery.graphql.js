/**
 * @generated SignedSource<<4e26c8c26bb91029d686063628622fe8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler-experimental
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LocalFormQueryVariables = {||};
export type LocalFormQueryResponse = {|
  +__typename: string,
  +localForm: ?{|
    +subject: ?string,
    +message: ?string,
  |},
|};
export type LocalFormQuery = {|
  variables: LocalFormQueryVariables,
  response: LocalFormQueryResponse,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  },
  {
    "kind": "ClientExtension",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocalForm",
        "kind": "LinkedField",
        "name": "localForm",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "subject",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LocalFormQuery",
    "selections": (v0/*: any*/),
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocalFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0d99b879d458f565ba2e90754bb6673f",
    "id": null,
    "metadata": {},
    "name": "LocalFormQuery",
    "operationKind": "query",
    "text": "query LocalFormQuery {\n  __typename\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "e61f3eac0352f6268cbca8f35ceb79ed";
}

module.exports = node;
