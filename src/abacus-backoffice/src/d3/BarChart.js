// @flow

import React, { useCallback, useState, type Node } from 'react';

import drawSvgChart from './drawSvgChart';

type Props = {
  +sort: 'ASC' | 'DESC',
  +data: $ReadOnlyArray<{ +label: Fbt, +value: number }>,
};

export default function BarChart(props: Props): Node {
  const svg = React.useRef(null);
  const [width, setWidth] = useState(null);

  React.useEffect(() => {
    if (width != null) {
      drawSvgChart(svg, width, props.data, {
        sort: props.sort,
      });
    }
  }, [props.data, props.sort, svg, width]);

  const divRef = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div id="chart" ref={divRef}>
      <svg ref={svg} />
    </div>
  );
}
