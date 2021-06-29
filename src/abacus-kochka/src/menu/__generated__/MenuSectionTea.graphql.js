/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionTea$ref: FragmentReference;
declare export opaque type MenuSectionTea$fragmentType: MenuSectionTea$ref;
export type MenuSectionTea = {|
  +teaMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionTea$ref,
|};
export type MenuSectionTea$data = MenuSectionTea;
export type MenuSectionTea$key = {
  +$data?: MenuSectionTea$data,
  +$fragmentRefs: MenuSectionTea$ref,
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
  "name": "MenuSectionTea",
  "selections": [
    {
      "alias": "teaMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "TEA"
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
(node: any).hash = 'ba30927cc521f851bada3d3e03b5f41a';
export default node;
