/**
 * @generated SignedSource<<4af20234ce1ebdea24153152d3c13173>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type CatsTableAdoptedFragment$fragmentType: FragmentType;
export type CatsTableAdoptedFragment$ref = CatsTableAdoptedFragment$fragmentType;
export type CatsTableAdoptedFragment$data = {|
  +adoptedCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
    +dateOfAdoption: ?string,
    +dateOfVaccinationRabies: ?string,
    +dateOfVaccinationTripleFelina: ?string,
    +dateOfVaccinationCuadrupleFelina: ?string,
  |}>,
  +$fragmentType: CatsTableAdoptedFragment$fragmentType,
|};
export type CatsTableAdoptedFragment = CatsTableAdoptedFragment$data;
export type CatsTableAdoptedFragment$key = {
  +$data?: CatsTableAdoptedFragment$data,
  +$fragmentSpreads: CatsTableAdoptedFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CatsTableAdoptedFragment",
  "selections": [
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "order",
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
          "name": "dateOfCastration",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfDeworming",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfAdoption",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfVaccinationRabies",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfVaccinationTripleFelina",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfVaccinationCuadrupleFelina",
          "storageKey": null
        }
      ],
      "storageKey": "listAllCats(allCatsFilter:{\"adopted\":true})"
    }
  ],
  "type": "CatsQuery",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "6787788d2a4d67c8dc20b734447ab590";
}

module.exports = ((node/*: any*/)/*: Fragment<
  CatsTableAdoptedFragment$fragmentType,
  CatsTableAdoptedFragment$data,
>*/);
