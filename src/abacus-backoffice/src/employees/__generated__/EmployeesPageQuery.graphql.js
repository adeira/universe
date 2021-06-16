/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type EmployeesPageQueryVariables = {||};
export type EmployeesPageQueryResponse = {|
  +listUsers: $ReadOnlyArray<{|
    +id: string,
    +name: ?string,
    +hasEmailVerified: ?boolean,
    +isActive: boolean,
  |}>
|};
export type EmployeesPageQuery = {|
  variables: EmployeesPageQueryVariables,
  response: EmployeesPageQueryResponse,
|};

/*
query EmployeesPageQuery {
  listUsers {
    id
    name
    hasEmailVerified
    isActive
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "id",
        "storageKey": null
      },
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
    "cacheID": "13af6fb9cc5d9e5a39acdfcfdfba0960",
    "id": null,
    "metadata": {},
    "name": "EmployeesPageQuery",
    "operationKind": "query",
    "text": "query EmployeesPageQuery {\n  listUsers {\n    id\n    name\n    hasEmailVerified\n    isActive\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e79e236d19dd026b5ef10959ba76088e';
export default node;
