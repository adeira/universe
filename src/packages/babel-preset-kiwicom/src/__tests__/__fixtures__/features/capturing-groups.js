// @flow strict

/*  eslint-disable no-console */

const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

console.log(re.exec('1999-02-29')?.groups?.year);
