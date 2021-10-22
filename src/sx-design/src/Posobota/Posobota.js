// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt, GenderConst, IntlVariations } from 'fbt';

import AssetPosobota from './assets/posobota.png';
import Image from '../Image/Image';

/**
 * Demo sentences:
 *
 * - George submitted his proposal for this MEETUP.
 * - Emily submitted her 2 proposals for this MEETUP.
 * - George and Jane submitted their 5 proposals for this EVENT.
 *
 * @see https://www.posobota.cz/
 * @see https://mrtnzlml.com/docs/fbt
 * @see https://facebook.github.io/fbt/
 */
export default function Posobota(): Node {
  const authorName = 'George'; // George or Emily
  const authorGender = IntlVariations.GENDER_MALE;
  const authorPronounGender = GenderConst.MALE_SINGULAR;
  const numberOfProposals = 1;
  const enumValue: 'MEETUP' | 'EVENT' = 'MEETUP';

  return (
    <div className={styles('meetupWrapper')}>
      <div className={styles('meetupLogo')}>
        <Image src={AssetPosobota} />
      </div>

      <p>George submitted his proposal for this MEETUP.</p>

      {/* 1 - no translation */}
      {/*
      <p>George submitted his proposal for this MEETUP.</p>
      */}

      {/* 2 - simple translation & auto-parameterization
          https://facebook.github.io/fbt/docs/api_intro
          https://facebook.github.io/fbt/docs/autoparam) */}
      {/*
      <p>
        <fbt desc="example sentence">George submitted his proposal for this MEETUP.</fbt>
      </p>
      */}

      {/* 3 - generic parameters
          https://facebook.github.io/fbt/docs/params) */}
      {/*
      <p>
        <fbt desc="example sentence">
          <fbt:param name="authorName">{authorName}</fbt:param> submitted his proposal for this
          MEETUP.
        </fbt>
      </p>
      */}

      {/* 4 - name parameters with variations
          https://facebook.github.io/fbt/docs/params */}
      {/*
      <p>
        <fbt desc="example sentence">
          <fbt:name name="authorName" gender={authorGender}>
            {authorName}
          </fbt:name>{' '}
          submitted his proposal for this MEETUP.
        </fbt>
      </p>
      */}

      {/* 5 - pronouns
          https://facebook.github.io/fbt/docs/pronouns */}
      {/*
      <p>
        <fbt desc="example sentence">
          <fbt:name name="authorName" gender={authorGender}>
            {authorName}
          </fbt:name>{' '}
          submitted <fbt:pronoun type="possessive" gender={authorPronounGender} /> proposal for this
          MEETUP.
        </fbt>
      </p>
      */}

      {/* 6 - plurals
          https://facebook.github.io/fbt/docs/plurals */}
      {/*
      <p>
        <fbt desc="example sentence">
          <fbt:name name="authorName" gender={authorGender}>
            {authorName}
          </fbt:name>{' '}
          submitted <fbt:pronoun type="possessive" gender={authorPronounGender} />{' '}
          <fbt:plural count={numberOfProposals} showCount="ifMany" many="proposals">
            proposal
          </fbt:plural>{' '}
          for this MEETUP.
        </fbt>
      </p>
      */}

      {/* 7 - enumerations
          https://facebook.github.io/fbt/docs/enums */}
      {/*
      <p>
        <fbt desc="example sentence">
          <fbt:name name="authorName" gender={authorGender}>
            {authorName}
          </fbt:name>{' '}
          submitted <fbt:pronoun type="possessive" gender={authorPronounGender} />{' '}
          <fbt:plural count={numberOfProposals} showCount="ifMany" many="proposals">
            proposal
          </fbt:plural>{' '}
          for this <fbt:enum enum-range={['MEETUP', 'EVENT']} value={enumValue} />.
        </fbt>
      </p>
      */}
    </div>
  );
}

const styles = sx.create({
  meetupWrapper: {
    backgroundColor: 'rgb(238, 231, 223)',
    fontSize: '2rem',
    padding: '2rem',
  },
  meetupLogo: {
    marginBlockEnd: '10rem',
  },
});
