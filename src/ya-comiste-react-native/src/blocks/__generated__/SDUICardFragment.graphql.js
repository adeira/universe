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
  +imageBackgroundUrl: ?string,
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageBackgroundUrl",
      "storageKey": null
    }
  ],
  "type": "SDUICardComponent",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'd29ce486270ce1840bad006259df29f5';

module.exports = node;
