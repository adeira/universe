// @flow strict

import React from 'react';
import fbt, { IntlVariations, GenderConst } from 'fbt';

const person = {
  name: 'John Doe',
  gender: IntlVariations.GENDER_MALE,
  pronounGender: GenderConst.MALE_SINGULAR,
};

export default function FbtExamples() {
  return (
    <>
      <p>
        <fbt project="foo" desc="a simple example">
          Hello, World!
        </fbt>
      </p>

      <p>
        <fbt desc="param example">
          Hello,
          <FbtParam name="name">{person.name}</FbtParam>.
        </fbt>

        <fbt desc="param example">
          Hello,
          <FbtName name="name" gender={person.gender}>
            {person.name}
          </FbtName>.
        </fbt>

        <fbt desc="param example">
          <FbtName name="name" gender={person.gender}>
            {person.name}
          </FbtName>
          shared a link. Tell
          <FbtSameParam name="name" />
          you liked it.
        </fbt>
      </p>

      <p>
        <fbt desc="plural example">
          You have
          <FbtPlural count={-1} name="number of likes" showCount="ifMany" many="likes">
            a like
          </FbtPlural>
          on your
          <FbtPlural count={-1} showCount="no">
            photo
          </FbtPlural>.
        </fbt>
      </p>

      <p>
        <fbt desc="buy prompt">
          Buy a new
          <FbtEnum
            enum-range={{
              CAR: 'car',
              HOUSE: 'house',
              BOAT: 'boat',
              HOUSEBOAT: 'houseboat',
            }}
            value={'CAR'}
          />!
        </fbt>

        <fbt desc="buy prompt">
          Buy a new
          <FbtEnum enum-range={['car', 'house', 'boat', 'houseboat']} value={'car'} />!
        </fbt>
      </p>

      <p>
        <fbt desc="pronoun example">
          <FbtParam name="name">{person.name}</FbtParam>
          shared
          <FbtPronoun type="possessive" gender={person.pronounGender} />
          photo with you.
          {/* Other type: */}
          <FbtPronoun type="subject" gender={person.pronounGender} />{' '}
          <FbtPronoun type="reflexive" gender={person.pronounGender} />{' '}
          <FbtPronoun type="object" gender={person.pronounGender} />
        </fbt>
      </p>

      <p>
        <fbt desc="complex example">
          Hello, <FbtParam name="name">{person.name}</FbtParam>!{' '}
          <FbtName name="name" gender={person.gender}>
            {person.name}
          </FbtName>{' '}
          shared a link. Tell
          <FbtSameParam name="name" />
          you liked <FbtPronoun type="possessive" gender={person.pronounGender} />{' '}
          <FbtEnum
            enum-range={{
              CAR: 'car',
              HOUSE: 'house',
              BOAT: 'boat',
              HOUSEBOAT: 'houseboat',
            }}
            value={'HOUSE'}
          />.
        </fbt>
      </p>
    </>
  );
}
