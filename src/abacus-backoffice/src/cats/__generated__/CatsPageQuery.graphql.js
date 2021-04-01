/**
 * @generated SignedSource<<e83adec334118b6e6eb112b798c28207>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type CatsTableAdoptedFragment$fragmentType = any;
type CatsTableCurrentFragment$fragmentType = any;
export type CatsPageQuery$variables = {||};
export type CatsPageQueryVariables = CatsPageQuery$variables;
export type CatsPageQuery$data = {|
  +cats: {|
    +$fragmentSpreads: CatsTableCurrentFragment$fragmentType & CatsTableAdoptedFragment$fragmentType,
  |},
|};
export type CatsPageQueryResponse = CatsPageQuery$data;
export type CatsPageQuery = {|
  variables: CatsPageQueryVariables,
  response: CatsPageQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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

if (__DEV__) {
  (node/*: any*/).hash = "d80b8aeae3eee43d423c79777e38c450";
}

module.exports = ((node/*: any*/)/*: Query<
  CatsPageQuery$variables,
  CatsPageQuery$data,
>*/);
