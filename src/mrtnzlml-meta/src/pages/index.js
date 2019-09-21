/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import withBaseUrl from '@docusaurus/withBaseUrl';
import styles from './styles.module.css';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Hi, I am {siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={withBaseUrl('docs/flow')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <p>
              I am fullstack JavaScript developer at <a href="https://www.kiwi.com/en/">Kiwi.com</a>
              , originaly from Czech Republic 🇨🇿. Currently, I work at{' '}
              <a href="https://graphql.kiwi.com/">graphql.kiwi.com</a> project and internal{' '}
              <strong>monorepo</strong> infrastructure but I also help other teams with{' '}
              <strong>GraphQL</strong> in general, <strong>Relay</strong>, <strong>Flow</strong>,{' '}
              <strong>React (Native)</strong> or any other <strong>JS</strong> project.
            </p>

            <h3>My location</h3>

            <p>
              I am officially part of Prague or Barcelona office but I currently live in Mexico 🇲🇽.
              I am basically never in Brno HQ. I used to{' '}
              <a href="https://nomadlist.com/@mrtnzlml">travel a lot</a> (and still sometimes do)
              and therefore, I prefer solving every issue remotely if possible. I really enjoy being
              in different timezone so I can have time for some actual work and life. Do not expect
              I will react immediatelly. Do not expect it even when I am in the same city. I do not
              expect it as well.
            </p>

            <h3>Meetings, Slack</h3>

            <p>
              I genuinely don't like meetings. Luckily, I don't have that many meetings. I am trying
              to attend only valuable ones. Please always prepare an agenda for the meeting in
              advance so we can prepare well. I dislike when I am leaving the meeting without clear
              outcome and I feel like I just wasted my time there. Outcome from every meeting should
              be written somewhere. Wanna chat? Let's do it during coffee break instead! :)
            </p>

            <p>
              Very similar rules applies to how I use Slack. I read everything relevant for me and I
              am leaving and joining channels frequently (depending on my needs and interests).
              Don't take it personally when I leave the channel. I prefer when you write me
              personally.
            </p>

            <h3>Miscellaneous</h3>

            <p>
              <em>I am an introvert.</em> That means I loose energy when I am around other people
              for too long and I recharge my energy by spending time alone. Sounds weird? Check this
              video to understand my view:{' '}
              <a href="https://www.reddit.com/93u8rj/">https://www.reddit.com/93u8rj/</a>
            </p>

            <p>
              <em>I am a volatile developer.</em> I like to solve any problem in an untraditional
              way. I have difficulties to finish things completely though because there is probably
              something more interesting somewhere else. Development for clients is just not for me.{' '}
              <a href="https://youtu.be/cPEnRb6aaS4">
                <em>I just got bored, everybody out.</em>
              </a>
            </p>

            <p>
              <em>I love when people do great job.</em> You wouldn't believe how many hours I spent
              reading code of excelent programmers. I will definitelly let you know when I love what
              you do.
            </p>

            <p>
              <em>I hate when people do shitty job.</em> Escpecially developers! They write shitty
              code full of bugs, WTF, workarounds and then they are not even embarassed to say that
              programming is an art. Jeez. Can you imagine a plumber or construction worker to do
              the same?
            </p>

            <p>
              <em>Success motivates me.</em> I feel energized when I have the opportunity to do
              something awesome. I feel miserable when I do not have the opportunity and I am
              treated just like a monkey.
            </p>

            <p>
              <em>I have my moods.</em> I am fine in one minute and then I am suddenly completely
              different person. I think it's related to my introversion when things simply went too
              far too quickly. I am working on that.
            </p>

            <p>
              <em>I have my focus zone.</em> Usually, when I am working really hard. I can be in
              this zone for a long time (hours). And I need some time to get back. I am usually not
              very friendly during this recovery period because I am still partially in the zone. I
              am trying to learn how to switch these mods more quickly. Be patient with me, please.
            </p>

            <p>
              <em>I want to have things under control.</em> This way I do things really well. Also,
              it gives me possibility to say NO when I think it's not OK. I am very unhappy when
              someone treats me as yet another programmer-monkey or when I cannot say NO.
            </p>

            <p>
              <em>I hate stupid people.</em> Violent people, people selling (or using) drugs, people
              with WTF opinions, racists, people begging on the street while doing nothing. I do not
              like smokers, religious people and bad drivers.
            </p>

            <p>
              <em>I am not always positive.</em> At least you know something is not OK... :)
            </p>

            <p>
              <em>
                I sometimes <a href="https://www.goodreads.com/review/list/84536346">read</a>.
              </em>
            </p>

            <h3>My Kiwi.com timeline</h3>

            <p>I joined this company in April 2017 (my first PR was Apr 7)</p>

            <ol>
              <li>
                Created first <a href="https://github.com/kiwicom/graphql">GraphQL proxy</a> (still
                ongoing project but moved to private repo)
              </li>
              <li>Created unsuccessful Chatbot 🤖 for our custommer support (discontinued)</li>
              <li>
                Created first{' '}
                <a href="https://github.com/kiwicom/mobile">React Native application</a>{' '}
                (discontinued)
              </li>
              <li>
                Joined internal Portalo project for our customer support center (still ongoing)
              </li>
              <li>
                I came up with RNW technology but never had the opportunity to work with it at
                Kiwi.com :-/ (discontinued)
              </li>
              <li>Re-joined GraphQL proxy project and turned it into monorepo</li>
              <li>
                I am working on the monorepo for the whole Incubator tribe, many NPM packages
                (current)
              </li>
            </ol>

            <p>I left this company in October (31) 2019 👋</p>

            <h3>
              Kiwi.com{' '}
              <a href="https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/">
                Joel Test
              </a>{' '}
              - 5/12
            </h3>

            <p>
              Simple boolean: it's ❌ if I don't think it's true or there are some significant
              exceptions to this rule. It's ✅ otherwise.
            </p>

            <ol>
              <li>✅ Do you use source control?</li>
              <li>✅ Can you make a build in one step?</li>
              <li>✅ Do you make daily builds?</li>
              <li>✅ Do you have a bug database?</li>
              <li>❌ Do you fix bugs before writing new code?</li>
              <li>❌ Do you have an up-to-date schedule?</li>
              <li>❌ Do you have a spec?</li>
              <li>❌ Do programmers have quiet working conditions?</li>
              <li>✅ Do you use the best tools money can buy?</li>
              <li>❌ Do you have testers?</li>
              <li>❌ Do new candidates write code during their interview?</li>
              <li>❌ Do you do hallway usability testing?</li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
