/**
 * @generated SignedSource<<12adb72d7c812f125475492f4c9c4c20>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type CatsTableCurrentFragment$fragmentType: FragmentType;
export type CatsTableCurrentFragment$data = {|
  +currentCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +canBeAdopted: ?boolean,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
    +dateOfVaccinationRabies: ?string,
    +dateOfVaccinationTripleFelina: ?string,
    +dateOfVaccinationCuadrupleFelina: ?string,
  |}>,
  +$fragmentType: CatsTableCurrentFragment$fragmentType,
|};
export type CatsTableCurrentFragment$key = {
  +$data?: CatsTableCurrentFragment$data,
  +$fragmentSpreads: CatsTableCurrentFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CatsTableCurrentFragment",
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
          "name": "canBeAdopted",
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
      "storageKey": "listAllCats(allCatsFilter:{\"adopted\":false})"
    }
  ],
  "type": "CatsQuery",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "90b1e5022585b6c6ac1a5766f1e70285";
}

module.exports = ((node/*: any*/)/*: Fragment<
  CatsTableCurrentFragment$fragmentType,
  CatsTableCurrentFragment$data,
>*/);
