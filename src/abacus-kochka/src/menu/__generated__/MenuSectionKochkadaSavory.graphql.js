/**
 * @generated SignedSource<<bbd44ca3a191dd1d6390f3a4ad7d2457>>
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
declare export opaque type MenuSectionKochkadaSavory$fragmentType: FragmentType;
export type MenuSectionKochkadaSavory$ref = MenuSectionKochkadaSavory$fragmentType;
export type MenuSectionKochkadaSavory$data = {|
  +kochkadaSavoryMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentSpreads: MenuRow$fragmentType,
  |}>,
  +$fragmentType: MenuSectionKochkadaSavory$fragmentType,
|};
export type MenuSectionKochkadaSavory = MenuSectionKochkadaSavory$data;
export type MenuSectionKochkadaSavory$key = {
  +$data?: MenuSectionKochkadaSavory$data,
  +$fragmentSpreads: MenuSectionKochkadaSavory$fragmentType,
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
  "name": "MenuSectionKochkadaSavory",
  "selections": [
    {
      "alias": "kochkadaSavoryMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "DUMPLING_SAVORY"
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
  (node/*: any*/).hash = "6140475a005f70edc685bfd546178cf4";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuSectionKochkadaSavory$fragmentType,
  MenuSectionKochkadaSavory$data,
>*/);
