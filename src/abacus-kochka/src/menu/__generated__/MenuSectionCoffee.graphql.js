/**
 * @generated SignedSource<<55018d243d321881fb0f695c1a0c93dd>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x run relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type MenuRow$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type MenuSectionCoffee$fragmentType: FragmentType;
export type MenuSectionCoffee$data = {|
  +coffeeMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentSpreads: MenuRow$fragmentType,
  |}>,
  +$fragmentType: MenuSectionCoffee$fragmentType,
|};
export type MenuSectionCoffee$key = {
  +$data?: MenuSectionCoffee$data,
  +$fragmentSpreads: MenuSectionCoffee$fragmentType,
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
  "name": "MenuSectionCoffee",
  "selections": [
    {
      "alias": "coffeeMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "COFFEE"
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
  (node/*: any*/).hash = "4f389377a25c5b78515dc2effd798653";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuSectionCoffee$fragmentType,
  MenuSectionCoffee$data,
>*/);
