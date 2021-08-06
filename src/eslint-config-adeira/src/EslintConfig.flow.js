// @flow strict

// Level "3" is our NEXT_VERSION_ERROR speciality:
type EslintConfigErrorLevel = 0 | 1 | 2 | 'off' | 'warn' | 'error' | 3;

type EslintRuleOption = string | { +[name: string]: mixed };

type EslintConfigValues =
  | EslintConfigErrorLevel
  | [EslintConfigErrorLevel, EslintRuleOption]
  | [EslintConfigErrorLevel, EslintRuleOption, EslintRuleOption];

export type EslintConfigRules = { +[string]: EslintConfigValues };

type EslintConfigPlugins = $ReadOnlyArray<string>;

type EslintConfigOverrides = $ReadOnlyArray<{ ... }>;

export type EslintConfig = {
  +rules: EslintConfigRules,
  +plugins: EslintConfigPlugins,
  +overrides?: EslintConfigOverrides,
  +settings?: { +[string]: $FlowFixMe },
  +globals?: { +[string]: 'readonly' | 'writable' | 'off' },
};
