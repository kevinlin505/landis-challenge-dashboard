import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AccountCard from '@components/accounts/AccountCard';
import Header from '@components/header/Header';

const Home = () => {
  return (
    <Container>
      <Logo src="https://resources.landis.com/logos/landscape-fg-primary.svg" />
      <NavBox>
        <HomeLink to="/accounts">Accounts</HomeLink>
        <HomeLink to="/insights">Insights</HomeLink>
      </NavBox>
    </Container>
  );
};

export default withRouter(Home);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
`;

const NavBox = styled.div`
  width: 300px;
  height: 300px;
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 60px;
  margin: 10px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #202a61;
  text-decoration: none;

  &:active,
  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
  }
`;
