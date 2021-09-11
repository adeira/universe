// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';

import Button from '../Button/Button';
import LayoutInline from '../Layout/LayoutInline';
import Text from '../Text/Text';
import windowLocationReload from './windowLocationReload';

type Props = {
  +children: Node,
  +title?: FbtWithoutString,
  +code?: string,
  +onComponentDidCatch?: (Error, { componentStack: string, ... }) => void,
  +onRetry?: () => void,
  +showErrorMessage?: boolean, // by default only in `__DEV__`
};

type State = {
  +hasError: boolean,
  +error: Error | null,
};

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

  componentDidMount() {
    // prevents "The above error..." addendum from React (https://github.com/facebook/react/commit/3938ccc88aa3dcc5a4460474bda40af97dd6e234)
    window.addEventListener('error', (event) => event.preventDefault());
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }): void {
    if (this.props.onComponentDidCatch != null) {
      // allows to log the error to an error reporting service
      this.props.onComponentDidCatch(error, errorInfo);
    } else {
      // or simply print the error to console
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render(): Node {
    const onRetryFn = this.props.onRetry ?? windowLocationReload;
    const showErrorMessage = this.props.showErrorMessage ?? __DEV__;
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message;
      return (
        <div className={styles('error')}>
          <LayoutInline spacing="none">
            <div className={styles('h1')}>
              <Text as="h1" size={40}>
                {this.props.code ?? '5XX'}
              </Text>
            </div>
            <div className={styles('h2')}>
              <Text as="h2" size={20} weight={200}>
                {this.props.title ?? (
                  <fbt desc="generic error message">An unexpected error has occurred.</fbt>
                )}
              </Text>
            </div>
          </LayoutInline>

          {showErrorMessage && errorMessage != null ? (
            <div className={styles('errorDev')} data-testid="errorDev">
              <pre className={styles('errorDevPre')}>{errorMessage}</pre>
            </div>
          ) : null}

          <Button onClick={() => onRetryFn()}>
            <fbt desc="error boundary retry button title">Retry</fbt>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = sx.create({
  error: {
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
  },
  h1: {
    borderInlineEnd: '1px solid rgba(var(--sx-foreground), 0.3)',
    paddingInlineEnd: 20,
  },
  h2: {
    paddingInlineStart: 20,
    alignSelf: 'center',
  },
  errorDev: {
    width: 500,
    fontSize: 14,
    textAlign: 'start',
    paddingBlock: '.5rem',
    paddingInline: '2rem',
    color: 'rgba(var(--sx-warning-dark))',
    backgroundColor: 'rgba(var(--sx-warning-lighter))',
    borderRadius: 'var(--sx-radius)',
  },
  errorDevPre: {
    whiteSpace: 'pre-wrap',
  },
});
