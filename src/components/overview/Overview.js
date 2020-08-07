import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getAverageBalance,
  getCreditScoreCount,
  getMortageGoalCompletionCount,
  getOverviewData,
  getStates,
  getTags,
} from '@selectors/selectors';
import Header from '@components/header/Header';
import Bar from '@components/charts/Bar';
import Bubble from '@components/charts/Bubble';
import Map from '@components/charts/Map';
import Table from '@components/charts/Table';

const Overview = () => {
  const cardWrapperRef = useRef(null);
  const barCardWrapperRef = useRef(null);
  const mapCardWrapperRef = useRef(null);
  const tags = useSelector(getTags);
  const states = useSelector(getStates);
  const creditScoreCount = useSelector(getCreditScoreCount);
  const mortageGoalCompletionCount = useSelector(getMortageGoalCompletionCount);
  const overviewData = useSelector(getOverviewData);
  const [cardHeight, setCardHeight] = useState(800);
  const [mapCardHeight, setMapCardHeight] = useState(610);
  const [barCardHeight, setBarCardHeight] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      if (cardWrapperRef.current) {
        setCardHeight(cardWrapperRef.current.clientWidth);
      }

      if (barCardWrapperRef.current) {
        setBarCardHeight((500 / 1000) * barCardWrapperRef.current.clientWidth);
      }

      if (mapCardWrapperRef.current) {
        setMapCardHeight((610 / 975) * mapCardWrapperRef.current.clientWidth);
      }
    };

    handleResize(barCardHeight);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardWrapperRef, cardWrapperRef.current, setCardHeight]);

  return (
    <>
      <Header activeRoute="insights" />
      <Container>
        <SmallChartCard>
          <Title>Overview</Title>
          <TableWrapper>
            <Table tableData={overviewData} />
          </TableWrapper>
        </SmallChartCard>
        <SmallChartCard>
          <Title>Account Geography</Title>
          <ChartWrapper ref={mapCardWrapperRef} height={mapCardHeight}>
            {Object.keys(states).length && <Map data={states} />}
          </ChartWrapper>
        </SmallChartCard>
        <LargeChartCard>
          <Title>Credit Score Count</Title>
          <ChartWrapper ref={barCardWrapperRef} height={barCardHeight}>
            {Object.keys(creditScoreCount).length && (
              <Bar data={creditScoreCount} />
            )}
          </ChartWrapper>
        </LargeChartCard>
        <LargeChartCard>
          <Title>Mortgage Goal Completion Count</Title>
          <ChartWrapper height={barCardHeight}>
            {Object.keys(mortageGoalCompletionCount).length && (
              <Bar data={mortageGoalCompletionCount} />
            )}
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
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  margin: 0 auto;
  padding-top: 80px;
`;

const ChartCard = styled.div`
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

const LargeChartCard = styled(ChartCard)`
  width: 100%;
`;

const SmallChartCard = styled(ChartCard)`
  width: calc(100% / 2 - 30px);
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
`;

const TableWrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 16;
  margin-bottom: 10px;
`;
