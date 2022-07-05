/**
 * @generated SignedSource<<7ef498c5724ab92f4a0d979c873ceeb4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ProductPageLayoutContentFragment$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductPageLayoutFragment$fragmentType: FragmentType;
export type ProductPageLayoutFragment$data = {|
  +commerce: {|
    +$fragmentSpreads: ProductPageLayoutContentFragment$fragmentType,
  |},
  +$fragmentType: ProductPageLayoutFragment$fragmentType,
|};
export type ProductPageLayoutFragment$key = {
  +$data?: ProductPageLayoutFragment$data,
  +$fragmentSpreads: ProductPageLayoutFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductPageLayoutFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceQuery",
      "kind": "LinkedField",
      "name": "commerce",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProductPageLayoutContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "f949ae6c4715149c94e7351e4561e1f2";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductPageLayoutFragment$fragmentType,
  ProductPageLayoutFragment$data,
>*/);
