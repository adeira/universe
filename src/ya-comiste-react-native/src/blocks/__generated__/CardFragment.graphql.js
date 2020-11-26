/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CardFragment$ref: FragmentReference;
declare export opaque type CardFragment$fragmentType: CardFragment$ref;
export type CardFragment = {|
  +pageID: string,
  +$refType: CardFragment$ref,
|};
export type CardFragment$data = CardFragment;
export type CardFragment$key = {
  +$data?: CardFragment$data,
  +$fragmentRefs: CardFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pageID",
      "storageKey": null
    }
  ],
  "type": "CardBlock",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '9e84a4936a77bf22f710e5ea0167467b';

module.exports = node;
