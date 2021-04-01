/**
 * @generated SignedSource<<ef9cb86285bad188217a2583b60c4d6e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type MenuRow$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type MenuSectionKochkadaSweet$fragmentType: FragmentType;
export type MenuSectionKochkadaSweet$ref = MenuSectionKochkadaSweet$fragmentType;
export type MenuSectionKochkadaSweet$data = {|
  +kochkadaSweetMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentSpreads: MenuRow$fragmentType,
  |}>,
  +$fragmentType: MenuSectionKochkadaSweet$fragmentType,
|};
export type MenuSectionKochkadaSweet = MenuSectionKochkadaSweet$data;
export type MenuSectionKochkadaSweet$key = {
  +$data?: MenuSectionKochkadaSweet$data,
  +$fragmentSpreads: MenuSectionKochkadaSweet$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "clientLocale"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuSectionKochkadaSweet",
  "selections": [
    {
      "alias": "kochkadaSweetMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "DUMPLING_SWEET"
        }
      ],
      "concreteType": "Product",
      "kind": "LinkedField",
      "name": "menu",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuRow"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MenuQuery",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "f986851f1127acd1499898269a9038c3";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuSectionKochkadaSweet$fragmentType,
  MenuSectionKochkadaSweet$data,
>*/);
