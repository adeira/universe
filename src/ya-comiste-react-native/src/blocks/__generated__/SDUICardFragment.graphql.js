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
  +entrypointKey: string,
  +title: string,
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
      "name": "entrypointKey",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "SDUICardComponent",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '35a3c462e69646e28fdf7c9a33823657';

module.exports = node;
