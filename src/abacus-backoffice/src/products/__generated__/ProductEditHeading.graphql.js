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
      "name": "isPublished",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'f16ba12544552aac568f7f96b1802528';
export default node;
