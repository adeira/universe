/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
export type EmployeesPageQueryVariables = {||};
export type EmployeesPageQueryResponse = {|
  +listUsers: $ReadOnlyArray<{|
    +id: string,
    +type: string,
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
    type
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
        "name": "type",
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
    "cacheID": "08489bbc8e5363551e7caca19b7486a7",
    "id": null,
    "metadata": {},
    "name": "EmployeesPageQuery",
    "operationKind": "query",
    "text": "query EmployeesPageQuery {\n  listUsers {\n    id\n    type\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '25306471eddd3c6211016abedeb10009';
export default node;
