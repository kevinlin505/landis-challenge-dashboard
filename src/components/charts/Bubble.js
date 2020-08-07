import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const WIDTH = 800;
const HEIGHT = 800;

const makeHierarchy = (data) => {
  return d3.hierarchy({ children: data }).sum((d) => d.count);
};

const pack = () => {
  return d3.pack().size([WIDTH, HEIGHT]).padding(3);
};

const formart = () => {
  return d3.format('', 'd');
};

const drawChart = (svg, data) => {
  let hierarchalData = makeHierarchy(data);
  let packLayout = pack(WIDTH, HEIGHT);
  const root = packLayout(hierarchalData);

  const leaf = svg
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x + 1},${d.y + 1})`);

  leaf
    .append('circle')
    .attr('r', (d) => d.r)
    .attr('fill-opacity', 0.7)
    .attr('fill', '#2c7be5');

  leaf
    .append('text')
    .selectAll('tspan')
    .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .join('tspan')
    .attr('x', 0)
    .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
    .text((d) => d);

  leaf
    .append('title')
    .text(
      (d) =>
        `${
          d.data.title === undefined ? '' : `${d.data.title} - ${d.data.count}`
        }`,
    );

  return svg.node();
};

const makeSvg = (node) => {
  return d3
    .select(node)
    .append('svg')
    .attr('viewBox', [0, 0, WIDTH, HEIGHT])
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle');
};

const Bubble = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const svg = makeSvg(containerRef.current);
      drawChart(svg, data);
    }
  }, []);

  return <Container ref={containerRef} id="bubbleChart"></Container>;
};

export default Bubble;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
