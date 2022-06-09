/**
 * @generated SignedSource<<b761573d578c03bcc7f879d3347da30b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type TableCellTripleCuadrupleFelinaFragment$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type CatsTableCurrentFragment$fragmentType: FragmentType;
export type CatsTableCurrentFragment$data = {|
  +currentCats: $ReadOnlyArray<{|
    +canBeAdopted: ?boolean,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
    +dateOfVaccinationLeucemiaFelina: ?string,
    +dateOfVaccinationRabies: ?string,
    +name: string,
    +order: number,
    +$fragmentSpreads: TableCellTripleCuadrupleFelinaFragment$fragmentType,
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "TableCellTripleCuadrupleFelinaFragment"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfVaccinationLeucemiaFelina",
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
  (node/*: any*/).hash = "048937bd280141f4bb25897ea5052608";
}

module.exports = ((node/*: any*/)/*: Fragment<
  CatsTableCurrentFragment$fragmentType,
  CatsTableCurrentFragment$data,
>*/);
