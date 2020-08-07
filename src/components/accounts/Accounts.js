import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AccountCard from '@components/accounts/AccountCard';
import Header from '@components/header/Header';

const Accounts = () => {
  const accounts = useSelector((state) => state.account.accounts);

  if (!accounts.length) return null;

  return (
    <>
      <Header activeRoute="accounts" />
      <Container>
        {accounts.map((account) => {
          return (
            <AccountCard key={`account-${account._id}`} account={account} />
          );
        })}
      </Container>
    </>
  );
};

export default Accounts;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  padding-top: 80px;
`;
