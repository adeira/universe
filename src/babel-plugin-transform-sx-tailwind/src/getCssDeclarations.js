// @flow

const { tailwindStyles, tailwindKeyframes, suggestUtility } = require('@adeira/sx-tailwind');

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

  const tailwindUtility = tailwindStyles[utilityName];
  if (tailwindUtility == null) {
    const suggestedName = suggestUtility(utilityName, tailwindStyles);
    throw new Error(
      `Unknow utility name: ${utilityName}. Did you mean "${suggestedName}" instead?`,
    );
  }
  const keyframe = tailwindKeyframes[tailwindUtility.animationName];
  if (tailwindUtility != null && keyframe != null) {
    const cssVarName = `--animation-name-${tailwindUtility.animationName}`;
    tailwindUtility[cssVarName] = `sx.keyframes(${JSON.stringify(keyframe)})`;
    delete tailwindUtility.animationName;
    return tailwindUtility;
  }

  return tailwindUtility;
}

function toString(value /*: string | string[] */) /*: string */ {
  return Array.isArray(value) ? value.join(',') : value;
}
