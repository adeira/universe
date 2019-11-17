/* eslint-disable flowtype/require-valid-file-annotation */

const React = require('react');

module.exports = function Index(props) {
  const { config: siteConfig, language = '' } = props;

  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const HomeSplash = () => {
    const SplashContainer = props => (
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

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
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
            <Button href={docUrl('monorepo/installation')}>Get Started</Button>
            <Button href="https://github.com/adeira/universe">GitHub</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  };

  const Description = () => (
    <div className="adeiraHomepageContainer">
      <p>TBD intro for docs & ecosystem</p>
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
      <h2>How does it all fit together?</h2>
      <ol>
        <li>
          <strong>Tests</strong> are being executed using our{' '}
          <a href="https://github.com/kiwicom/monorepo-utils#binary-monorepo-run-tests">
            TestsRunner
          </a>
          . This runner tries to find relevant changes to test among every Yarn Workspace we have in
          this monorepo. Individual projects do not have to take care about it at all (
          <a href={docUrl('monorepo/testing')}>more info</a>).
        </li>
        <li>
          <strong>Lint</strong> works very similarly to the tests runner: it tries to find only
          relevant changes to test among every project. We use{' '}
          <a href="https://github.com/kiwicom/eslint-config-kiwicom#eslint-runner">
            custom Eslint runner
          </a>{' '}
          based on Jest to run these checks.
        </li>
        <li>
          <strong>Flow</strong> runs also on the whole monorepo to properly check even dependencies
          among our workspaces.
        </li>
        <li>
          Everything else is related to the individual projects which you can find{' '}
          <a href={docUrl('graphql/general-information')}>here</a>. Basically, your project should
          not care about how to setup tests, lints or flow: focus only on your project goal.
        </li>
      </ol>
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
