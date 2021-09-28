// @flow

import React, { useCallback, useState, type Node } from 'react';
import * as d3 from 'd3';

function drawSvgChart(svgRef, width, unsortedData, config) {
  const data = d3.sort(unsortedData, (a, b) => {
    if (config.sort === 'DESC') {
      return d3.descending(a.value, b.value);
    }
    return d3.ascending(a.value, b.value);
  });

  const margin = { top: 20, right: 10, bottom: 10, left: 10 };
  const barHeight = 16;
  const height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
  const svg = d3.select(svgRef.current).attr('viewBox', [0, 0, width, height]);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

  // Bars
  svg
    .append('g')
    .attr('fill', 'rgba(var(--sx-success))')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', x(0))
    .attr('y', (d, i) => y(i))
    .attr('width', (d) => x(d.value) - x(0))
    .attr('height', y.bandwidth());

  // Text labels
  svg
    .append('g')
    .attr('fill', 'white')
    .attr('text-anchor', 'end')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('x', (d) => x(d.value))
    .attr('y', (d, i) => y(i) + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('dx', -4)
    .text((d) => d.label)
    .call((text) =>
      text
        .filter((d) => {
          // short bars
          const textLength = text.node().getComputedTextLength();
          return x(d.value) - x(0) < textLength;
        })
        .attr('dx', +4)
        .attr('fill', 'rgba(var(--sx-foreground))')
        .attr('text-anchor', 'start'),
    );

  // X axis
  svg.append('g').call((g) =>
    g
      .attr('transform', `translate(0,${margin.top})`)
      .call(
        d3
          .axisTop(x)
          .tickFormat(
            d3.format('.1~f'), // one decimal place with trimmed insignificant trailing zeros
          )
          .ticks(width / 100),
      )
      .call((g) => g.select('.domain').remove()),
  );

  // Y axis
  svg
    .append('g')
    .call((g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickValues([]).tickSizeOuter(0)),
    );
}

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
