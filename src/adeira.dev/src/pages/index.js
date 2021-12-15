/* eslint-disable ft-flow/require-valid-file-annotation, import/no-unresolved */

import * as React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Index() {
  const context = useDocusaurusContext();
  const { siteConfig } = context;

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomeSplash siteConfig={siteConfig} />
      <div className="mainContainer">
        <Description />
      </div>
    </Layout>
  );
}

function HomeSplash({ siteConfig }) {
  return (
    <SplashContainer>
      <div className="inner">
        <ProjectTitle title={siteConfig.title} tagline={siteConfig.tagline} />
      </div>
    </SplashContainer>
  );
}

function SplashContainer(props) {
  return (
    <div className="homeContainer">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  );
}

function ProjectTitle({ title, tagline }) {
  return (
    <header className="projectTitle">
      <h2>{title}</h2>
      <h4>{tagline}</h4>
    </header>
  );
}

function Description() {
  return (
    <div className="adeiraHomepageContainer">
      <p>
        <code>adeira/universe</code> is monorepo with the collections of libraries we write to make
        our code better & more efficient. All the libraries listed below were created and developed
        to satisfy the needs of daily work and are battle-tested in our production applications.
      </p>
      <p>
        Most of the tools cover these topics: <strong>GraphQL & Relay</strong>,{' '}
        <strong>ESLint</strong> or utilities for monorepo and CI scripts.
      </p>
      <h2>Selected packages included in our monorepo</h2>
      <p>
        Also available on <a href="https://www.npmjs.com/org/adeira">NPM</a>
      </p>
      <p>
        Complete list of all our projects:{' '}
        <a href="https://github.com/adeira/universe/tree/master/src">
          https://github.com/adeira/universe/tree/master/src
        </a>
      </p>
      <h3>Utility libraries</h3>
      <ul>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/js#readme">@adeira/js</a>
          </strong>
          <span> - Set of small helper functions for assertions, debugging etc.</span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/fetch#readme">
              @adeira/fetch
            </a>
          </strong>
          <span> - Replacement for any fetch function with retries and timeouts included.</span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/logger#readme">
              @adeira/logger
            </a>
          </strong>
          <span> - Multiplatform logger with support for Node.js, Browser and React Native.</span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/monorepo-utils#readme">
              @adeira/monorepo-utils
            </a>
          </strong>
          <span>
            {' '}
            - Utilities <em>not only</em> for monorepos - to write custom CI scripts, hooks, detect
            changed files, touched workspaces and more.
          </span>
        </li>
      </ul>
      <h3>Babel</h3>
      <ul>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/babel-preset-adeira#readme">
              @adeira/babel-preset-adeira
            </a>
          </strong>
          <span>
            {' '}
            - Simplify your babel config by using single preset which includes all necessary plugins
            for standard React + Flow app with support to transpile files to different targets (ESM
            modules, flow files, browser-compatible JS)
          </span>
        </li>
      </ul>
      <h3>ESLint</h3>
      <ul>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/eslint-config-adeira#readme">
              @adeira/eslint-config-adeira
            </a>
          </strong>
          <span> - ESLint configuration with strict set of rules.</span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/eslint-plugin-adeira#readme">
              eslint-plugin-adeira
            </a>
          </strong>
          <span>
            {' '}
            - Set of additional ESLint rules, mainly to keep the code cleaner in Relay Modern apps
            and GraphQL servers. These rules are applied automatically when you use{' '}
            <code>@adeira/babel-preset-adeira</code> config.
          </span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/eslint-runner#readme">
              @adeira/eslint-runner
            </a>
          </strong>
          <span>
            {' '}
            - ESLint runner using Jest parallelization & checking only subset of files with last
            changes, useful especially within monorepos or/and large codebases to speedup checks.
          </span>
        </li>
      </ul>
      <h3>GraphQL</h3>
      <ul>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/graphql-bc-checker#readme">
              @adeira/graphql-bc-checker
            </a>
          </strong>
          <span>
            {' '}
            - Library to check & prevent accidental breaking changes in your GraphQL schema.
          </span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/graphql-global-id#readme">
              @adeira/graphql-global-id
            </a>
          </strong>
          <span> - Utility to manage our ID fields in GraphQL correctly.</span>
        </li>
      </ul>
      <h3>Relay</h3>
      <ul>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/relay#readme">
              @adeira/relay
            </a>
          </strong>
          <span>
            {' '}
            - Thin layer over Relay modern library which includes support for uploadables, query
            logging or stored operations.
          </span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/relay-utils#readme">
              @adeira/relay-utils
            </a>
          </strong>
          <span>
            {' '}
            - Additional relay utility functions for common code patters, e.g. to get data from
            relay cache.
          </span>
        </li>
        <li>
          <strong>
            <a href="https://github.com/adeira/universe/tree/master/src/relay-runtime#readme">
              @adeira/relay-runtime
            </a>
          </strong>
          <span> - An opinionated Relay Runtime wrapper, includes query logger.</span>
        </li>
      </ul>
    </div>
  );
}
