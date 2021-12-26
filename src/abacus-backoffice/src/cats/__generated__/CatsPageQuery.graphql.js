/**
 * @flow
 */

/* eslint-disable */

import type { ConcreteRequest } from 'relay-runtime';
type CatsTableAdoptedFragment$ref = any;
type CatsTableCurrentFragment$ref = any;
export type CatsPageQueryVariables = {||};
export type CatsPageQueryResponse = {|
  +cats: {|
    +$fragmentRefs: CatsTableCurrentFragment$ref & CatsTableAdoptedFragment$ref
  |}
|};
export type CatsPageQuery = {|
  variables: CatsPageQueryVariables,
  response: CatsPageQueryResponse,
|};

/*
query CatsPageQuery {
  cats {
    ...CatsTableCurrentFragment
    ...CatsTableAdoptedFragment
  }
}

fragment CatsTableAdoptedFragment on CatsQuery {
  adoptedCats: listAllCats(allCatsFilter: {adopted: true}) {
    order
    name
    dateOfCastration
    dateOfDeworming
    dateOfAdoption
    id
  }
}

fragment CatsTableCurrentFragment on CatsQuery {
  currentCats: listAllCats(allCatsFilter: {adopted: false}) {
    order
    name
    dateOfCastration
    dateOfDeworming
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "order",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfCastration",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfDeworming",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CatsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CatsQuery",
        "kind": "LinkedField",
        "name": "cats",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CatsTableCurrentFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CatsTableAdoptedFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CatsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CatsQuery",
        "kind": "LinkedField",
        "name": "cats",
        "plural": false,
        "selections": [
          {
            "alias": "currentCats",
            "args": [
              {
                "kind": "Literal",
                "name": "allCatsFilter",
                "value": {
                  "adopted": false
                }
              }
            ],
            "concreteType": "CatInfo",
            "kind": "LinkedField",
            "name": "listAllCats",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": "listAllCats(allCatsFilter:{\"adopted\":false})"
          },
          {
            "alias": "adoptedCats",
            "args": [
              {
                "kind": "Literal",
                "name": "allCatsFilter",
                "value": {
                  "adopted": true
                }
              }
            ],
            "concreteType": "CatInfo",
            "kind": "LinkedField",
            "name": "listAllCats",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dateOfAdoption",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "listAllCats(allCatsFilter:{\"adopted\":true})"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0eac703b0d7d2b339dbd95f7cd1882ef",
    "id": null,
    "metadata": {},
    "name": "CatsPageQuery",
    "operationKind": "query",
    "text": "query CatsPageQuery {\n  cats {\n    ...CatsTableCurrentFragment\n    ...CatsTableAdoptedFragment\n  }\n}\n\nfragment CatsTableAdoptedFragment on CatsQuery {\n  adoptedCats: listAllCats(allCatsFilter: {adopted: true}) {\n    order\n    name\n    dateOfCastration\n    dateOfDeworming\n    dateOfAdoption\n    id\n  }\n}\n\nfragment CatsTableCurrentFragment on CatsQuery {\n  currentCats: listAllCats(allCatsFilter: {adopted: false}) {\n    order\n    name\n    dateOfCastration\n    dateOfDeworming\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'd80b8aeae3eee43d423c79777e38c450';
export default node;
