// @flow

import { type Node } from 'react';
import fbt from 'fbt';

import { Link, Text } from '../index';

export const testString = (): Node => {
  return <Text>test string</Text>;
};

export const testFbt = (): Node => {
  return (
    <Text>
      <fbt desc="test" doNotExtract={true}>
        test fbt <fbt:param name="parameter">parameter</fbt:param>
      </fbt>
    </Text>
  );
};

export const testAnchor = (): Node => {
  return (
    <Text>
      test <Link href="https://en.wikipedia.org/wiki/Imao_Keinen">yadada</Link> anchor
    </Text>
  );
};

export const testTextInsideText = (): Node => {
  return (
    <Text>
      text{' '}
      <Text>
        inside <Text>text</Text>
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
      {/* $FlowExpectedError[incompatible-type]: number is not valid */}
      <Text>{-1}</Text>
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
