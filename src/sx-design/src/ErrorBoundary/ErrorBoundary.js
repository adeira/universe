// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';

import Heading from '../Heading/Heading';
import Section from '../Section';

type Props = {|
  +children: Node,
  +title?: FbtWithoutString,
  +code?: string,
  +onComponentDidCatch?: (Error, { componentStack: string, ... }) => void,
  +onRetry?: () => void,
|};

type State = {|
  +hasError: boolean,
|};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }): void {
    if (this.props.onComponentDidCatch != null) {
      // log the error to an error reporting service
      this.props.onComponentDidCatch(error, errorInfo);
    }
  }

  render(): Node {
    // eslint-disable-next-line no-undef
    const onRetryFn = this.props.onRetry ?? window.location.reload;
    if (this.state.hasError) {
      return (
        <div className={styles('error')}>
          <div>
            <Heading xstyle={styles.h1}>{this.props.code ?? '5XX'}</Heading>
            <Section xstyle={styles.desc}>
              <Heading xstyle={styles.h2}>
                {this.props.title ??
                  fbt('An unexpected error has occurred.', 'generic error message')}
              </Heading>
            </Section>
          </div>
          <div className={styles('retry')}>
            <button type="button" onClick={() => onRetryFn()}>
              <fbt desc="error boundary retry button title">Retry</fbt>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = sx.create({
  error: {
    color: 'var(--sx-color-dark, #1c1e21)',
    background: 'var(--sx-color-light, white)',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: 49,
    verticalAlign: 'middle',
  },
  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: 20,
    padding: '10px 23px 10px 0',
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: 'top',
  },
  h2: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
  },
  retry: {
    fontSize: 14,
    marginTop: 20,
  },
});
