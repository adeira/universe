/**
 * @generated SignedSource<<cbcf8cea7f32ee1040ad8ced1da32def>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { CatsTableAdoptedFragment$fragmentType } from "./CatsTableAdoptedFragment.graphql";
import type { CatsTableCurrentFragment$fragmentType } from "./CatsTableCurrentFragment.graphql";
export type CatsPageQuery$variables = {||};
export type CatsPageQuery$data = {|
  +cats: {|
    +$fragmentSpreads: CatsTableAdoptedFragment$fragmentType & CatsTableCurrentFragment$fragmentType,
  |},
|};
export type CatsPageQuery = {|
  response: CatsPageQuery$data,
  variables: CatsPageQuery$variables,
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
  "name": "dateOfVaccinationRabies",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfVaccinationTripleFelina",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfVaccinationCuadrupleFelina",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateOfVaccinationLeucemiaFelina",
  "storageKey": null
},
v8 = {
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "canBeAdopted",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "listAllCats(allCatsFilter:{\"adopted\":true})"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "697ff76e21389113aa9b3c043fc92340",
    "id": null,
    "metadata": {},
    "name": "CatsPageQuery",
    "operationKind": "query",
    "text": "query CatsPageQuery{cats{...CatsTableCurrentFragment,...CatsTableAdoptedFragment}}fragment CatsTableAdoptedFragment on CatsQuery{adoptedCats:listAllCats(allCatsFilter:{adopted:true}){order,name,dateOfCastration,dateOfDeworming,dateOfAdoption,dateOfVaccinationRabies,...TableCellTripleCuadrupleFelinaFragment,dateOfVaccinationLeucemiaFelina,id}}fragment CatsTableCurrentFragment on CatsQuery{currentCats:listAllCats(allCatsFilter:{adopted:false}){order,name,canBeAdopted,dateOfCastration,dateOfDeworming,dateOfVaccinationRabies,...TableCellTripleCuadrupleFelinaFragment,dateOfVaccinationLeucemiaFelina,id}}fragment TableCellTripleCuadrupleFelinaFragment on CatInfo{dateOfVaccinationTripleFelina,dateOfVaccinationCuadrupleFelina}"
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
