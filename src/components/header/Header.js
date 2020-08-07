import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Header = ({ activeRoute }) => {
  return (
    <Container>
      <LinksWrapper>
        <HeaderLink to="/">
          <Logo src="https://resources.landis.com/logos/landscape-fg-primary.svg" />
        </HeaderLink>
      </LinksWrapper>
      <LinksWrapper>
        <LinkWrapper isActive={activeRoute === 'accounts'}>
          <HeaderLink to="/accounts">Accounts</HeaderLink>
        </LinkWrapper>
        <LinkWrapper isActive={activeRoute === 'insights'}>
          <HeaderLink to="/insights">Insights</HeaderLink>
        </LinkWrapper>
      </LinksWrapper>
    </Container>
  );
};

export default withRouter(Header);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  background-color: #fff;
  border-bottom: 3px solid #7952b3;
  z-index: 1;
`;

const Logo = styled.img`
  width: 100px;
`;

const LinksWrapper = styled.div`
  display: flex;
`;

const LinkWrapper = styled.div`
  width: 100px;
  height: 100%;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  font-size: 16px;
`;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #202a61;
  text-decoration: none;
`;
