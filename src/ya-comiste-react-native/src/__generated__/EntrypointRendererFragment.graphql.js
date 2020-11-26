/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type BlockRendererFragment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type EntrypointRendererFragment$ref: FragmentReference;
declare export opaque type EntrypointRendererFragment$fragmentType: EntrypointRendererFragment$ref;
export type EntrypointRendererFragment = {|
  +blocks: ?$ReadOnlyArray<?{|
    +id: string,
    +$fragmentRefs: BlockRendererFragment$ref,
  |}>,
  +$refType: EntrypointRendererFragment$ref,
|};
export type EntrypointRendererFragment$data = EntrypointRendererFragment;
export type EntrypointRendererFragment$key = {
  +$data?: EntrypointRendererFragment$data,
  +$fragmentRefs: EntrypointRendererFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntrypointRendererFragment",
  "selections": [
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "BlockRendererFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Entrypoint",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'b8b560a47db027cd2dfd6da24c773ba9';

module.exports = node;
