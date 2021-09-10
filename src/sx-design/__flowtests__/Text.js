// @flow

import { type Node, type Element } from 'react';
import fbt from 'fbt';

import { Link, Text } from '../index';

export const testString = (): Element<typeof Text> => {
  return <Text>test string</Text>;
};

export const testFbt = (): Element<typeof Text> => {
  return (
    <Text>
      <fbt desc="test" doNotExtract={true}>
        test fbt <fbt:param name="parameter">parameter</fbt:param>
      </fbt>
    </Text>
  );
};

export const testAnchor = (): Element<typeof Text> => {
  return (
    <Text>
      test <Link href="https://en.wikipedia.org/wiki/Imao_Keinen">yadada</Link> anchor
    </Text>
  );
};

export const testStringWithNumber = (): Element<typeof Text> => {
  return <Text>test string with number: {-1}</Text>;
};

export const testTextInsideTextInsideText = (): Element<typeof Text> => {
  return (
    <Text>
      text{' '}
      <Text>
        inside{' '}
        <Text>
          inside <Text>text</Text>
        </Text>
      </Text>
    </Text>
  );
};

export const testInvalidTypes = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: null is not valid */}
      <Text>{null}</Text>
      {/* $FlowExpectedError[incompatible-type]: boolean is not valid */}
      <Text>{true}</Text>
    </>
  );
};

export const testInvalidProperties = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: 999 is not one of the supported values */}
      <Text size={999}>test</Text>
      {/* $FlowExpectedError[incompatible-type]: -1 is not one of the supported values */}
      <Text weight={-1}>test</Text>
      {/* $FlowExpectedError[incompatible-type]: "yadada" is not one of the supported values */}
      <Text transform="yadada">test</Text>
      {/* $FlowExpectedError[incompatible-type]: "marquee" is not one of the supported values */}
      <Text as="marquee">test</Text>
    </>
  );
};
