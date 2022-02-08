/**
 * @generated SignedSource<<bdf5c9e7d72015d0cf06f11e601e7a9a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type EmployeesPageQuery$variables = {||};
export type EmployeesPageQuery$data = {|
  +auth: {|
    +listUsers: $ReadOnlyArray<{|
      +name: ?string,
      +hasEmailVerified: ?boolean,
      +isActive: boolean,
    |}>,
  |},
|};
export type EmployeesPageQuery = {|
  variables: EmployeesPageQuery$variables,
  response: EmployeesPageQuery$data,
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
