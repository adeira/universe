// @flow strict

import type { ElementConfig, Node } from 'react';

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
export type StoryTemplate<Component> = {
  (args: ElementConfig<Component>): Node,
  storyName: string,
  // Arguments `args` are defined as a `$Shape<…>` here because Storybook substitutes some arguments
  // automatically by default making them optional.
  args: $Shape<ElementConfig<Component>>,
  argTypes: $Shape<$ObjMap<ElementConfig<Component>, () => { table: { disable: boolean } }>>,
  ...
};
