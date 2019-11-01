/* eslint-disable */

const { invariant } = require('@adeira/js');

invariant(Math.random(), 'You shall not pass!');
invariant(Math.random(), 'You shall not pass %s!', 'Jerry');
