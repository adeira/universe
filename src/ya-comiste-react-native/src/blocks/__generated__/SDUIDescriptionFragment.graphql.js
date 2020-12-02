/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SDUIDescriptionFragment$ref: FragmentReference;
declare export opaque type SDUIDescriptionFragment$fragmentType: SDUIDescriptionFragment$ref;
export type SDUIDescriptionFragment = {|
  +text: string,
  +$refType: SDUIDescriptionFragment$ref,
|};
export type SDUIDescriptionFragment$data = SDUIDescriptionFragment;
export type SDUIDescriptionFragment$key = {
  +$data?: SDUIDescriptionFragment$data,
  +$fragmentRefs: SDUIDescriptionFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SDUIDescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "SDUIDescriptionComponent",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '774ff4a6f1fd14b5317f80776300d2aa';

module.exports = node;
