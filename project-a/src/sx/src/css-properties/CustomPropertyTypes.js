/* eslint-disable flowtype/require-valid-file-annotation */

const customProperties = new Map();

// https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
customProperties.set('alignItems', [
  'normal',
  'stretch',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'baseline',
  'first baseline',
  'last baseline',
  'safe center',
  'unsafe center',
  'inherit',
  'initial',
  'unset',
]);

// https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
customProperties.set('alignSelf', [
  'auto',
  'normal',
  'center',
  'start',
  'end',
  'self-start',
  'self-end',
  'flex-start',
  'flex-end',
  'baseline',
  'first baseline',
  'last baseline',
  'stretch',
  'safe center',
  'unsafe center',
  'inherit',
  'initial',
  'unset',
]);

// https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
customProperties.set('alignContent', [
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'normal',
  'baseline',
  'first baseline',
  'last baseline',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'safe center',
  'unsafe center',
  'inherit',
  'initial',
  'unset',
]);

module.exports = customProperties;
