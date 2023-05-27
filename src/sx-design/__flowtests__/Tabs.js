// @flow

import { type Element } from 'react';
import fbt from 'fbt';

import { Tabs } from '../index';

export const testBasicUsage = (): Element<typeof Tabs> => {
  return (
    <Tabs
      selected={'aaa'}
      setSelected={(_: string | number | null) => {}}
      tabs={[
        {
          title: (
            <fbt desc="string" doNotExtract={true}>
              STRING
            </fbt>
          ),
          value: 'string',
        },
        {
          title: (
            <fbt desc="number" doNotExtract={true}>
              NUMBER
            </fbt>
          ),
          value: 42,
        },
      ]}
    />
  );
};

export const testIncorrectValueType = (): Element<typeof Tabs> => {
  return (
    <Tabs
      // $FlowExpectedError[incompatible-type]: void type is not allowed
      selected={undefined}
      setSelected={(
        // $FlowExpectedError[incompatible-type]: number is not compatible with void (which is not valid anyway)
        _: number,
      ) => {}}
      tabs={[
        {
          title: (
            <fbt desc="undefined" doNotExtract={true}>
              UNDEFINED
            </fbt>
          ),
          // $FlowExpectedError[incompatible-type]: void type is not allowed
          value: undefined,
        },
      ]}
    />
  );
};
