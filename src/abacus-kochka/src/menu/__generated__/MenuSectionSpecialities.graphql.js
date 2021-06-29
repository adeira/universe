/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type MenuRow$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuSectionSpecialities$ref: FragmentReference;
declare export opaque type MenuSectionSpecialities$fragmentType: MenuSectionSpecialities$ref;
export type MenuSectionSpecialities = {|
  +specialitiesMenu: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: MenuRow$ref,
  |}>,
  +$refType: MenuSectionSpecialities$ref,
|};
export type MenuSectionSpecialities$data = MenuSectionSpecialities;
export type MenuSectionSpecialities$key = {
  +$data?: MenuSectionSpecialities$data,
  +$fragmentRefs: MenuSectionSpecialities$ref,
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
  "name": "MenuSectionSpecialities",
  "selections": [
    {
      "alias": "specialitiesMenu",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Literal",
          "name": "section",
          "value": "SPECIALITIES"
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
(node: any).hash = '588f863b6281b508dc66297669402400';
export default node;
