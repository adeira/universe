/**
 * @generated SignedSource<<e43a496b0b85643a5e72e47764f43f3d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthButtonsAuthorizeWebappMutation$variables = {|
  googleIdToken: string,
|};
export type AuthButtonsAuthorizeWebappMutation$data = {|
  +auth: {|
    +authorizeWebapp: {|
      +failureMessage: ?string,
      +sessionToken: ?string,
      +success: boolean,
    |},
  |},
|};
export type AuthButtonsAuthorizeWebappMutation = {|
  response: AuthButtonsAuthorizeWebappMutation$data,
  variables: AuthButtonsAuthorizeWebappMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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

if (__DEV__) {
  (node/*: any*/).hash = "e758cafe9edc929ea309db7a30ac72e6";
}

module.exports = ((node/*: any*/)/*: Mutation<
  AuthButtonsAuthorizeWebappMutation$variables,
  AuthButtonsAuthorizeWebappMutation$data,
>*/);
