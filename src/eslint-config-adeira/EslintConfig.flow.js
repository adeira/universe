// @flow strict

// Level "3" is our NEXT_VERSION_ERROR speciality:
type EslintConfigErrorLevel = 0 | 1 | 2 | 'off' | 'warn' | 'error' | 3;

type EslintRuleOption = string | { [name: string]: mixed, ... };

type EslintConfigValues =
  | EslintConfigErrorLevel
  | [EslintConfigErrorLevel, EslintRuleOption]
  | [EslintConfigErrorLevel, EslintRuleOption, EslintRuleOption];

type EslintOverrides = $ReadOnlyArray<{ ... }>;

export type EslintConfigRules = { +[string]: EslintConfigValues, ... };
export type EslintConfig = { +rules: EslintConfigValues, +overrides: EslintOverrides, ... };
