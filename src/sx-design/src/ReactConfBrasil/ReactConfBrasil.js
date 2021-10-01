// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt, GenderConst, IntlVariations } from 'fbt';

import Image from '../Image/Image';

/**
 * Demo sentences:
 *
 * - Peter submitted his proposal for this CONFERENCE.
 * - Jane submitted her 2 proposals for this CONFERENCE.
 * - Peter and Jane submitted their 5 proposals for this EVENT.
 *
 * @see https://reactconf.com.br/
 * @see https://mrtnzlml.com/docs/fbt
 * @see https://facebook.github.io/fbt/
 */
export default function ReactConfBrasil(): Node {
  const authorName = 'Peter';
  const authorGender = IntlVariations.GENDER_MALE;
  const authorPronounGender = GenderConst.MALE_SINGULAR;
  const numberOfProposals = 1;
  const enumValue: 'CONFERENCE' | 'EVENT' = 'CONFERENCE';

  return (
    <div className={styles('conferenceWrapper')}>
      <div className={styles('conferenceLogo')}>
        <Image src="https://reactconf.com.br/static/reactpainel2021-acedc0f308cb180bab502cddaa7e8686.png" />
      </div>

      <p>Peter submitted his proposal for this CONFERENCE.</p>

      {/* 1 - no translation */}
      {/*
      <p>Peter submitted his proposal for this CONFERENCE.</p>
      */}

      {/* 2 - simple translation & auto-parameterization
          https://facebook.github.io/fbt/docs/api_intro
          https://facebook.github.io/fbt/docs/autoparam) */}
      {/*
      <p>
        <fbt desc="example sentence">Peter submitted his proposal for this CONFERENCE.</fbt>
      </p>
      */}

      {/* 3 - generic parameters
          https://facebook.github.io/fbt/docs/params) */}
      {/*
      <p>
        <fbt desc="example sentence">
          <fbt:param name="authorName">{authorName}</fbt:param> submitted his proposal for this
          CONFERENCE.
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
          submitted his proposal for this CONFERENCE.
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
          CONFERENCE.
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
          for this CONFERENCE.
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
          for this <fbt:enum enum-range={['CONFERENCE', 'EVENT']} value={enumValue} />.
        </fbt>
      </p>
      */}
    </div>
  );
}

const styles = sx.create({
  conferenceWrapper: {
    backgroundColor: 'rgb(253, 243, 230)',
    fontSize: '2rem',
    padding: '2rem',
  },
  conferenceLogo: {
    marginBlockEnd: '10rem',
  },
});
