// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { QueryRenderer, type GraphQLTaggedNode } from '@adeira/relay';
import { Section } from '@adeira/sx-design';
import type { Variables } from '@adeira/relay-runtime';

import Navigation from './Navigation';

type Props<T> =
  | {|
      +onResponse: (null) => Node,
    |}
  | {|
      +query: GraphQLTaggedNode,
      +onResponse: (T) => Node,
      +onLoading?: () => Node,
      +variables?: Variables,
    |};

export default function LayoutQueryRenderer<T>(props: $ReadOnly<Props<T>>): Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('navigation')}>
        <Navigation />
      </div>

      <main className={styles('main')}>
        <Section>
          {props.query ? (
            <QueryRenderer
              query={props.query}
              variables={props.variables ?? {}}
              onLoading={props.onLoading}
              onResponse={props.onResponse}
            />
          ) : (
            props.onResponse(null)
          )}
        </Section>
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
  },
  navigation: {
    flex: 1,
    width: '200px',
    position: 'fixed',
  },
  main: {
    flex: 1,
    marginLeft: '200px',
    backgroundColor: 'white',
    padding: '1rem',
  },
});
