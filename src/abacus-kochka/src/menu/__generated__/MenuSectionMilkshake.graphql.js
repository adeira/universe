/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionMilkshake$ref: FragmentReference;
declare export opaque type MenuSectionMilkshake$fragmentType: MenuSectionMilkshake$ref;
export type MenuSectionMilkshake = {|
  +milkshakesMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionMilkshake$ref,
|};
export type MenuSectionMilkshake$data = MenuSectionMilkshake;
export type MenuSectionMilkshake$key = {
  +$data?: MenuSectionMilkshake$data,
  +$fragmentRefs: MenuSectionMilkshake$ref,
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
// prettier-ignore
(node: any).hash = 'd1cc28eedfba9f309564bf01b958dc15';
export default node;
