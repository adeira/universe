/**
 * @generated SignedSource<<da7551136227c19430d7d6be950e4acf>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: yarn workspace @adeira/ya-comiste-backoffice relay
 */

/* eslint-disable */

'use strict';

/*::
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
*/

var node/*: ReaderFragment*/ = {
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

if (__DEV__) {
  (node/*: any*/).hash = "5083a6dabf247d6d6a211ccee56e772a";
}

module.exports = node;
