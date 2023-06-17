// @flow

import React, { useEffect, useState, type Node } from 'react';

import Jumbo from '../src/components/Jumbo';

export default function NewTabPage(): Node {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    let timeoutId = null;

    function updateTime() {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const formattedTime = new Intl.DateTimeFormat('default', options).format(now);

      document.title = formattedTime;
      setFormattedTime(formattedTime);

      timeoutId = setTimeout(updateTime, 1000);
    }

    updateTime();

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return <Jumbo>{formattedTime}</Jumbo>;
}
