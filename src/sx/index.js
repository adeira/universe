/**
 * Users of SX should be able to import it as follows:
 *
 *    import sx from '@adeira/sx';
 *    sx(), sx.create(), sx.keyframes(), ...
 *
 * Alternatively:
 *
 *    import { create as sxCreate } from '@adeira/sx';
 *    sxCreate(), ...
 *
 * @flow
 */

import { isObject } from '@adeira/js';

import create, { type AllCSSProperties } from './src/create';
import keyframes from './src/keyframes';
import getStyleTag from './src/getStyleTag';
import StyleCollector from './src/StyleCollector';

/**
 * This function allows us to compose local and external styles like so:
 *
 * ```
 * import sx from '@adeira/sx';
 *
 * const styles = sx.create({ default: { fontSize: 16 } });
 * const externalStyles = sx.create({ spacing: { marginTop: 4 } });
 *
 * <div className={sx(styles.default, externalStyles.spacing)} />;
 * ```
 *
 * It does so by literally merging the 2 objects together and calling `sx.create` on the result.
 */
function composeStylesheets(...stylesheets: $ReadOnlyArray<?AllCSSProperties | false>): ?string {
  // Should we support deeply nested styles or leave it like this and overwrite them?
  // $FlowIssue[not-an-object]: https://github.com/facebook/flow/issues/1414
  const mergedStylesheet = Object.assign({}, ...stylesheets.filter(isObject));
  if (Object.keys(mergedStylesheet).length === 0) {
    // happens when composing "nothing" which is a valid input
    return undefined;
  }
  return create({
    __internal_compose_stylesheets: mergedStylesheet,
  })('__internal_compose_stylesheets');
}

composeStylesheets.create = create;
composeStylesheets.keyframes = keyframes;
composeStylesheets.getStyleTag = getStyleTag;

const __internal = {
  StyleCollector: StyleCollector,
};

export {
  create,
  keyframes,
  getStyleTag,
  __internal, // only for internal purposes (SX Eslint, SX Babel, SX Snapshot Serializer, …)
};
export default composeStylesheets;
export type { AllCSSProperties } from './src/create';
