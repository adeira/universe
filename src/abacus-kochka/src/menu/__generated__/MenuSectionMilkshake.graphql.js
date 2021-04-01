/**
 * @generated SignedSource<<39957e4bdd4a83d74cd8545f4346ba4b>>
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
declare export opaque type MenuSectionMilkshake$fragmentType: FragmentType;
export type MenuSectionMilkshake$ref = MenuSectionMilkshake$fragmentType;
export type MenuSectionMilkshake$data = {|
  +milkshakesMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentSpreads: MenuRow$fragmentType,
  |}>,
  +$fragmentType: MenuSectionMilkshake$fragmentType,
|};
export type MenuSectionMilkshake = MenuSectionMilkshake$data;
export type MenuSectionMilkshake$key = {
  +$data?: MenuSectionMilkshake$data,
  +$fragmentSpreads: MenuSectionMilkshake$fragmentType,
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
  "name": "MenuSectionMilkshake",
  "selections": [
    {
      "alias": "milkshakesMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "MILKSHAKES"
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
  (node/*: any*/).hash = "d1cc28eedfba9f309564bf01b958dc15";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuSectionMilkshake$fragmentType,
  MenuSectionMilkshake$data,
>*/);
