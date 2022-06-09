/**
 * @generated SignedSource<<1639c280c2f457d85ce9a8b0c5273fb5>>
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
declare export opaque type TableCellTripleCuadrupleFelinaFragment$fragmentType: FragmentType;
export type TableCellTripleCuadrupleFelinaFragment$data = {|
  +dateOfVaccinationCuadrupleFelina: ?string,
  +dateOfVaccinationTripleFelina: ?string,
  +$fragmentType: TableCellTripleCuadrupleFelinaFragment$fragmentType,
|};
export type TableCellTripleCuadrupleFelinaFragment$key = {
  +$data?: TableCellTripleCuadrupleFelinaFragment$data,
  +$fragmentSpreads: TableCellTripleCuadrupleFelinaFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TableCellTripleCuadrupleFelinaFragment",
  "selections": [
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
  "type": "CatInfo",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "4072dbccb5332204a58eab2ce2a3538f";
}

module.exports = ((node/*: any*/)/*: Fragment<
  TableCellTripleCuadrupleFelinaFragment$fragmentType,
  TableCellTripleCuadrupleFelinaFragment$data,
>*/);
