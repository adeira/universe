/**
 * @generated SignedSource<<2382a1e265d5fb6280a9a325e679403f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type MenuSectionCiabattas$fragmentType = any;
type MenuSectionCoffee$fragmentType = any;
type MenuSectionKochkadas$fragmentType = any;
type MenuSectionOthers$fragmentType = any;
type MenuSectionSpecialities$fragmentType = any;
type MenuSectionTea$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type MenuFragment$fragmentType: FragmentType;
export type MenuFragment$data = {|
  +menu: {|
    +$fragmentSpreads: MenuSectionCiabattas$fragmentType & MenuSectionCoffee$fragmentType & MenuSectionKochkadas$fragmentType & MenuSectionOthers$fragmentType & MenuSectionSpecialities$fragmentType & MenuSectionTea$fragmentType,
  |},
  +$fragmentType: MenuFragment$fragmentType,
|};
export type MenuFragment$key = {
  +$data?: MenuFragment$data,
  +$fragmentSpreads: MenuFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MenuQuery",
      "kind": "LinkedField",
      "name": "menu",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuSectionCoffee"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuSectionTea"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuSectionSpecialities"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuSectionOthers"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuSectionKochkadas"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuSectionCiabattas"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "d767a01a21d56d9befe68460bca9f7cd";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuFragment$fragmentType,
  MenuFragment$data,
>*/);
