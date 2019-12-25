// @flow

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
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="My brain extension, personal README"
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
              to={useBaseUrl('docs/flow')}
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
              I am fullstack JavaScript developer at{' '}
              <a href="https://www.pipedrive.com/">Pipedrive.com</a>, originaly from Czech Republic{' '}
              <span role="img" aria-label="czech republic flag">
                🇨🇿
              </span>
              . Currently, I work with technologies around <strong>GraphQL</strong>,{' '}
              <strong>Relay</strong>, <strong>Flow/TS</strong>, <strong>React&nbsp;(Native)</strong>{' '}
              and similar.
            </p>

            <h2>My location</h2>

            <p>
              I am officially part of Prague office and I spend most of my time here. I am basically
              never in Tallinn HQ. I used to{' '}
              <a href="https://nomadlist.com/@mrtnzlml">travel a lot</a> (and still sometimes do)
              and therefore, I prefer solving every issue remotely if possible. I really enjoy being
              in different timezone so I can have time for some actual work and life. Do not expect
              I will react immediately. Do not expect it even when I am in the same city. I do not
              expect it as well.
            </p>

            <h2>Meetings, Slack</h2>

            <p>
              I genuinely don&apos;t like meetings. Luckily, I don&apos;t have that many meetings. I
              am trying to attend only valuable ones. Please always prepare an agenda for the
              meeting in advance so we can prepare well. I dislike when I am leaving the meeting
              without clear outcome and I feel like I just wasted my time there. Outcome from every
              meeting should be written somewhere. Wanna chat? Let&apos;s do it during coffee break
              instead! :)
            </p>

            <p>
              Very similar rules applies to how I use Slack. I read everything relevant for me and I
              am leaving and joining channels frequently (depending on my needs and interests).
              Don&apos;t take it personally when I leave the channel. I prefer when you write me
              personally.
            </p>

            <h2>Miscellaneous</h2>

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
              <em>I like changes.</em> I like to do rapid and unexpected changes even though they
              are big. Sometimes it's may way of escaping stereotype, sometimes it's my way of
              saying "enough".
            </p>

            <p>
              <em>I love when people do great job.</em> You wouldn&apos;t believe how many hours I
              spent reading code of excelent programmers. I will definitelly let you know when I
              love what you do.
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
              different person. I think it&apos;s related to my introversion when things simply went
              too far too quickly. I am working on that.
            </p>

            <p>
              <em>I have my focus zone.</em> Usually, when I am working really hard. I can be in
              this zone for a long time (hours). And I need some time to get back. I am usually not
              very friendly during this recovery period because I am still partially in the zone. I
              am trying to learn how to switch these mods more quickly. Be patient with me, please.
            </p>

            <p>
              <em>I want to have things under control.</em> This way I do things really well. Also,
              it gives me possibility to say NO when I think it&apos;s not OK. I am very unhappy
              when someone treats me as yet another programmer-monkey or when I cannot say NO.
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
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
