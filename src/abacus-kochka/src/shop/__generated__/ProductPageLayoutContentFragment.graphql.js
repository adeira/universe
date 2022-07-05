/**
 * @generated SignedSource<<0fe2befe8de8c6ace829e3ed58ddab19>>
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
declare export opaque type ProductPageLayoutContentFragment$fragmentType: FragmentType;
export type ProductPageLayoutContentFragment$data = {|
  +product: {|
    +description: ?string,
    +images: $ReadOnlyArray<{|
      +blurhash: string,
      +url: string,
    |}>,
    +name: string,
    +price: {|
      +unitAmount: number,
      +unitAmountCurrency: SupportedCurrency,
    |},
  |},
  +$fragmentType: ProductPageLayoutContentFragment$fragmentType,
|};
export type ProductPageLayoutContentFragment$key = {
  +$data?: ProductPageLayoutContentFragment$data,
  +$fragmentSpreads: ProductPageLayoutContentFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "clientLocale"
    },
    {
      "kind": "RootArgument",
      "name": "productKey"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductPageLayoutContentFragment",
  "selections": [
    {
      "alias": "product",
      "args": [
        {
          "kind": "Variable",
          "name": "clientLocale",
          "variableName": "clientLocale"
        },
        {
          "kind": "Variable",
          "name": "productKey",
          "variableName": "productKey"
        }
      ],
      "concreteType": "Product",
      "kind": "LinkedField",
      "name": "getPublishedProductByKey",
      "plural": false,
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "images",
          "plural": true,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceQuery",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "25b9cb14a78a2036adcb15d3fd6edeee";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductPageLayoutContentFragment$fragmentType,
  ProductPageLayoutContentFragment$data,
>*/);
