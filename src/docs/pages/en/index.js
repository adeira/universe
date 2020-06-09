/* eslint-disable flowtype/require-valid-file-annotation */

const React = require('react');

module.exports = function Index(props) {
  const { config: siteConfig, language = '' } = props;

  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  const HomeSplash = () => {
    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button inverseButton" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('general/introduction')}>Get Started</Button>
            <Button href="https://github.com/adeira/universe">GitHub</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  };

  const Description = () => (
    <div className="adeiraHomepageContainer">
      <h2>About adeira/universe</h2>
      <p>
        <code>adeira/universe</code> is monorepo with the collections of libraries we write to make
        our code better & more efficient. All the libraries listed below were created and developed
        to satisfy the needs of daily work and are battle tested in our production applications.
      </p>
      <p>
        Most of tools cover these topics: <strong>GraphQL & Relay</strong>, <strong>ESLint</strong>{' '}
        or utilities for monorepo and CI scripts.
      </p>
      <h2>Contribute to the ecosystem!</h2>
      <p>
        <span role="img" aria-label="backhand index finger pointing right">
          👉
        </span>{' '}
        <strong>
          <a href="https://github.com/adeira/universe/blob/master/README.md" target="_blank">
            Install & Run this monorepo
          </a>
        </strong>
      </p>
      <h2>
        Packages included in monorepo (available on{' '}
        <a href="https://www.npmjs.com/org/adeira">npm</a>)
      </h2>
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

  return (
    <div>
      <HomeSplash siteConfig={siteConfig} language={language} />
      <div className="mainContainer">
        <Description />
      </div>
    </div>
  );
};
