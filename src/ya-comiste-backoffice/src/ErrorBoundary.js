// @flow

import React, { type Node } from 'react';
import { Heading } from '@adeira/sx-design';
import fbt from 'fbt';

type Props = {|
  +children: Node,
|};

type State = {|
  +hasError: boolean,
|};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }) {
    // TODO: log the error to an error reporting service
    console.error(error); // eslint-disable-line no-console
    console.error(errorInfo); // eslint-disable-line no-console
  }

  render(): Node {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Heading>
          <fbt desc="generic error message">Something went wrong.</fbt>
        </Heading>
      );
    }

    return this.props.children;
  }
}
