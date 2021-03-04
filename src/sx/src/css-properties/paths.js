// @flow strict

import path from 'path';

export default {
  propertyTypes: (path.join(__dirname, '__generated__', 'AllCSSPropertyTypes.js'): string),
  pseudoTypes: (path.join(__dirname, '__generated__', 'AllCSSPseudoTypes.js'): string),
};
