// @flow strict

import getDataByTypename from '../getDataByTypename';

module.exports = {
  validUsage() {
    type Data = ?(
      | {|
          +__typename: 'Error',
          +code: number,
        |}
      | {|
          +__typename: 'Person',
          +name: string,
        |}
      | {|
          +__typename: '%other',
        |}
    );
    const personOrError: Data = { name: 'Joe', __typename: 'Person' };

    const { Error, Person } = getDataByTypename(personOrError);

    if (Person) {
      // eslint-disable-next-line no-unused-vars
      const hello = `Hello ${Person.name}`;
    } else if (Error) {
      // eslint-disable-next-line no-unused-vars
      const error = `Error: ${Error.code}`;
    }
  },
};
