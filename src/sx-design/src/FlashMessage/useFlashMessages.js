// @flow

import useSxDesignContext from '../useSxDesignContext';
import { FlashMessageTint } from './FlashMessage';

type FlashMessageOptions = {
  +tint?: FlashMessageTint,
};

/**
 * Usage:
 *
 * ```
 * import { useFlashMessages, FlashMessageTint } from '@adeira/sx-design';
 *
 * export default function MyComponent() {
 *   const [displayFleshMessage] = useFlashMessages();
 *
 *   // display default message:
 *   displayFleshMessage(
 *     <fbt desc="bread">Bread 👍</fbt>,
 *   );
 *
 *   // display tinted message:
 *   displayFleshMessage(
 *     <fbt desc="bread">Bread 👍</fbt>,
 *     { tint: FlashMessageTint.Success },
 *   );
 * }
 * ```
 */
export default function useFlashMessages(): [
  (Fbt, ?FlashMessageOptions) => void,
  Map<
    TimeoutID,
    {
      +message: Fbt,
      +tint: FlashMessageTint,
    },
  >,
] {
  const context = useSxDesignContext();

  return [
    (newFlashMessage, newFlashMessageOptions) => {
      context.displayFlashMessage({
        message: newFlashMessage,
        tint: newFlashMessageOptions?.tint ?? FlashMessageTint.Default,
      });
    },
    context.activeFlashMessages,
  ];
}
