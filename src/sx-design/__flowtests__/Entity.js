// @flow

import Icon from '@adeira/icons';
import { type Node, type Element } from 'react';

import { Entity, EntityField } from '../index';

export const testValidUseCase = (): Element<typeof Entity> => {
  return (
    <Entity>
      <EntityField title="Test title 1" />
      <EntityField title="Test title 2" description="Test description 1" />
      <EntityField title="Test title 3" description="Test description 2" />
      <EntityField title={-1} description={-1} />
      <EntityField title={null} description={null} />
      <EntityField title={undefined} description={undefined} />
    </Entity>
  );
};

export const testInvalidEntityChildren = (): Node => {
  return (
    <>
      {/* $FlowExpectedError[prop-missing]: children is missing */}
      <Entity />
      {/* $FlowExpectedError[incompatible-type]: only `EntityField` can be a children */}
      <Entity>yadada</Entity>
      <Entity>
        {/* $FlowExpectedError[incompatible-type]: only `EntityField` can be a children */}
        <Icon name="drag" />
      </Entity>
    </>
  );
};

export const testInvalidEntityFieldProps = (): Node => {
  return (
    <>
      {/* WARNING: `title` and `description` props are missing but there is not easy way how to type it */}
      <EntityField />
      {/* $FlowExpectedError[incompatible-type]: incompatible `title` type */}
      <EntityField title={{}} />
      {/* $FlowExpectedError[incompatible-type]: incompatible `description` type */}
      <EntityField description={{}} />
      {/* $FlowExpectedError[incompatible-type]: incompatible `title` type */}
      <EntityField title={[]} />
      {/* $FlowExpectedError[incompatible-type]: incompatible `description` type */}
      <EntityField description={[]} />
    </>
  );
};
