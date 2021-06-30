/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductEditFormData$ref: FragmentReference;
declare export opaque type ProductEditFormData$fragmentType: ProductEditFormData$ref;
export type ProductEditFormData = {|
  +key: string,
  +revision: string,
  +price: {|
    +unitAmount: number
  |},
  +visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  +enTranslation: ?{|
    +name: string,
    +description: ?string,
  |},
  +esTranslation: ?{|
    +name: string,
    +description: ?string,
  |},
  +images: $ReadOnlyArray<{|
    +name: string
  |}>,
  +$refType: ProductEditFormData$ref,
|};
export type ProductEditFormData$data = ProductEditFormData;
export type ProductEditFormData$key = {
  +$data?: ProductEditFormData$data,
  +$fragmentRefs: ProductEditFormData$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "description",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductEditFormData",
  "selections": [
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
      "name": "revision",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProductPrice",
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibility",
      "storageKey": null
    },
    {
      "alias": "enTranslation",
      "args": [
        {
          "kind": "Literal",
          "name": "locale",
          "value": "en_US"
        }
      ],
      "concreteType": "ProductMultilingualTranslations",
      "kind": "LinkedField",
      "name": "translation",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "translation(locale:\"en_US\")"
    },
    {
      "alias": "esTranslation",
      "args": [
        {
          "kind": "Literal",
          "name": "locale",
          "value": "es_MX"
        }
      ],
      "concreteType": "ProductMultilingualTranslations",
      "kind": "LinkedField",
      "name": "translation",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "translation(locale:\"es_MX\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'b455ee031c8188ab197ac393d0633064';
export default node;
