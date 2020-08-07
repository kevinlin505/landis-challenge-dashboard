import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import styled from 'styled-components';
import statesAlbers from '@assets/states-albers-10m.json';

const drawChart = (svg, data) => {
  const color = d3.scaleQuantize([1, 4], d3.schemeBlues[4]);
  const path = d3.geoPath();

  svg.append('g').attr('transform', 'translate(610,20)');

  svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(statesAlbers, statesAlbers.objects.states).features)
    .join('path')
    .attr('fill', (d) => color(data[d.properties.name]))
    .attr('d', path)
    .append('title')
    .text((d) => `${d.properties.name} ${data[d.properties.name]}`);

  svg
    .append('path')
    .datum(
      topojson.mesh(
        statesAlbers,
        statesAlbers.objects.states,
        (a, b) => a !== b,
      ),
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round')
    .attr('d', path);

  return svg.node();
};

const makeSvg = (node) => {
  return d3.select(node).append('svg').attr('viewBox', [0, 0, 975, 610]);
};

const Map = ({ data }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const svg = makeSvg(containerRef.current);
      drawChart(svg, data);
    }
  }, []);

  return <Container ref={containerRef} id="mapChart"></Container>;
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
