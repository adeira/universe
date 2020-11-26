/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DescriptionFragment$ref: FragmentReference;
declare export opaque type DescriptionFragment$fragmentType: DescriptionFragment$ref;
export type DescriptionFragment = {|
  +text: string,
  +$refType: DescriptionFragment$ref,
|};
export type DescriptionFragment$data = DescriptionFragment;
export type DescriptionFragment$key = {
  +$data?: DescriptionFragment$data,
  +$fragmentRefs: DescriptionFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "DescriptionBlock",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'aca690b6c6e34e7fea9044b352cd0fa2';

module.exports = node;
