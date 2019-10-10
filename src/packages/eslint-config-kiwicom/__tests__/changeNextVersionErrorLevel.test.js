// @flow strict

import changeNextVersionErrorLevel from '../changeNextVersionErrorLevel';

test.each([0, 1, 2])('it changes next version error 3 to: %i', level => {
  expect(
    changeNextVersionErrorLevel(
      {
        'rule-off': 0,
        'rule-warn': 1,
        'rule-error': 2,
        'rule-next-version-error': 3, // only this must be changed
        'rule-off-config': [0, { all: true }],
        'rule-warn-config': [1, { all: true }],
        'rule-error-config': [2, { all: true }],
        'rule-next-version-error-config': [3, { all: true }], // only this must be changed
      },
      level,
    ),
  ).toEqual({
    'rule-off': 0,
    'rule-warn': 1,
    'rule-error': 2,
    'rule-next-version-error': level,
    'rule-off-config': [0, { all: true }],
    'rule-warn-config': [1, { all: true }],
    'rule-error-config': [2, { all: true }],
    'rule-next-version-error-config': [level, { all: true }],
  });
});
