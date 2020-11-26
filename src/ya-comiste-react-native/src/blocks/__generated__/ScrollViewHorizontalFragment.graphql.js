/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type BlockRendererFragment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ScrollViewHorizontalFragment$ref: FragmentReference;
declare export opaque type ScrollViewHorizontalFragment$fragmentType: ScrollViewHorizontalFragment$ref;
export type ScrollViewHorizontalFragment = {|
  +title: string,
  +blocks: ?$ReadOnlyArray<?{|
    +id: string,
    +$fragmentRefs: BlockRendererFragment$ref,
  |}>,
  +$refType: ScrollViewHorizontalFragment$ref,
|};
export type ScrollViewHorizontalFragment$data = ScrollViewHorizontalFragment;
export type ScrollViewHorizontalFragment$key = {
  +$data?: ScrollViewHorizontalFragment$data,
  +$fragmentRefs: ScrollViewHorizontalFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollViewHorizontalFragment",
  "selections": [
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
      "concreteType": "EntrypointBlock",
      "kind": "LinkedField",
      "name": "blocks",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": [
            {
              "kind": "Literal",
              "name": "allowRecursion",
              "value": false
            }
          ],
          "kind": "FragmentSpread",
          "name": "BlockRendererFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ScrollViewHorizontalBlock",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'e1eeed1202d5511276f28932b36c97da';

module.exports = node;
