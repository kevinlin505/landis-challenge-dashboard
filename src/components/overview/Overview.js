import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getAverageBalance,
  getCreditScoreCount,
  getMortageGoalCompletionCount,
  getStates,
  getTags,
} from '@selectors/selectors';
import Header from '@components/header/Header';
import Bar from '@components/charts/Bar';
import Bubble from '@components/charts/Bubble';
import Map from '@components/charts/Map';

const Overview = () => {
  const cardWrapperRef = useRef(null);
  const tags = useSelector(getTags);
  const states = useSelector(getStates);
  const creditScoreCount = useSelector(getCreditScoreCount);
  const mortageGoalCompletionCount = useSelector(getMortageGoalCompletionCount);
  const [cardHeight, setCardHeight] = useState(800);
  const [mapCardHeight, setMapCardHeight] = useState(610);

  useEffect(() => {
    const handleResize = () => {
      if (cardWrapperRef.current) {
        setCardHeight(cardWrapperRef.current.clientWidth);
        setMapCardHeight((610 / 975) * cardWrapperRef.current.clientWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardWrapperRef, cardWrapperRef.current, setCardHeight]);

  return (
    <>
      <Header activeRoute="insights" />
      <Container>
        <LargeChartCard>
          <Title>Mortgage Goal Completion Count</Title>
          <ChartWrapper height={mapCardHeight}>
            {Object.keys(mortageGoalCompletionCount).length && (
              <Bar data={mortageGoalCompletionCount} />
            )}
          </ChartWrapper>
        </LargeChartCard>
        <LargeChartCard>
          <Title>Credit Score Count</Title>
          <ChartWrapper height={mapCardHeight}>
            {Object.keys(creditScoreCount).length && (
              <Bar data={creditScoreCount} />
            )}
          </ChartWrapper>
        </LargeChartCard>
        <LargeChartCard>
          <Title>Account Geography</Title>
          <ChartWrapper height={mapCardHeight}>
            {Object.keys(states).length && <Map data={states} />}
          </ChartWrapper>
        </LargeChartCard>
        <LargeChartCard>
          <Title>Tags</Title>
          <ChartWrapper ref={cardWrapperRef} height={cardHeight}>
            {tags.length && <Bubble data={tags} />}
          </ChartWrapper>
        </LargeChartCard>
      </Container>
    </>
  );
};

export default Overview;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100%;
  background-color: #edf2f9;
  padding-top: 80px;
`;

const LargeChartCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80%;
  margin: 15px;
  padding: 20px;
  background-color: #fff;
  border: 0 solid #edf2f9;
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(65, 69, 88, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
`;

const Title = styled.div`
  font-size: 16;
  margin-bottom: 10px;
`;
