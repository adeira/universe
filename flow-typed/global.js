declare var __DEV__: boolean;

// https://github.com/facebook/flow/blob/fa89aadb55ae9bb37c71e14d7274935903d501ce/lib/core.js#L835
// TODO: eventually remove when this PR lands: https://github.com/facebook/flow/pull/7704
declare var globalThis: any;

/**
 * This function is useful when you want to quickly investigate inferred type of the variable
 * for example. Call this function anywhere in your code to get the debug info when running Flow:
 *
 *     DEBUG__flowPrint(variable);
 *
 * Functions '$Flow$DebugThrow' and '$Flow$DebugSleep' are not allowed here because they do not
 * seem to be useful for normal development outside of Flow codebase.
 */
declare var DEBUG__flowPrint: $Flow$DebugPrint;

// FBT: augmented definition from: https://github.com/facebook/flow/blob/f702ab9530d96ad3900b70902d3c9179c0d9202f/lib/react.js#L15-L23
declare type React$Node =
  | void
  | null
  | boolean
  | number
  | string
  | React$Element<any>
  | React$Portal
  | Iterable<?React$Node>
  | FbtElement
  | FbtString;

// Use this type when working with `useRef` hook.
// See: https://github.com/facebook/flow/blob/8c866379d12dc32c6a0e129739148c8cd9169db8/lib/react.js#L365
declare type ReactRefObject<T> = { current: T };

// Use this type when working with `React.createRef`.
// See: https://github.com/facebook/flow/blob/8c866379d12dc32c6a0e129739148c8cd9169db8/lib/react.js#L265
declare type ReactRefNullableObject<T> = { current: null | T };

// Use this type when forwarding refs via `forwardRef`.
// See: https://github.com/facebook/flow/blob/8c866379d12dc32c6a0e129739148c8cd9169db8/lib/react.js#L325
declare type ReactRefAny<T> = { current: null | T, ... } | ((null | T) => mixed);
