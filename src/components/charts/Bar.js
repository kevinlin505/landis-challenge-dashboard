import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const height = 500;
const width = 1000;

const drawChart = (svg, data) => {
  const color = '#2c7be5';
  const margin = { top: 30, right: 0, bottom: 30, left: 40 };
  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .nice()
    .range([height - margin.bottom, margin.top]);
  const xAxis = (g) =>
    g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => data[i].name)
        .tickSizeOuter(0),
    );
  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'blue')
          .attr('text-anchor', 'start')
          .text(data.y),
      );

  svg
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', (d) => y(d.count))
    .attr('height', (d) => y(0) - y(d.count))
    .attr('width', x.bandwidth());

  svg.append('g').call(xAxis);

  svg.append('g').call(yAxis);

  return svg.node();
};

const makeSvg = (node) => {
  return d3
    .select(node)
    .append('svg')
    .attr('font-family', 'sans-serif')
    .attr('viewBox', [0, 0, width, height]);
};

const Bar = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const svg = makeSvg(containerRef.current);
      drawChart(svg, data);
    }
  }, []);

  return <Container ref={containerRef} id="barChart"></Container>;
};

export default Bar;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
