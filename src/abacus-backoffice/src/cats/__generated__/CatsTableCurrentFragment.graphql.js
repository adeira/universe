/**
 * @generated SignedSource<<4ca34d4e78cac1be18cd0e9824dd52a8>>
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
declare export opaque type CatsTableCurrentFragment$fragmentType: FragmentType;
export type CatsTableCurrentFragment$ref = CatsTableCurrentFragment$fragmentType;
export type CatsTableCurrentFragment$data = {|
  +currentCats: $ReadOnlyArray<{|
    +order: number,
    +name: string,
    +dateOfCastration: ?string,
    +dateOfDeworming: ?string,
    +dateOfVaccinationRabies: ?string,
    +dateOfVaccinationTripleFelina: ?string,
  |}>,
  +$fragmentType: CatsTableCurrentFragment$fragmentType,
|};
export type CatsTableCurrentFragment = CatsTableCurrentFragment$data;
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
        }
      ],
      "storageKey": "listAllCats(allCatsFilter:{\"adopted\":false})"
    }
  ],
  "type": "CatsQuery",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "dc4566d68db2736f2683dc171ea87d6e";
}

module.exports = ((node/*: any*/)/*: Fragment<
  CatsTableCurrentFragment$fragmentType,
  CatsTableCurrentFragment$data,
>*/);
