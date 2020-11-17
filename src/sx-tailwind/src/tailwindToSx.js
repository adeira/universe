// @flow

import * as changeCase from 'change-case';
import postcss from 'postcss';
import substituteTailwindAtRules from 'tailwindcss/lib/lib/substituteTailwindAtRules';
import evaluateTailwindFunctions from 'tailwindcss/lib/lib/evaluateTailwindFunctions';
import substituteVariantsAtRules from 'tailwindcss/lib/lib/substituteVariantsAtRules';
import substituteResponsiveAtRules from 'tailwindcss/lib/lib/substituteResponsiveAtRules';
import convertLayerAtRulesToControlComments from 'tailwindcss/lib/lib/convertLayerAtRulesToControlComments';
import substituteScreenAtRules from 'tailwindcss/lib/lib/substituteScreenAtRules';
import substituteClassApplyAtRules from 'tailwindcss/lib/lib/substituteClassApplyAtRules';
import applyImportantConfiguration from 'tailwindcss/lib/lib/applyImportantConfiguration';
import purgeUnusedStyles from 'tailwindcss/lib/lib/purgeUnusedStyles';
import processPlugins from 'tailwindcss/lib/util/processPlugins';
import corePlugins from 'tailwindcss/lib/corePlugins';

type SxTailwindDefinitions = {|
  +keyframes: {| +[string]: any |},
  +styles: {| +[string]: any |},
|};

export default async function convert(
  css: string,
  tailwindConfig: {| +[string]: any |},
): Promise<SxTailwindDefinitions> {
  const processor = getTailwindProcessor(tailwindConfig);
  const postCss = await processor.process(css, { from: '' });

  const styles = new Map<string, any>();
  const keyframes = new Map<string, any>();

  postCss.root.walkAtRules((atRule) => {
    if (atRule.name !== 'keyframes') {
      return;
    }
    const rules = new Map();
    atRule.walkRules(({ selector, nodes }) => {
      rules.set(selector, Object.fromEntries(nodes.map((node) => [node.prop, node.value])));
    });
    keyframes.set(atRule.params, Object.fromEntries(rules.entries()));
  });

  postCss.root.walkRules((rule) => {
    if (!rule.selector.startsWith('.') || rule.selector.includes('>')) {
      return;
    }

    const [cssClass, pseudoClass] = parseSelector(rule.selector);
    const declarations = [];
    rule.nodes
      .filter((node) => !isVendorPrefixed(node.prop) && !isVendorPrefixed(node.value))
      .forEach((node) => declarations.push(...formatDeclaration(node)));

    const mediaQuery =
      rule.parent.name === 'media' ? `@${rule.parent.name} ${rule.parent.params}` : null;

    const styleDefinition = assembleStyleDefinition(declarations, pseudoClass, mediaQuery);
    if (styleDefinition != null) {
      styles.set(cssClass, styleDefinition);
    }
  });

  return {
    styles: Object.fromEntries(styles.entries()),
    keyframes: Object.fromEntries(keyframes.entries()),
  };
}

function assembleStyleDefinition(
  declarations: Array<[string, string | number]>,
  pseudoClass: ?string,
  mediaQuery: ?string,
) {
  if (declarations.length === 0) {
    return null;
  }

  let style = Object.fromEntries(declarations);
  if (pseudoClass != null) {
    style = { [`:${pseudoClass}`]: style };
  }
  if (mediaQuery != null) {
    style = { [mediaQuery]: style };
  }
  return style;
}

function parseSelector(selector: string): [string, string | null] {
  const parts = selector.split('\\:');
  const last = parts.pop();
  const [part, pseudoClass] = last.split(':');
  parts.push(part);

  const cssClass = parts.join(':').replace(/^\./, '').replace('\\/', '/');

  return [cssClass, pseudoClass];
}

function formatDeclaration(declarationNode) {
  const name = declarationNode.prop;
  const value = declarationNode.value;

  if (name === 'animation') {
    return formatAnimationDeclaration(value);
  }
  return [[formatDeclarationName(name), formatDeclarationValue(name, value)]];
}

function formatAnimationDeclaration(value: string) {
  if (value === 'none') {
    return [['animation', 'none']];
  }

  const parts = value.toString().split(' ');
  const animationName = parts.shift();
  const cssVarName = `--animation-name-${animationName}`;
  return [
    ['animation', [`var(${cssVarName})`, ...parts].join(' ')],
    [cssVarName, animationName],
    ['animationName', animationName],
  ];
}

function formatDeclarationName(name: string): string {
  if (name.startsWith('--')) {
    // CSS variable
    return name;
  }
  return changeCase.camelCase(name);
}

function formatDeclarationValue(name: string, value: string | number): string | number {
  if (name.startsWith('--')) {
    // CSS variable
    return value;
  }
  const numeric = Number(value);
  return Number.isNaN(numeric) ? value : numeric;
}

function isVendorPrefixed(value: string | number): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return (
    value.startsWith('-moz-') ||
    value.startsWith('-o-') ||
    value.startsWith('-ms-') ||
    value.startsWith('-webkit-')
  );
}

// see https://github.com/tailwindlabs/tailwindcss/blob/master/src/processTailwindFeatures.js
function getTailwindProcessor(config) {
  const plugins = [...corePlugins(config), ...(config.plugins ?? [])];
  const processedPlugins = processPlugins(plugins, config);

  const configuredTailwind = postcss([
    substituteTailwindAtRules(config, processedPlugins),
    evaluateTailwindFunctions(config),
    substituteVariantsAtRules(config, processedPlugins),
    substituteResponsiveAtRules(config),
    convertLayerAtRulesToControlComments(config),
    substituteScreenAtRules(config),
    substituteClassApplyAtRules(config, () => processedPlugins),
    applyImportantConfiguration(config),
    purgeUnusedStyles(config),
  ]);
  return configuredTailwind;
}
