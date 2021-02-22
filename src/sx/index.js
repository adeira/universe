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

import create, { type AllCSSProperties } from './src/create';
import keyframes from './src/keyframes';
import renderPageWithSX from './src/renderPageWithSX';

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
function composeStylesheets(...stylesheets: $ReadOnlyArray<?AllCSSProperties>): ?string {
  // Should we support deeply nested styles or leave it like this and overwrite them?
  const mergedStylesheet = Object.assign({}, ...stylesheets);
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
composeStylesheets.renderPageWithSX = renderPageWithSX;

export { create, keyframes, renderPageWithSX };
export default composeStylesheets;
export type { AllCSSProperties } from './src/create';
