// @flow

import useSxDesignContext from '../useSxDesignContext';

export default function useFlashMessages(): [
  (FbtWithoutString) => void,
  Map<TimeoutID, FbtWithoutString>,
] {
  const context = useSxDesignContext();

  return [
    (newFlashMessage) => {
      context.displayFlashMessage(newFlashMessage);
    },
    context.activeFlashMessages,
  ];
}
