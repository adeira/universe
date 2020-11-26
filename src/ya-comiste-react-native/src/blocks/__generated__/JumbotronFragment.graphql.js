/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type JumbotronFragment$ref: FragmentReference;
declare export opaque type JumbotronFragment$fragmentType: JumbotronFragment$ref;
export type JumbotronFragment = {|
  +title: string,
  +$refType: JumbotronFragment$ref,
|};
export type JumbotronFragment$data = JumbotronFragment;
export type JumbotronFragment$key = {
  +$data?: JumbotronFragment$data,
  +$fragmentRefs: JumbotronFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JumbotronFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "JumbotronBlock",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'eceef8359c4508d94c6e1e3ca701b737';

module.exports = node;
