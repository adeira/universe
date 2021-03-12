// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';

import Heading from '../Heading/Heading';
import Section from '../Section/Section';

type Props = {|
  +children: Node,
  +title?: FbtWithoutString,
  +code?: string,
  +onComponentDidCatch?: (Error, { componentStack: string, ... }) => void,
  +onRetry?: () => void,
|};

type State = {|
  +hasError: boolean,
  +error: Error | null,
|};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
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
      const errorMessage = this.state.error?.message;
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
          {__DEV__ && errorMessage != null ? (
            <div className={styles('errorDev')}>
              <pre className={styles('errorDevPre')}>{errorMessage}</pre>
            </div>
          ) : null}
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
  errorDev: {
    maxWidth: 550,
    fontSize: 14,
    textAlign: 'left',
    padding: '.5rem .5rem 1rem 1rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    color: 'rgb(86, 61, 20)',
    backgroundColor: 'rgb(254, 250, 223)',
  },
  errorDevPre: {
    whiteSpace: 'pre-wrap',
  },
  retry: {
    fontSize: 14,
  },
});
