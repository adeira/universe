/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
type ProductFormAddonsData$ref = any;
type ProductFormCategoriesData$ref = any;
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductEditFormData$ref: FragmentReference;
declare export opaque type ProductEditFormData$fragmentType: ProductEditFormData$ref;
export type ProductEditFormData = {|
  +key: string,
  +revision: string,
  +availableCategories: $ReadOnlyArray<?{|
    +$fragmentRefs: ProductFormCategoriesData$ref
  |}>,
  +availableAddons: $ReadOnlyArray<?{|
    +$fragmentRefs: ProductFormAddonsData$ref
  |}>,
  +price: {|
    +unitAmount: number
  |},
  +selectedCategories: $ReadOnlyArray<?{|
    +id: string
  |}>,
  +selectedAddons: $ReadOnlyArray<?{|
    +id: string
  |}>,
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
var v0 = [
  {
    "kind": "Variable",
    "name": "clientLocale",
    "variableName": "clientLocale"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "description",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "clientLocale"
    }
  ],
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
      "args": (v0/*: any*/),
      "concreteType": "ProductCategory",
      "kind": "LinkedField",
      "name": "availableCategories",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProductFormCategoriesData"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "ProductAddon",
      "kind": "LinkedField",
      "name": "availableAddons",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProductFormAddonsData"
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "ProductCategory",
      "kind": "LinkedField",
      "name": "selectedCategories",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "ProductAddon",
      "kind": "LinkedField",
      "name": "selectedAddons",
      "plural": true,
      "selections": (v1/*: any*/),
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
      "selections": (v3/*: any*/),
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
      "selections": (v3/*: any*/),
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
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '681633a20f6272cb9d2dbeae0f7b4919';
export default node;
