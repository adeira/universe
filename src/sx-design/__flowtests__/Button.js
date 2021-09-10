// @flow

import Icon from '@adeira/icons';
import { type Node, type Element } from 'react';
import fbt from 'fbt';

import { Button } from '../index';

export const testString = (): Element<typeof Button> => {
  // We allow strings as children to be compatible with applications not using FBT.
  return <Button onClick={() => {}}>test string</Button>;
};

export const testFbt = (): Element<typeof Button> => {
  return (
    <Button onClick={() => {}}>
      <fbt desc="test" doNotExtract={true}>
        test fbt <fbt:param name="parameter">parameter</fbt:param>
      </fbt>
    </Button>
  );
};

export const testIcon = (): Element<typeof Button> => {
  return (
    <Button onClick={() => {}}>
      <Icon name="timeline" data-testid="timeline_icon" />
    </Button>
  );
};

export const testMultipleRestrictedNodes = (): Node => {
  return (
    <Button onClick={() => {}}>
      {'test string A'} {-1} {'test string B'}
    </Button>
  );
};

export const testValidTints = (): Node => {
  return (
    <>
      <Button onClick={() => {}} tint="default">
        default
      </Button>
      <Button onClick={() => {}} tint="secondary">
        secondary
      </Button>
      <Button onClick={() => {}} tint="success">
        success
      </Button>
      <Button onClick={() => {}} tint="warning">
        warning
      </Button>
      <Button onClick={() => {}} tint="error">
        error
      </Button>
    </>
  );
};

export const testValidProperties = (): Node => {
  return (
    <Button
      onClick={() => {}}
      isDisabled={true}
      aria-label="ellipsis"
      type="reset"
      data-testid="test-button-id"
      prefix={<Icon name="duplicate" />}
      suffix={<Icon name="postcard" />}
    >
      …
    </Button>
  );
};

export const testInvalidChildrenTypes = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: null is not valid */}
      <Button onClick={() => {}}>{null}</Button>
      {/* $FlowExpectedError[incompatible-type]: boolean is not valid */}
      <Button onClick={() => {}}>{true}</Button>
    </>
  );
};

export const testInvalidProperties = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[incompatible-type]: invalid tint */}
      <Button onClick={() => {}} tint="invalid">
        invalid tint
      </Button>
      {/* $FlowExpectedError[incompatible-type]: invalid size */}
      <Button onClick={() => {}} size="massive">
        invalid size
      </Button>
      {/* $FlowExpectedError[incompatible-type]: invalid prefix */}
      <Button onClick={() => {}} prefix="clipboard">
        invalid prefix
      </Button>
      {/* $FlowExpectedError[incompatible-type]: invalid data-testid */}
      <Button onClick={() => {}} data-testid={-1}>
        invalid test id
      </Button>
    </>
  );
};

export const testMissingOnClickCallback = (): Element<typeof Button> => {
  // $FlowExpectedError[prop-missing]: property onClick is missing
  return <Button>missing onClick</Button>;
};
