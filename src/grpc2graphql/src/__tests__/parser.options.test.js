// @flow

import { parseOptions } from '../parser';

describe('Parser', () => {
  it('group graphql query options', () => {
    const options = {
      '(graphql_query).name': 'sayHello',
      '(graphql_query).description': 'Greet given name',
    };

    expect(parseOptions(options)).toEqual({
      graphql: {
        name: 'sayHello',
        description: 'Greet given name',
      },
    });
  });

  it('group graphql field options', () => {
    const options = {
      '(graphql_field).name': 'myName',
      '(graphql_field).is_not_null': true,
    };

    expect(parseOptions(options)).toEqual({
      graphql: {
        name: 'myName',
        is_not_null: true,
      },
    });
  });

  it('keep non-graphql options untouched', () => {
    const options = {
      '(graphql_query).name': 'sayHello',
      java_package: 'com.example.foo',
    };
    const f = parseOptions(options);
    f.java_package = 'fuck';

    expect(parseOptions(options)).toEqual({
      graphql: {
        name: 'sayHello',
      },
      java_package: 'com.example.foo',
    });
  });
});
