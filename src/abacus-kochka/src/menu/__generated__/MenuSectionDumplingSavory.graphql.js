/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionDumplingSavory$ref: FragmentReference;
declare export opaque type MenuSectionDumplingSavory$fragmentType: MenuSectionDumplingSavory$ref;
export type MenuSectionDumplingSavory = {|
  +dumplingSavoryMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionDumplingSavory$ref,
|};
export type MenuSectionDumplingSavory$data = MenuSectionDumplingSavory;
export type MenuSectionDumplingSavory$key = {
  +$data?: MenuSectionDumplingSavory$data,
  +$fragmentRefs: MenuSectionDumplingSavory$ref,
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
  "name": "MenuSectionDumplingSavory",
  "selections": [
    {
      "alias": "dumplingSavoryMenu",
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
// prettier-ignore
(node: any).hash = '4e92abc51a1b328118b02e2076d5fdc0';
export default node;
