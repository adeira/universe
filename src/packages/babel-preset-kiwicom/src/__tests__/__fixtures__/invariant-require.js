/* eslint-disable */

const { invariant } = require('@kiwicom/js');

invariant(Math.random(), 'You shall not pass!');
invariant(Math.random(), 'You shall not pass %s!', 'Jerry');
