/**
 * @flow
 */

/* eslint-disable */

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type EditProductHeading$ref: FragmentReference;
declare export opaque type EditProductHeading$fragmentType: EditProductHeading$ref;
export type EditProductHeading = {|
  +key: string,
  +isPublished: boolean,
  +$refType: EditProductHeading$ref,
|};
export type EditProductHeading$data = EditProductHeading;
export type EditProductHeading$key = {
  +$data?: EditProductHeading$data,
  +$fragmentRefs: EditProductHeading$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditProductHeading",
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
(node: any).hash = '5083a6dabf247d6d6a211ccee56e772a';
export default node;
