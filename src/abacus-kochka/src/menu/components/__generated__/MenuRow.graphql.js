/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type MenuRow$ref: FragmentReference;
declare export opaque type MenuRow$fragmentType: MenuRow$ref;
export type MenuRow = {|
  +name: string,
  +description: ?string,
  +price: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +$refType: MenuRow$ref,
|};
export type MenuRow$data = MenuRow;
export type MenuRow$key = {
  +$data?: MenuRow$data,
  +$fragmentRefs: MenuRow$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuRow",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "price",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmountCurrency",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '0dfe65ad52cd8b7bd967d49f64ed44f9';
export default node;
