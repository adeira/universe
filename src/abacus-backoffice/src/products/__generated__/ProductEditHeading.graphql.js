/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProductEditHeading$ref: FragmentReference;
declare export opaque type ProductEditHeading$fragmentType: ProductEditHeading$ref;
export type ProductEditHeading = {|
  +key: string,
  +name: string,
  +isPublished: boolean,
  +$refType: ProductEditHeading$ref,
|};
export type ProductEditHeading$data = ProductEditHeading;
export type ProductEditHeading$key = {
  +$data?: ProductEditHeading$data,
  +$fragmentRefs: ProductEditHeading$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductEditHeading",
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
      "name": "name",
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
// prettier-ignore
(node: any).hash = '23ea1991f3bc6f0a3e444564c89e8683';
export default node;
