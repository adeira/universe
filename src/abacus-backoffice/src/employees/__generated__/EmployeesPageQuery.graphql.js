/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type EmployeesPageQueryVariables = {||};
export type EmployeesPageQueryResponse = {|
  +auth: {|
    +listUsers: $ReadOnlyArray<{|
      +name: ?string,
      +hasEmailVerified: ?boolean,
      +isActive: boolean,
    |}>
  |}
|};
export type EmployeesPageQuery = {|
  variables: EmployeesPageQueryVariables,
  response: EmployeesPageQueryResponse,
|};

/*
query EmployeesPageQuery {
  auth {
    listUsers {
      name
      hasEmailVerified
      isActive
    }
  }
}
*/

const node: ConcreteRequest = (function(){
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
// prettier-ignore
(node: any).hash = '2e20a6c5048340bea0ce11b0fb28638c';
export default node;
