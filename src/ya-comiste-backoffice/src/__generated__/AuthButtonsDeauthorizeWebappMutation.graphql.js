/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type AuthButtonsDeauthorizeWebappMutationVariables = {|
  sessionToken: string
|};
export type AuthButtonsDeauthorizeWebappMutationResponse = {|
  +deauthorize: {|
    +__typename: string
  |}
|};
export type AuthButtonsDeauthorizeWebappMutation = {|
  variables: AuthButtonsDeauthorizeWebappMutationVariables,
  response: AuthButtonsDeauthorizeWebappMutationResponse,
|};

/*
mutation AuthButtonsDeauthorizeWebappMutation(
  $sessionToken: String!
) {
  deauthorize(sessionToken: $sessionToken) {
    __typename
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sessionToken"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "sessionToken",
        "variableName": "sessionToken"
      }
    ],
    "concreteType": "DeauthorizePayload",
    "kind": "LinkedField",
    "name": "deauthorize",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthButtonsDeauthorizeWebappMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthButtonsDeauthorizeWebappMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5afb3a5c96834bbea122afd5892a0e4c",
    "id": null,
    "metadata": {},
    "name": "AuthButtonsDeauthorizeWebappMutation",
    "operationKind": "mutation",
    "text": "mutation AuthButtonsDeauthorizeWebappMutation(\n  $sessionToken: String!\n) {\n  deauthorize(sessionToken: $sessionToken) {\n    __typename\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '185c9f22024e996b6ad226523651ca0e';
export default node;
