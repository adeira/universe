/**
 * @generated SignedSource<<6f1ef9991a67c4fcd44e81eea87d4cec>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type EmployeesPageQuery$variables = {||};
export type EmployeesPageQuery$data = {|
  +auth: {|
    +listUsers: $ReadOnlyArray<{|
      +hasEmailVerified: ?boolean,
      +isActive: boolean,
      +name: ?string,
    |}>,
  |},
|};
export type EmployeesPageQuery = {|
  response: EmployeesPageQuery$data,
  variables: EmployeesPageQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AuthQuery",
    "kind": "LinkedField",
    "name": "auth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AnyUser",
        "kind": "LinkedField",
        "name": "listUsers",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasEmailVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isActive",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EmployeesPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EmployeesPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bfc4c270e45a9249a364df23d447c82c",
    "id": null,
    "metadata": {},
    "name": "EmployeesPageQuery",
    "operationKind": "query",
    "text": "query EmployeesPageQuery {\n  auth {\n    listUsers {\n      name\n      hasEmailVerified\n      isActive\n    }\n  }\n}\n"
  }
};
})();

if (__DEV__) {
  (node/*: any*/).hash = "2e20a6c5048340bea0ce11b0fb28638c";
}

module.exports = ((node/*: any*/)/*: Query<
  EmployeesPageQuery$variables,
  EmployeesPageQuery$data,
>*/);
