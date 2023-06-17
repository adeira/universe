// @flow

import React, { useEffect, useState, type Node } from 'react';

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

  return (
    <>
      <style jsx>{`
        .time-display {
          font-size: 8em;
          font-weight: bold;
          transition: all 0.5s ease-in-out;
        }
      `}</style>

      <div className="time-display">{formattedTime}</div>
    </>
  );
}
