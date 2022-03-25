// @flow

import type { Node } from 'react';

import FlashMessage from './FlashMessage';
import useFlashMessages from './useFlashMessages';

export default function FlashMessagesRenderer(): Node {
  const [, activeFlashMessages] = useFlashMessages();

  return [...activeFlashMessages].map(([key, message]) => {
    return <FlashMessage key={String(key)} message={message} />;
  });
}
