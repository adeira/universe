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

import create from './src/create';
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
 */
function composeStylesheets(
  stylesheetA: Map<string, string>,
  stylesheetB: Map<string, string>,
): string {
  // Should we support deeply nested styles or leave it like this and overwrite them?
  // Note: this is very similar what `styles('aaa', 'bbb')` does internally when merging.
  const merged = new Map([...stylesheetA, ...stylesheetB]);
  const classes = [...merged.values()];
  const uniqueClasses = [...new Set(classes)];
  return uniqueClasses.join(' ');
}

composeStylesheets.create = create;
composeStylesheets.keyframes = keyframes;
composeStylesheets.renderPageWithSX = renderPageWithSX;

export { create, keyframes, renderPageWithSX };
export default composeStylesheets;
export type { AllCSSPropertyTypes } from './src/css-properties/__generated__/AllCSSPropertyTypes';
