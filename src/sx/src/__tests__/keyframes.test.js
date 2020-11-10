// @flow

import keyframes from '../keyframes';
import styleCollector from '../StyleCollector';

it('returns hashed name of the keyframe', () => {
  const spy = jest.spyOn(styleCollector, 'addKeyframe');
  const hashedName = keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(-300px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  });
  expect(spy).toHaveBeenCalledWith(
    hashedName,
    '@keyframes wOIjT {from {opacity:0;transform:translateX(-300px);}to {opacity:1;transform:translateX(0);}}',
  );
  const hashedName2 = keyframes({
    from: {
      transform: 'translateX(-300px)',
    },
    to: {
      transform: 'translateX(0)',
    },
  });
  expect(spy).toHaveBeenNthCalledWith(
    2,
    hashedName2,
    '@keyframes _1kFWtB {from {transform:translateX(-300px);}to {transform:translateX(0);}}',
  );
  expect(hashedName).toMatchInlineSnapshot(`"wOIjT"`);
  expect(hashedName2).toMatchInlineSnapshot(`"_1kFWtB"`);
  spy.mockReset();
});

it('works with percentages', () => {
  const spy = jest.spyOn(styleCollector, 'addKeyframe');

  const hashedName = keyframes({
    '0%': {
      transform: 'translateX(-300px)',
    },
    '75%, 80%': {
      transform: 'translateX(50px)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  });
  expect(spy).toHaveBeenCalledWith(
    hashedName,
    '@keyframes _3B4dOq {0% {transform:translateX(-300px);}100% {transform:translateX(0);}75%,80% {transform:translateX(50px);}}',
  );
  spy.mockReset();
});

it('generates same hash for similar object', () => {
  const hashedName = keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(-300px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  });
  const hashedName2 = keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(-300px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  });
  const hashedName3 = keyframes({
    from: {
      transform: 'translateX(-300px)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  });
  expect(hashedName).toEqual(hashedName2);
  expect(hashedName2).toEqual(hashedName3);
});
