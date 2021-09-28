// @flow

// Level "3" is our NEXT_VERSION_ERROR speciality:
type EslintConfigErrorLevel = 0 | 1 | 2 | 'off' | 'warn' | 'error' | 3;

type EslintRuleOption = string | { +[name: string]: mixed };

type EslintConfigValues =
  | EslintConfigErrorLevel
  | [EslintConfigErrorLevel, EslintRuleOption]
  | [EslintConfigErrorLevel, EslintRuleOption, EslintRuleOption];

export type EslintConfigRules = { +[string]: EslintConfigValues };

type EslintConfigPlugins = $ReadOnlyArray<string>;

type EslintConfigOverrides = $ReadOnlyArray<{
  +files: $ReadOnlyArray<string>,
  +excludedFiles?: string,
  +rules?: EslintConfigRules,
}>;

type EslintConfigSettings = {
  +[pluginIdentifier: string]: {
    +[settingName: string]: any,
  },
};

type EslintConfigGlobals = { +[string]: 'readonly' | 'writable' | 'off' };

export type EslintConfig = {
  +rules: EslintConfigRules,
  +plugins: EslintConfigPlugins,
  +overrides?: EslintConfigOverrides,
  +settings?: EslintConfigSettings,
  +globals?: EslintConfigGlobals,
};
