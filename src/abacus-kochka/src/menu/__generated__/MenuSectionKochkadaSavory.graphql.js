/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionKochkadaSavory$ref: FragmentReference;
declare export opaque type MenuSectionKochkadaSavory$fragmentType: MenuSectionKochkadaSavory$ref;
export type MenuSectionKochkadaSavory = {|
  +kochkadaSavoryMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionKochkadaSavory$ref,
|};
export type MenuSectionKochkadaSavory$data = MenuSectionKochkadaSavory;
export type MenuSectionKochkadaSavory$key = {
  +$data?: MenuSectionKochkadaSavory$data,
  +$fragmentRefs: MenuSectionKochkadaSavory$ref,
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
// prettier-ignore
(node: any).hash = '6140475a005f70edc685bfd546178cf4';
export default node;
