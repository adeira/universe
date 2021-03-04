// @flow

import fs from 'fs';

import generatePropertyTypes from './generatePropertyTypes';
import generatePseudoTypes from './generatePseudoTypes';
import paths from './paths';

generatePropertyTypes((types) => {
  fs.writeFileSync(paths.propertyTypes, types, 'utf8');
});

generatePseudoTypes((types) => {
  fs.writeFileSync(paths.pseudoTypes, types, 'utf8');
});
