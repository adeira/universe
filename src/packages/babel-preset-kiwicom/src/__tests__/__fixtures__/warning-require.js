/* eslint-disable */

const { warning } = require('@kiwicom/js');

warning(Math.random(), 'I am warning you!');
warning(Math.random(), 'I am warning you %s!', 'René');
