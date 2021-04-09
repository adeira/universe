// @flow

import sx from '@adeira/sx';
import TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import '../index'; // the serializer itself

function TestComponent() {
  const styles = sx.create({ test: { color: 'red' } });
  return <div className={styles('test')}>test component</div>;
}

it('works as expected with "react-test-renderer"', () => {
  const testRenderer = TestRenderer.create(<TestComponent />);
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

it('works as expected "@testing-library/react"', () => {
  const { container } = render(<TestComponent />);
  expect(container).toMatchSnapshot();
});
