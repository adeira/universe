/**
 * @generated SignedSource<<c4aeb9f7a11b174dff195236656a9d4f>>
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
declare export opaque type ProductsCardsData$fragmentType: FragmentType;
export type ProductsCardsData$data = $ReadOnlyArray<{|
  +id: string,
  +imageCover: ?{|
    +blurhash: string,
    +url: string,
  |},
  +isPublished: boolean,
  +key: string,
  +name: string,
  +price: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +$fragmentType: ProductsCardsData$fragmentType,
|}>;
export type ProductsCardsData$key = $ReadOnlyArray<{
  +$data?: ProductsCardsData$data,
  +$fragmentSpreads: ProductsCardsData$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProductsCardsData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "imageCover",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blurhash",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPublished",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "7109a74f00365ae495c2967a968c658e";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductsCardsData$fragmentType,
  ProductsCardsData$data,
>*/);
