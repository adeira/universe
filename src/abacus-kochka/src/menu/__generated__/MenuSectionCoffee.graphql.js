/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionCoffee$ref: FragmentReference;
declare export opaque type MenuSectionCoffee$fragmentType: MenuSectionCoffee$ref;
export type MenuSectionCoffee = {|
  +coffeeMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionCoffee$ref,
|};
export type MenuSectionCoffee$data = MenuSectionCoffee;
export type MenuSectionCoffee$key = {
  +$data?: MenuSectionCoffee$data,
  +$fragmentRefs: MenuSectionCoffee$ref,
  ...
};


const node: ReaderFragment = {
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
// prettier-ignore
(node: any).hash = '4f389377a25c5b78515dc2effd798653';
export default node;
