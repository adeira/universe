/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type AuthButtonsAuthorizeWebappMutationVariables = {|
  googleIdToken: string
|};
export type AuthButtonsAuthorizeWebappMutationResponse = {|
  +auth: {|
    +authorizeWebapp: {|
      +success: boolean,
      +sessionToken: ?string,
      +failureMessage: ?string,
    |}
  |}
|};
export type AuthButtonsAuthorizeWebappMutation = {|
  variables: AuthButtonsAuthorizeWebappMutationVariables,
  response: AuthButtonsAuthorizeWebappMutationResponse,
|};

/*
mutation AuthButtonsAuthorizeWebappMutation(
  $googleIdToken: String!
) {
  auth {
    authorizeWebapp(googleIdToken: $googleIdToken) {
      success
      sessionToken
      failureMessage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "googleIdToken"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthMutation",
    "kind": "LinkedField",
    "name": "auth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "googleIdToken",
            "variableName": "googleIdToken"
          }
        ],
        "concreteType": "AuthorizeWebappPayload",
        "kind": "LinkedField",
        "name": "authorizeWebapp",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "success",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sessionToken",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "failureMessage",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthButtonsAuthorizeWebappMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthButtonsAuthorizeWebappMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5cd671d409cd028d672c71f2f79478f9",
    "id": null,
    "metadata": {},
    "name": "AuthButtonsAuthorizeWebappMutation",
    "operationKind": "mutation",
    "text": "mutation AuthButtonsAuthorizeWebappMutation(\n  $googleIdToken: String!\n) {\n  auth {\n    authorizeWebapp(googleIdToken: $googleIdToken) {\n      success\n      sessionToken\n      failureMessage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e758cafe9edc929ea309db7a30ac72e6';
export default node;
