// @flow strict

/* eslint-disable */

// ===
// These examples should suppress the errors correctly.
// ===

// $FlowAllowDynamicImport
const kw1_1: string = 123;
/* $FlowAllowDynamicImport */
const kw1_2: string = 123;
/*
 * $FlowAllowDynamicImport
 */
const kw1_3: string = 123;
/**
 * $FlowAllowDynamicImport
 * @type {number}
 */
const kw1_4: string = 123;

// $FlowExpectedError: explanation of why
const kw2_1: string = 123;
/* $FlowExpectedError: explanation of why */
const kw2_2: string = 123;
/*
 * $FlowExpectedError: explanation of why
 */
const kw2_3: string = 123;
/**
 * $FlowExpectedError: explanation of why
 * @type {number}
 */
const kw2_4: string = 123;

// $FlowIssue: https://github.com/facebook/flow/issues/0
const kw3_1: string = 123;
/* $FlowIssue: https://github.com/facebook/flow/issues/0 */
const kw3_2: string = 123;
/*
 * $FlowIssue: https://github.com/facebook/flow/issues/0
 */
const kw3_3: string = 123;
/**
 * $FlowIssue: https://github.com/facebook/flow/issues/0
 * @type {number}
 */
const kw3_4: string = 123;

// $FlowPullRequest: https://github.com/facebook/flow/pull/0
const kw4_1: string = 123;
/* $FlowPullRequest: https://github.com/facebook/flow/pull/0 */
const kw4_2: string = 123;
/*
 * $FlowPullRequest: https://github.com/facebook/flow/pull/0
 */
const kw4_3: string = 123;
/**
 * $FlowPullRequest: https://github.com/facebook/flow/pull/0
 * @type {number}
 */
const kw4_4: string = 123;

// $FlowFixMe
const kw5_1: string = 123;
/* $FlowFixMe */
const kw5_2: string = 123;
/*
 * $FlowFixMe
 */
const kw5_3: string = 123;
/**
 * $FlowFixMe
 * @type {number}
 */
const kw5_4: string = 123;

// $FlowFixMe(>=0.1.0)
const kw6_1: string = 123;
/* $FlowFixMe(>=0.1.0) */
const kw6_2: string = 123;
/*
 * $FlowFixMe(>=0.1.0)
 */
const kw6_3: string = 123;
/**
 * $FlowFixMe(>=0.1.0)
 * @type {number}
 */
const kw6_4: string = 123;

// ===
// Suppress comments in Facebook codebase (node_modules). Technical details:
//
// FlowFixMe comments can contain sites which makes them effective only for the
// specified sites (like OSS for example). I am currently unsure how does it
// work exactly but they essentially run more Flow versions on different parts
// of the codebase (RN, www monorepo, ...) and ignore each other.
//
// Therefore, these comments are effective only if you match the version AND if
// you are running it using some specific config for the site (where the name
// is specified).
// ===

/* $FlowFixMe(>=0.54.0 site=react_native_oss) This comment suppresses an error
 * found when Flow v0.54 was deployed. To see the error delete this comment and
 * run Flow. */
const fb1: string = 123;

/* $FlowFixMe(>=0.98.0 site=www,mobile,react_native_fb,oss) This comment
 * suppresses an error found when Flow v0.98 was deployed. To see the error
 * delete this comment and run Flow. */
const fb2: string = 123;

/* $FlowFixMe(>=0.66.0 site=react_native_fb) This comment suppresses an
 * error found when Flow v0.66 was deployed. To see the error delete this
 * comment and run Flow. */
const fb3: string = 123;

// $FlowFixMe TODO t0 https://github.com/facebook/flow/issues/183
const fb4: string = 123;
