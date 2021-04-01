/**
 * @generated SignedSource<<a9902ee3c515a5c111d6dfd5b304ab74>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./node_modules/.bin/relay-compiler
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductsCardsData$fragmentType: FragmentType;
export type ProductsCardsData$ref = ProductsCardsData$fragmentType;
export type ProductsCardsData$data = $ReadOnlyArray<{|
  +id: string,
  +key: string,
  +name: string,
  +imageCover: ?{|
    +blurhash: string,
    +url: string,
  |},
  +price: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +isPublished: boolean,
  +$fragmentType: ProductsCardsData$fragmentType,
|}>;
export type ProductsCardsData = ProductsCardsData$data;
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
