// @flow

const { suggestUtility } = require('@adeira/sx-tailwind');

export default function getCssDeclarations(
  utilityName /*: any */,
  tailwindKeyframes /*: { +[string]: any } */,
  tailwindStyles /*: { +[string]: any } */,
) /*: any */ {
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
