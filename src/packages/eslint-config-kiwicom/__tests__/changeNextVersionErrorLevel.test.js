// @flow

import changeNextVersionErrorLevel from '../changeNextVersionErrorLevel';

test.each([0, 1, 2])('it changes next version error 3 to: %i', level => {
  expect(
    changeNextVersionErrorLevel(
      {
        'rule-off': 0,
        'rule-warn': 1,
        'rule-error': 2,
        'rule-next-version-error': 3,
        'rule-next-version-error-config': [3, { all: true }],
      },
      level,
    ),
  ).toEqual({
    'rule-off': 0,
    'rule-warn': 1,
    'rule-error': 2,
    'rule-next-version-error': level,
    'rule-next-version-error-config': [level, { all: true }],
  });
});
