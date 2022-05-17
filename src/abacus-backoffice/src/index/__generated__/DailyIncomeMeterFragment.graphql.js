/**
 * @generated SignedSource<<b782a517e281b3d6c0ab420696bd1d16>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 * @codegen-command: ./x relay
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type SupportedCurrency = "MXN" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type DailyIncomeMeterFragment$fragmentType: FragmentType;
export type DailyIncomeMeterFragment$data = {|
  +total: {|
    +unitAmount: number,
    +unitAmountCurrency: SupportedCurrency,
  |},
  +$fragmentType: DailyIncomeMeterFragment$fragmentType,
|};
export type DailyIncomeMeterFragment$key = {
  +$data?: DailyIncomeMeterFragment$data,
  +$fragmentSpreads: DailyIncomeMeterFragment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DailyIncomeMeterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "total",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "unitAmountCurrency",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AnalyticsDailyReportInfo",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "786d6a7b303d25c21a6f007c6bfff433";
}

module.exports = ((node/*: any*/)/*: Fragment<
  DailyIncomeMeterFragment$fragmentType,
  DailyIncomeMeterFragment$data,
>*/);
