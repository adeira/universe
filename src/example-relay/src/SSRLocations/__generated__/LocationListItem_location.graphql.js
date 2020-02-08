/**
 * @flow
 */

/* eslint-disable */
// flowlint untyped-type-import:off

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationListItem_location$ref: FragmentReference;
declare export opaque type LocationListItem_location$fragmentType: LocationListItem_location$ref;
export type LocationListItem_location = {|
  +name: ?string,
  +$refType: LocationListItem_location$ref,
|};
export type LocationListItem_location$data = LocationListItem_location;
export type LocationListItem_location$key = {
  +$data?: LocationListItem_location$data,
  +$fragmentRefs: LocationListItem_location$ref,
  ...
};


const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "LocationListItem_location",
  "type": "Location",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node: any).hash = 'f612186461796d05fd950095fd0680ab';
export default node;
