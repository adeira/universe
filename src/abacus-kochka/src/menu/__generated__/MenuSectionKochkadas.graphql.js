/**
 * @generated SignedSource<<cede04e418a822d962b47572330f1870>>
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
declare export opaque type MenuSectionKochkadas$fragmentType: FragmentType;
export type MenuSectionKochkadas$ref = MenuSectionKochkadas$fragmentType;
export type MenuSectionKochkadas$data = {|
  +kochkadasMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentSpreads: MenuRow$fragmentType,
  |}>,
  +$fragmentType: MenuSectionKochkadas$fragmentType,
|};
export type MenuSectionKochkadas = MenuSectionKochkadas$data;
export type MenuSectionKochkadas$key = {
  +$data?: MenuSectionKochkadas$data,
  +$fragmentSpreads: MenuSectionKochkadas$fragmentType,
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
  "name": "MenuSectionKochkadas",
  "selections": [
    {
      "alias": "kochkadasMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "KOCHKADAS"
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
  (node/*: any*/).hash = "c76e40e7e444026e9275a67c17fe5965";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuSectionKochkadas$fragmentType,
  MenuSectionKochkadas$data,
>*/);
