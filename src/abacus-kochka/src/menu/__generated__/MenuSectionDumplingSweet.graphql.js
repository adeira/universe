/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionDumplingSweet$ref: FragmentReference;
declare export opaque type MenuSectionDumplingSweet$fragmentType: MenuSectionDumplingSweet$ref;
export type MenuSectionDumplingSweet = {|
  +sumplingSweetMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionDumplingSweet$ref,
|};
export type MenuSectionDumplingSweet$data = MenuSectionDumplingSweet;
export type MenuSectionDumplingSweet$key = {
  +$data?: MenuSectionDumplingSweet$data,
  +$fragmentRefs: MenuSectionDumplingSweet$ref,
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
  "name": "MenuSectionDumplingSweet",
  "selections": [
    {
      "alias": "sumplingSweetMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "DUMPLING_SWEET"
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
(node: any).hash = '9ef5d1d3cdf5521bfca54fc66e2d1611';
export default node;
