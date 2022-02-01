/**
 * @generated SignedSource<<2030524a6be6acce467b8cc9bcb5626d>>
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
declare export opaque type MenuSectionCiabattas$fragmentType: FragmentType;
export type MenuSectionCiabattas$ref = MenuSectionCiabattas$fragmentType;
export type MenuSectionCiabattas$data = {|
  +ciabattasMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentSpreads: MenuRow$fragmentType,
  |}>,
  +$fragmentType: MenuSectionCiabattas$fragmentType,
|};
export type MenuSectionCiabattas = MenuSectionCiabattas$data;
export type MenuSectionCiabattas$key = {
  +$data?: MenuSectionCiabattas$data,
  +$fragmentSpreads: MenuSectionCiabattas$fragmentType,
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
  "name": "MenuSectionCiabattas",
  "selections": [
    {
      "alias": "ciabattasMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "CIABATTAS"
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
  (node/*: any*/).hash = "6d8be3a8f67d7be2a5d58e09f369410a";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuSectionCiabattas$fragmentType,
  MenuSectionCiabattas$data,
>*/);
