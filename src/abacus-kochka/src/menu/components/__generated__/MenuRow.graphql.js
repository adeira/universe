/**
 * @generated SignedSource<<9d5c8dc7038265550f099b3c0fd84885>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type MenuRow$fragmentType: FragmentType;
export type MenuRow$data = {|
  +description: ?string,
  +name: string,
  +price: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +$fragmentType: MenuRow$fragmentType,
|};
export type MenuRow$key = {
  +$data?: MenuRow$data,
  +$fragmentSpreads: MenuRow$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
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

if (__DEV__) {
  (node/*: any*/).hash = "0dfe65ad52cd8b7bd967d49f64ed44f9";
}

module.exports = ((node/*: any*/)/*: Fragment<
  MenuRow$fragmentType,
  MenuRow$data,
>*/);
