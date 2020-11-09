// @flow

const { tailwindStyles } = require('@adeira/sx-tailwind');

export default function getCssDeclarations(
  utilityName /*: any */,
  tailwindConfig /*: any */,
) /*: any */ {
  // TODO: refactor once a support for more configuration options will be needed
  const fontFamily = tailwindConfig.theme.fontFamily;
  if (utilityName === 'font-sans' && fontFamily.sans) {
    return {
      fontFamily: toString(fontFamily.sans),
    };
  }
  if (utilityName === 'font-mono' && fontFamily.mono) {
    return {
      fontFamily: toString(fontFamily.mono),
    };
  }

  return tailwindStyles[utilityName];
}

function toString(value /*: string | string[] */) /*: string */ {
  return Array.isArray(value) ? value.join(',') : value;
}
