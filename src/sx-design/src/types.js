// @flow strict

/**
 * Usage:
 *
 * ```
 * export const ButtonDefault: StoryTemplate<typeof Button> = Template.bind({});
 * ButtonDefault.storyName = 'Default';
 * ButtonDefault.argTypes = {
 *   tint: { table: { disable: true } },
 * };
 * ButtonDefault.args = {
 *   children: 'Button text',
 * };
 * ```
 */

/*::

import type { ElementConfig, Node } from 'react';

export type StoryTemplate<Component> = {
  (args: ElementConfig<Component>): Node,
  -storyName?: string,
  // Arguments `args` are defined as a `Partial<…>` here because Storybook substitutes some arguments
  // automatically by default making them optional.
  -args?: Partial<ElementConfig<Component>>,
  -argTypes?: { [key in keyof ElementConfig<Component>]?: { table?: { disable?: boolean } } },
  -parameters?: $FlowFixMe,
  ...
};

*/
