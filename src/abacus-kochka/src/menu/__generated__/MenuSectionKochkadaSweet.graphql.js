/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionKochkadaSweet$ref: FragmentReference;
declare export opaque type MenuSectionKochkadaSweet$fragmentType: MenuSectionKochkadaSweet$ref;
export type MenuSectionKochkadaSweet = {|
  +kochkadaSweetMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionKochkadaSweet$ref,
|};
export type MenuSectionKochkadaSweet$data = MenuSectionKochkadaSweet;
export type MenuSectionKochkadaSweet$key = {
  +$data?: MenuSectionKochkadaSweet$data,
  +$fragmentRefs: MenuSectionKochkadaSweet$ref,
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
  "name": "MenuSectionKochkadaSweet",
  "selections": [
    {
      "alias": "kochkadaSweetMenu",
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
(node: any).hash = 'f986851f1127acd1499898269a9038c3';
export default node;
