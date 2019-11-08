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
