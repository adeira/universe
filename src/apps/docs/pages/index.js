/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

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
        <a
          className="button inverseButton"
          href={props.href}
          target={props.target}
        >
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
            <Button href="https://gitlab.skypicker.com/incubator/universe">
              GitLab
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;

    const Description = () => (
      <div className="kiwicomHomepageContainer">
        <img
          className="iconContainer"
          src="img/undraw_all_the_data.svg"
          alt="Monorepo illustration"
        />
        <p>
          Monorepo gives us great opportunity to iterate fast across all our
          projects. This monorepo uses{' '}
          <a href="https://yarnpkg.com/lang/en/docs/workspaces/">
            Yarn Workspaces
          </a>{' '}
          to handle relations between our projects as well as all the JavaScript
          dependencies. We also use unified lint, tests and static checks to
          make sure all our projects use the same setup so we don't even have to
          think about it.
        </p>
        <p>
          Do not confuse this approach with monolith: monorepo hosts many
          smaller repositories inside but it's relatively easy to escape from
          this setup. Each project lives in it's own directory but the
          difference is that you don't have to setup test environment, lints or
          Flow - it just works.
        </p>
        <p>
          This website contains documentation for all our projects stored in
          monorepo. We also export many{' '}
          <a href="docs/npm/packages">NPM packages</a> since it's very difficult
          to import all our projects created in Kiwi.com into this repository.
          Feel free to use them in your project even though it's not your
          intention to move your project into <em>Universe</em>.
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
  }
}

module.exports = Index;
