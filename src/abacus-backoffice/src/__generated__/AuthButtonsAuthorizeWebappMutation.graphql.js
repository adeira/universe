/**
 * @generated SignedSource<<c9ca6b1310f47a6f719596fc2cdf1d11>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler-experimental
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AuthButtonsAuthorizeWebappMutationVariables = {|
  googleIdToken: string,
|};
export type AuthButtonsAuthorizeWebappMutationResponse = {|
  +authorizeWebapp: {|
    +success: boolean,
    +sessionToken: ?string,
    +failureMessage: ?string,
  |},
|};
export type AuthButtonsAuthorizeWebappMutation = {|
  variables: AuthButtonsAuthorizeWebappMutationVariables,
  response: AuthButtonsAuthorizeWebappMutationResponse,
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
    "cacheID": "b07026e86faefdabab63a0444dc5f041",
    "id": null,
    "metadata": {},
    "name": "AuthButtonsAuthorizeWebappMutation",
    "operationKind": "mutation",
    "text": "mutation AuthButtonsAuthorizeWebappMutation(\n  $googleIdToken: String!\n) {\n  authorizeWebapp(googleIdToken: $googleIdToken) {\n    success\n    sessionToken\n    failureMessage\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "f8538cae99f40d0a100e9774d707e3a0";
}

module.exports = node;
