// @flow strict

/* eslint-disable no-useless-constructor, no-unused-vars */

const React = {
  Component: class Component<S, P> {},
};

type Props = {};
type State = {};

export default class MyComponent extends React.Component<void, State> {
  props: Props;

  static defaultProps: Props = { ...null };
  static displayName: string = 'MyAwesomeComponent';

  state: State = { ...null };
  somethingElse: boolean = true;

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

  renderSomething(): null {
    return null;
  }

  render(): null {
    return null;
  }
}
