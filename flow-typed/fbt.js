/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 * @flow strict
 */

/**
 * Translated string from an `fbt()` call.
 *
 * This is an opaque type so you may _only_ create an `FbtString` by calling
 * `fbt()` or one of its methods.
 *
 * You may use an `FbtString` as any normal string, but you can't create a new
 * `FbtString` without `fbt()`.
 *
 * @warning Because fbt.param() accepts any value,
 * we can't guarantee that this Fbt contents isn't made of React elements
 */
declare opaque type FbtString: string;

/**
 * Translated string from an `<fbt>` element.
 *
 * This is an opaque type so you may _only_ create an `FbtElement` by using an
 * `<fbt>` element.
 *
 * Unlike `FbtString`, you cannot use `FbtElement` like any normal string. Since
 * `<fbt>` can have nested React nodes its internal structure is hidden from the
 * end user.
 *
 * There are some string-like properties and methods you may use, like `length`
 * and `toString()`.
 */
// Not using `opaque` yet since there are flow issues with React's defaultProps
// See:
// - An Fbt in defaultProps breaks: https://fburl.com/cer2jdjd
// - Opaque types with truthy bounds aren't excluded from the type of
//   logical 'and' expressions. https://fburl.com/9b5vm9wh
declare type FbtElement = $FbtResultBase;

/**
 * All translated strings. Could either be a translated string returned by an
 * `fbt()` call or a translated string returned by an `<fbt>` element.
 */
declare type FbtWithoutString = FbtString | FbtElement;

/**
 * All translated strings wrapped in `fbt` and the `string` type. `string` is
 * mostly included for legacy purposes.
 *
 * NOTE: If you want to use a type that requires your string to be wrapped in
 * `fbt` use `FbtWithoutString`. Not this type. It may be wise to run a
 * codemod which renames this `Fbt` type to `Fbt | string` and renames
 * `FbtWithoutString` to `Fbt` so that all future uses of `Fbt` require
 * translated strings.
 */
declare type Fbt = string | FbtWithoutString;

// Similar to React$Node without `Iterable<React$Node>`
declare type $FbtContentItem =
  | boolean
  | FbtElement
  | FbtString
  | null
  | number
  | React$Element<any>
  | React$Portal
  | string
  | void;

declare class $FbtResultBase {
  /* $FlowFixMe[method-unbinding] This comment suppresses an error when upgrading Flow
   * to version 0.153.0. To see the error delete this comment and run Flow. */
  toString: typeof String.prototype.toString;
}

// Represents the input of an fbt.param
type $FbtParamInput = React$Node;

// Represents the output of an fbt.param, fbt.enum, etc...
// It's voluntarily not an accurate representation of the real output.
// Non-internal i18n code should not need to know its actual type.
opaque type $FbsParamOutput = mixed;
opaque type $FbtParamOutput: $FbsParamOutput = $FbsParamOutput;

// NOTE: DO NOT USE THE $-prefixed versions of these types;
// import them from their respective JS modules instead.
opaque type $IntlVariationsEnum: number = number;
opaque type $GenderConstEnum: number = number;

// i18n INTERNAL USE ONLY! DO NOT USE THIS TYPE OUTSIDE OF THIS FILE!
// Defines the fbt or fbs common procedural-style API
type $GenericFbtFunctionAPI<Input, Output, ParamInput, ParamOutput> = {
  (
    text: Input,
    description: string,
    options?: {
      author?: string,
      project?: string,
      ...
    },
  ): Output,
  param(
    name: string,
    value: ParamInput,
    options?: {
      number?: boolean | number,
      gender?: $IntlVariationsEnum,
      ...
    },
  ): ParamOutput,
  enum(value: string, range: $ReadOnlyArray<string> | { [key: string]: string, ... }): ParamOutput,
  name(tokenName: string, value: string, gender: $IntlVariationsEnum): ParamOutput,
  plural(
    label: string,
    count: number,
    options?: {
      many?: string,
      showCount?: 'ifMany' | 'no' | 'yes',
      name?: string, // token name
      value?: $FbtContentItem, // optional value to replace token (rather than count)
    },
  ): ParamOutput,
  pronoun(
    usage: 'object' | 'possessive' | 'reflexive' | 'subject',
    gender: $GenderConstEnum,
    options?: {
      capitalize?: boolean,
      human?: boolean,
      ...
    },
  ): ParamOutput,
  sameParam(name: string): ParamOutput,
  c(text: string): Output,
  jsonEncode: boolean,
  replaceParams: boolean,
  isFbtInstance(value: mixed): boolean,
  ...
};

type $StringBasedFbtFunctionAPI<Output, ParamInput, ParamOutput> = $GenericFbtFunctionAPI<
  string,
  Output,
  ParamInput,
  ParamOutput,
>;

type $ArrayBasedFbtFunctionAPI<Output, ParamInput> = $GenericFbtFunctionAPI<
  $ReadOnlyArray<string | $FbtParamOutput>,
  Output,
  ParamInput,
  $FbtParamOutput,
>;

type $FbtFunctionAPI = $StringBasedFbtFunctionAPI<FbtWithoutString, $FbtParamInput, string> &
  $ArrayBasedFbtFunctionAPI<FbtWithoutString, $FbtParamInput>;
