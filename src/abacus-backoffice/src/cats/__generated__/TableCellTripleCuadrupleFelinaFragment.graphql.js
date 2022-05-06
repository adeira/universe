/**
 * @generated SignedSource<<13a8c3ff7a92c7bf57f8a92da62991c5>>
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
  +dateOfVaccinationTripleFelina: ?string,
  +dateOfVaccinationCuadrupleFelina: ?string,
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
