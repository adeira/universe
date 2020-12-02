/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SDUIJumbotronFragment$ref: FragmentReference;
declare export opaque type SDUIJumbotronFragment$fragmentType: SDUIJumbotronFragment$ref;
export type SDUIJumbotronFragment = {|
  +title: string,
  +$refType: SDUIJumbotronFragment$ref,
|};
export type SDUIJumbotronFragment$data = SDUIJumbotronFragment;
export type SDUIJumbotronFragment$key = {
  +$data?: SDUIJumbotronFragment$data,
  +$fragmentRefs: SDUIJumbotronFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SDUIJumbotronFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "SDUIJumbotronComponent",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '5ace4861423c3ee01e8b3afd80dcd609';

module.exports = node;
