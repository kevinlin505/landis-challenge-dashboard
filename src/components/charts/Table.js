import React from 'react';
import styled from 'styled-components';

const Header = ({ data }) => {
  return (
    <HeaderRowContainer>
      <RowCell isHeader>{data.name}</RowCell>
      <RowCell>{data.value[0]}</RowCell>
      <RowCell>{data.value[1]}</RowCell>
    </HeaderRowContainer>
  );
};

const Row = ({ data }) => {
  return (
    <RowContainer>
      <NameRowCell isHeader>{data.name}</NameRowCell>
      <RowCell>{data.value[0]}</RowCell>
      <RowCell>{data.value[1]}</RowCell>
    </RowContainer>
  );
};

const Table = ({ tableData }) => {
  return (
    <div>
      {tableData.map((data, index) => {
        return index === 0 ? (
          <Header key={`table-row-${index}`} data={data} />
        ) : (
          <Row key={`table-row-${index}`} data={data} />
        );
      })}
    </div>
  );
};

export default Table;

const RowContainer = styled.div`
  display: flex;
`;

const HeaderRowContainer = styled(RowContainer)`
  font-weight: 600;
`;

const RowCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 3);
  padding: 10px;
  text-transform: capitalize;
`;

const NameRowCell = styled(RowCell)`
  font-weight: 600;
`;
