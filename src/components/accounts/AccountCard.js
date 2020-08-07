import React from 'react';
import styled from 'styled-components';
import { calculateMortageGoalCompletion } from '@selectors/selectors';

const AccountCard = ({ account }) => {
  // Calculate mortage score
  const mortgageGoalProgress = calculateMortageGoalCompletion(account);

  const getCreditScoreStatus = () => {
    if (account.credit >= 700) {
      return 'high';
    } else if (account.credit >= 600) {
      return 'normal';
    } else if (account.credit >= 500) {
      return 'warning';
    } else if (account.credit >= 400) {
      return 'low';
    } else {
      return 'danger';
    }
  };

  return (
    <Container>
      <Avatar
        src={account.picture}
        alt={`${account.name_first} ${account.name_last}`}
      />
      <Name>{`${account.name_first} ${account.name_last}`}</Name>
      <Email href={`mailto:${account.email}`}>{account.email}</Email>
      <Label>Phone</Label>
      <ContactInfo>{account.phone}</ContactInfo>
      <Label>Address</Label>
      <Address>{account.address}</Address>
      <Label>Employer</Label>
      <Employer>{account.employer}</Employer>
      <Label>Balance</Label>
      <Balance>${account.balance}</Balance>
      <CreditScore status={getCreditScoreStatus()}>
        Credit Score:{String.fromCharCode(20)}
        <Score>{account.credit}</Score>
      </CreditScore>
      <Label>{mortgageGoalProgress}%</Label>
      <ProgressContainer>
        <Progress mortgageGoalProgress={mortgageGoalProgress} />
      </ProgressContainer>
    </Container>
  );
};

export default AccountCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 250px;
  margin: 15px;
  padding: 20px 15px;
  background-color: #fff;
  border: 0 solid #edf2f9;
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(65, 69, 88, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #edf2f9;
  border-radius: 4px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${({ mortgageGoalProgress }) => mortgageGoalProgress}%;
  color: #607d8b;
  background-color: #00d27a;
  border-radius: 4px;
  font-size: 10px;
  line-height: 10px;
  text-align: right;
  padding-right: 5px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #607d8b;
  margin-top: 10px;
`;

const Avatar = styled.img`
  width: 100px;
  min-height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

const Email = styled.a`
  font-size: 14px;
  color: #0097a7;
`;

const ContactInfo = styled.div`
  margin: 3px 0;
  font-size: 14px;
  text-align: center;
`;

const Address = styled.div`
  font-size: 14px;
  text-align: center;
`;

const Employer = styled.div`
  font-size: 16px;
`;

const Balance = styled.div`
  font-size: 16px;
`;

const CreditScore = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 16px;
  color: ${({ status }) => {
    if (status === 'danger') return '#D32F2F';
    if (status === 'low') return '#FF5722';
    if (status === 'warning') return '#FFA000';
    if (status === 'normal') return '#4CAF50';

    return '#009688';
  }};
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;
