/**
 * @generated SignedSource<<9de1e8facc838e017caa958416ef7bb5>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ProductFormAddonsData$fragmentType = any;
type ProductFormCategoriesData$fragmentType = any;
export type ProductMultilingualInputVisibility = "ESHOP" | "POS" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ProductEditFormData$fragmentType: FragmentType;
export type ProductEditFormData$data = {|
  +availableAddons: $ReadOnlyArray<?{|
    +$fragmentSpreads: ProductFormAddonsData$fragmentType,
  |}>,
  +availableCategories: $ReadOnlyArray<?{|
    +$fragmentSpreads: ProductFormCategoriesData$fragmentType,
  |}>,
  +enTranslation: ?{|
    +description: ?string,
    +name: string,
  |},
  +esTranslation: ?{|
    +description: ?string,
    +name: string,
  |},
  +images: $ReadOnlyArray<{|
    +name: string,
  |}>,
  +key: string,
  +price: {|
    +unitAmount: number,
  |},
  +revision: string,
  +selectedAddons: $ReadOnlyArray<?{|
    +id: string,
  |}>,
  +selectedCategories: $ReadOnlyArray<?{|
    +id: string,
  |}>,
  +visibility: $ReadOnlyArray<ProductMultilingualInputVisibility>,
  +$fragmentType: ProductEditFormData$fragmentType,
|};
export type ProductEditFormData$key = {
  +$data?: ProductEditFormData$data,
  +$fragmentSpreads: ProductEditFormData$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
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

if (__DEV__) {
  (node/*: any*/).hash = "681633a20f6272cb9d2dbeae0f7b4919";
}

module.exports = ((node/*: any*/)/*: Fragment<
  ProductEditFormData$fragmentType,
  ProductEditFormData$data,
>*/);
