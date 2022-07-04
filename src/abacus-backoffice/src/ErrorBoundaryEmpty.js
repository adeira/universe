// @flow

import React, { type Node } from 'react';

type Props = {
  +children: Node,
};

type State = {
  +hasError: boolean,
};

/**
 * This Error Boundary essentially swallows the error and should be used only in very rare
 * situations when you really want to ignore such errors.
 */
export default class ErrorBoundaryEmpty extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    // prevents "The above error..." addendum from React (https://github.com/facebook/react/commit/3938ccc88aa3dcc5a4460474bda40af97dd6e234)
    window.addEventListener('error', (event) => event.preventDefault());
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }): void {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render(): Node {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
