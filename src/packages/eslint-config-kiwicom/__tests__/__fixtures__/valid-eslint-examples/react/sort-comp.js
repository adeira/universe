// @flow strict

/* eslint-disable no-useless-constructor, no-unused-vars */

const React = {
  Component: class Component<S, P> {},
};

type Props = {||};

export default class MyComponent extends React.Component<void, Props> {
  props: Props;

  static defaultProps = {};
  static displayName = 'MyAwesomeComponent';

  state = {};
  somethingElse = true;

  constructor() {
    super();
  }

  static getDerivedStateFromProps() {}

  static getDerivedStateFromError() {}

  componentDidMount() {}

  shouldComponentUpdate() {}

  getSnapshotBeforeUpdate() {}

  componentDidUpdate() {}

  componentDidCatch() {}

  componentWillUnmount() {}

  onClick() {}

  handleSomeEvent() {}

  renderSomething() {
    return null;
  }

  render() {
    return null;
  }
}
