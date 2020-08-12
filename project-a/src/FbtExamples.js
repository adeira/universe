// @flow strict

import React from "react";
import fbt, { IntlVariations, GenderConst } from "fbt";

const person = {
  name: "John Doe",
  gender: IntlVariations.GENDER_MALE,
  pronounGender: GenderConst.MALE_SINGULAR,
};

export default function MainContent() {
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
          <fbt:param name="name">{person.name}</fbt:param>.
        </fbt>

        <fbt desc="param example">
          Hello,
          <fbt:name name="name" gender={person.gender}>
            {person.name}
          </fbt:name>.
        </fbt>

        <fbt desc="param example">
          <fbt:name name="name" gender={person.gender}>
            {person.name}
          </fbt:name>
          shared a link. Tell
          <fbt:same-param name="name" />
          you liked it.
        </fbt>
      </p>

      <p>
        <fbt desc="plural example">
          You have
          <fbt:plural
            count={-1}
            name="number of likes"
            showCount="ifMany"
            many="likes"
          >
            a like
          </fbt:plural>
          on your
          <fbt:plural count={-1} showCount="no">
            photo
          </fbt:plural>.
        </fbt>
      </p>

      <p>
        <fbt desc="buy prompt">
          Buy a new
          <fbt:enum
            enum-range={{
              CAR: "car",
              HOUSE: "house",
              BOAT: "boat",
              HOUSEBOAT: "houseboat",
            }}
            value={"CAR"}
          />!
        </fbt>

        <fbt desc="buy prompt">
          Buy a new
          <fbt:enum
            enum-range={["car", "house", "boat", "houseboat"]}
            value={"car"}
          />!
        </fbt>
      </p>

      <p>
        <fbt desc="pronoun example">
          <fbt:param name="name">{person.name}</fbt:param>
          shared
          <fbt:pronoun type="possessive" gender={person.pronounGender} />
          photo with you.
          {/* Other type: */}
          <fbt:pronoun type="subject" gender={person.pronounGender} />{" "}
          <fbt:pronoun type="reflexive" gender={person.pronounGender} />{" "}
          <fbt:pronoun type="object" gender={person.pronounGender} />
        </fbt>
      </p>

      <p>
        <fbt desc="complex example">
          Hello, <fbt:param name="name">{person.name}</fbt:param>!{" "}
          <fbt:name name="name" gender={person.gender}>
            {person.name}
          </fbt:name>{" "}
          shared a link. Tell
          <fbt:same-param name="name" />
          you liked{" "}
          <fbt:pronoun type="possessive" gender={person.pronounGender} />{" "}
          <fbt:enum
            enum-range={{
              CAR: "car",
              HOUSE: "house",
              BOAT: "boat",
              HOUSEBOAT: "houseboat",
            }}
            value={"HOUSE"}
          />.
        </fbt>
      </p>
    </>
  );
}
