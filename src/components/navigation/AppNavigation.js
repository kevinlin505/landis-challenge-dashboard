import React from 'react';
import { useDispatch } from 'react-redux';
import { accountActions } from '@providers/account/account';
import AppRouter from '@components/routers/AppRouter';

const AppNavigation = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(accountActions.fetchAccounts());
  }, []);

  return <AppRouter />;
};

export default AppNavigation;
