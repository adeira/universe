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
            <Button href="https://gitlab.skypicker.com/incubator/universe">GitLab</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  };

  const Description = () => (
    <div className="kiwicomHomepageContainer">
      <p>
        Monorepo gives us great opportunity to iterate fast across all our projects. This monorepo
        uses <a href="https://yarnpkg.com/lang/en/docs/workspaces/">Yarn Workspaces</a> to handle
        relations between our projects as well as all the JavaScript dependencies. We also use
        unified lint, tests and static checks to make sure all our projects use the same setup so we
        don&apos;t even have to think about it.
      </p>
      <p>
        <span role="img" aria-label="backhand index finger pointing right">
          👉
        </span>{' '}
        <strong>
          <a href={docUrl('monorepo/installation')}>Install & Run this monorepo</a>
        </strong>
      </p>
      <p>
        This website contains documentation for all our projects stored in monorepo. We also export
        many <a href={docUrl('oss/general')}>NPM packages</a> since it&apos;s very difficult to
        import all our projects created in Kiwi.com into this repository. Feel free to use them in
        your project even though it&apos;s not your intention to move your project into{' '}
        <em>Universe</em>.
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
      <p>
        Where to go next? Let&apos;s{' '}
        <a href={docUrl('monorepo/installation')}>install this monorepo</a>!
      </p>
      <h2>Do not confuse with...</h2>
      <p>
        Do not confuse this approach with <em>monolith</em>: monorepo hosts many smaller
        repositories inside but it&apos;s relatively easy to escape from this setup. Each project
        lives in it&apos;s own directory but the difference is that you don&apos;t have to setup
        test environment, lints or Flow - it just works.
      </p>
      <p>
        Do not confuse it with <em>just Yarn Workspaces</em>: it&apos;s true we currently use
        workspaces heavily. However, that&apos;s only our dependency management system. We work with
        relations between these workspaces as well which allows us to, for example, run tests
        efficiently. Moreover, there are additional services sitting on top of this monorepo which
        are helping us to ship open-source projects, publish NPM packages or automate some
        repetitive commit. You can think about Universe as an application itself.
      </p>
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
