// @flow strict

import { type Node } from 'react';

export default function Jumbo(props: { +children: string }): Node {
  return (
    <>
      <style jsx>{`
        .jumbo {
          font-size: 8em;
          font-weight: bold;
          transition: all 0.5s ease-in-out;
        }
      `}</style>

      <div>
        <div className="jumbo">{props.children}</div>
      </div>
    </>
  );
}
