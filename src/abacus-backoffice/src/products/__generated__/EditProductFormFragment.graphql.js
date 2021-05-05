/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EditProductFormFragment$ref: FragmentReference;
declare export opaque type EditProductFormFragment$fragmentType: EditProductFormFragment$ref;
export type EditProductFormFragment = {|
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
  +$refType: EditProductFormFragment$ref,
|};
export type EditProductFormFragment$data = EditProductFormFragment;
export type EditProductFormFragment$key = {
  +$data?: EditProductFormFragment$data,
  +$fragmentRefs: EditProductFormFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
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
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditProductFormFragment",
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
      "selections": (v0/*: any*/),
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
      "selections": (v0/*: any*/),
      "storageKey": "translation(locale:\"es_MX\")"
    }
  ],
  "type": "Product",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '0e28eb86985cd5f99e05df9800e5642b';
export default node;
