/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SDUICardFragment$ref: FragmentReference;
declare export opaque type SDUICardFragment$fragmentType: SDUICardFragment$ref;
export type SDUICardFragment = {|
  +pageID: string,
  +$refType: SDUICardFragment$ref,
|};
export type SDUICardFragment$data = SDUICardFragment;
export type SDUICardFragment$key = {
  +$data?: SDUICardFragment$data,
  +$fragmentRefs: SDUICardFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SDUICardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pageID",
      "storageKey": null
    }
  ],
  "type": "SDUICardComponent",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'a88f4360c36948c355b229be9a766651';

module.exports = node;
